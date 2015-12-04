// Source: http://www.scriptol.fr/html5/canvas/phylactere.php
// 121220 nBubbles
function drawBubbleori(ctx, x, y, w, h, radius)
{
  var r = x + w;
  var b = y + h;
  ctx.beginPath();
  ctx.strokeStyle="black";
  ctx.lineWidth="2";
  ctx.moveTo(x+radius, y);
  ctx.lineTo(x+radius/2, y-10);
  ctx.lineTo(x+radius * 2, y);
  ctx.lineTo(r-radius, y);
  ctx.quadraticCurveTo(r, y, r, y+radius);
  ctx.lineTo(r, y+h-radius);
  ctx.quadraticCurveTo(r, b, r-radius, b);
  ctx.lineTo(x+radius, b);
  ctx.quadraticCurveTo(x, b, x, b-radius);
  ctx.lineTo(x, y+radius);
  ctx.quadraticCurveTo(x, y, x+radius, y);
  ctx.stroke();
}

function drawBubble3(canvas, color)
{
	clearCanvas(canvas);
	B_i = B_i + 1;
	drawBubble_Text(canvas, B_pos[B_i], B_pointPos[B_i], 0, color, 'divbubble1', B_list[B_i], B_i, B_length); // 0 for default Thickness
}


function drawBubble4(dir, draw)
{
	if (nBubbles==0) return -1; // no bubble existing
	if (B_nstep==0) // if number of steps no yet computed
	{
		var k = 0;
		while (k < B_length) // for each Bubble
		{
			B_nstep++;
			k++;
			if (typeof(B_num[k]) == 'undefined') var numn = 1;  // number of bubbles at current step
			else if (B_num[k].length == 0) var numn = 1;
			else var numn = parseInt(B_num[k].charAt(2)); // number of bubbles at current step (num[i] like "1:3")
			if (numn>1) {
				while (B_num[k].charAt(0) != B_num[k].charAt(2)) k++; // last if 'n:n' found (ex: '3:3')
			}
		}
	}
	
	// Clear all bubbles
	clearCanvas(document.getElementById('canvas1'));
	clearCanvas(document.getElementById('canvas1a'));
	clearCanvas(document.getElementById('canvas1b'));
	clearCanvas(document.getElementById('canvas1c'));
	clearCanvas(document.getElementById('canvas1d'));
	clearCanvas(document.getElementById('canvas2'));
	clearCanvas(document.getElementById('canvas2a'));
	clearCanvas(document.getElementById('canvas2b'));
	clearCanvas(document.getElementById('canvas2c'));
	clearCanvas(document.getElementById('canvas2d'));
	clearCanvas(document.getElementById('canvas3'));
  
	$('.bubbletext0').hide();
	$('.bubbletext0').html("");
	$('.bubbletext1').hide();
	$('.bubbletext1').html("");

	if(draw)
	{  	//alert('canvas1');
		if (dir == 'next')
		{
			// point last bubble of current step
			if (typeof(B_num[B_i]) == 'undefined') var numn = 1;  // number of bubbles at current step
			else if (B_num[B_i].length == 0) var numn = 1;
			else var numn = parseInt(B_num[B_i].charAt(2)); // number of bubbles at current step (num[i] like "1:3")
			if (numn>1) {
				while (B_num[B_i].charAt(0) != B_num[B_i].charAt(2)) B_i++; // last if 'n:n' found (ex: '3:3')
			}

			B_i = B_i + 1;
			B_istep = B_istep + 1;
			if (B_i > B_length)
			{	
				B_i = B_length;
				B_istep = B_nstep;
				if (numn>1) {
					while (B_num[B_i].charAt(0) != 1) B_i--; // first if '1:n' found (ex: '1:5')
				}
			}
		}
		if (dir == 'previous')
		{
			B_i = B_i - 1;
			B_istep = B_istep - 1;
			// point first bubble of new step
			if (typeof(B_num[B_i]) == 'undefined') var numn = 1;  // number of bubbles at current step
			else if (B_num[B_i].length == 0) var numn = 1;
			else var numn = parseInt(B_num[B_i].charAt(2)); // number of bubbles at current step (num[i] like "1:3")
			if (numn>1) {
				while (B_num[B_i].charAt(0) != 1) B_i--; // first if '1:n' found (ex: '1:5')
			}

			if (B_i < 1)
			{
				B_i = 1;
				B_istep = 1;
			}
		}
		if(B_i<B_length+1)
		{
			// Assume pointing the first bubble of current step
			if ((typeof(B_im[B_i]) != 'undefined') && (B_im[B_i] != '')) {
				iVm = parseInt(B_zone[B_i].charAt(2))-1;
				Vm[iVm].ImId = B_im[B_i];
				convId_Im2Lr(iVm); // goto image
				dispIm(iVm);
			}
			if (typeof(B_num[B_i]) == 'undefined') var numn = 1;  // number of bubbles at current step
			else if (B_num[B_i].length == 0) var numn = 1;
			else var numn = parseInt(B_num[B_i].charAt(2)); // number of bubbles at current step (num[i] like "1:3")
			for (var k = 0; k<numn; k++)
			{
				if (typeof(B_thickness[B_i+k]) == 'undefined') var thickness = 0;  // Relative thickness of bubble arrow
				else if (B_thickness[B_i+k].length == 0) var thickness = 0;
				else var thickness = parseFloat(B_thickness[B_i+k]); // number of bubbles at current step (num[i] like "1:3")

				if (typeof(B_color[B_i+k]) == 'undefined') var color = "black"; // bubble border color
				else if (B_color[B_i+k].length == 0) var color = "black";
				else var color = B_color[B_i+k]; //

				var visib = 1;
				if (B_num[B_i+k].charAt(3)== 'h') visib = 0; // if number hidden
				if (B_zone[B_i+k] == 'vm1') {
					if (k==0)
						drawBubble_Text(document.getElementById('canvas1'), B_pos[B_i+k], B_pointPos[B_i+k], thickness, color,
							'divbubble1', B_list[B_i+k], B_istep*visib, B_nstep);
					else if (k==1)
						drawBubble_Text(document.getElementById('canvas1a'), B_pos[B_i+k], B_pointPos[B_i+k], thickness, color,
							'divbubble1a', B_list[B_i+k], B_istep*visib, B_nstep);
					else if (k==2)
						drawBubble_Text(document.getElementById('canvas1b'), B_pos[B_i+k], B_pointPos[B_i+k], thickness, color,
							'divbubble1b', B_list[B_i+k], B_istep*visib, B_nstep);
					else if (k==3)
						drawBubble_Text(document.getElementById('canvas1c'), B_pos[B_i+k], B_pointPos[B_i+k], thickness, color,
							'divbubble1c', B_list[B_i+k], B_istep*visib, B_nstep);
					else if (k==4)
						drawBubble_Text(document.getElementById('canvas1d'), B_pos[B_i+k], B_pointPos[B_i+k], thickness, color,
							'divbubble1d', B_list[B_i+k], B_istep*visib, B_nstep);
				}
				else if (B_zone[B_i+k] == 'vm2') {
					if (k==0)
						drawBubble_Text(document.getElementById('canvas2'), B_pos[B_i+k], B_pointPos[B_i+k], thickness, color,
							'divbubble2', B_list[B_i+k], B_istep*visib, B_nstep);
					else if (k==1)
						drawBubble_Text(document.getElementById('canvas2a'), B_pos[B_i+k], B_pointPos[B_i+k], thickness, color,
							'divbubble2a', B_list[B_i+k], B_istep*visib, B_nstep);
					else if (k==2)
						drawBubble_Text(document.getElementById('canvas2b'), B_pos[B_i+k], B_pointPos[B_i+k], thickness, color,
							'divbubble2b', B_list[B_i+k], B_istep*visib, B_nstep);
					else if (k==3)
						drawBubble_Text(document.getElementById('canvas2c'), B_pos[B_i+k], B_pointPos[B_i+k], thickness, color,
							'divbubble2c', B_list[B_i+k], B_istep*visib, B_nstep);
					else if (k==4)
						drawBubble_Text(document.getElementById('canvas2d'), B_pos[B_i+k], B_pointPos[B_i+k], thickness, color,
							'divbubble2d', B_list[B_i+k], B_istep*visib, B_nstep);
				}
				else if (B_zone[B_i+k] == 'vm12')
					drawBubble_Text(document.getElementById('canvas3'), B_pos[B_i+k], B_pointPos[B_i+k], thickness, color,
						'divbubble3', B_list[B_i+k], B_istep*visib, B_nstep);
				$('.bubbletext0').show();
				$('.bubbletext1').show();
			}
		}
	}
}

function clearCanvas(Canvas) {
	Canvas.getContext('2d').clearRect(0, 0, Canvas.width, Canvas.heigth);
	Canvas.width = Canvas.width;
}

function drawBubble_Text(Canvas, posit, pointPlace, Thickness, Color, idTextTarget, Text, iStep, nStep) { /*
	*	Canvas       canvas where to draw
	*	posit	     x, y, w, h, radius, px0,py0, px1,py1, ... With any number of pxi,pyi (arrowheads) from 0 (no px1,pyi)
	*	pointPlace   'ul', 'ur', 'ru', 'rd', 'dr', 'dl', 'ld', 'lu'
	*	Thickness    relative tickness of bubble arrow. If 0, default (0.1 of width or 0.2 of height)
	*   Color        border color
	*	idTextTarget id of bubbletext object
	*	Text         text to write at TextTarget
	*	iStep        step to indicate in the bubble "(iStep/nStep)", 0 for no indication
	*	nStep        number of steps to indicate in bubble               	*/

	var x = posit[0]*Canvas.width;	
	var y = posit[1]*Canvas.height;
	var w = posit[2]*Canvas.width;
	var h = posit[3]*Canvas.height;	
	var radius = posit[4];
	//X var px = posit[5]*Canvas.width;
	//X var py = posit[6]*Canvas.height;

	var r = x + w;
	var b = y + h;
	
	var ctx = Canvas.getContext('2d'); 
	ctx.beginPath();
	ctx.strokeStyle=Color;
	ctx.fillStyle='white';
	ctx.lineWidth="1";
	ctx.moveTo(x+radius, y);

	// wL   (widthLow)   proportion where to begin first arrow on horizontal line
	// wH   (widthHigh)  proportion where to finish last arrow on horizontal line
	// hL   (heightLow)  proportion where to begin first arrow on vertical line
	// hH   (heightHigh) proportion where to finish last arrow on vertical line
	wL = 0.2*w;
	hL = 0.1*h;
	if (Thickness>0) {
		wH = wL + Thickness*(posit.length-5)*w;
		hH = hL + Thickness*(posit.length-5)*h;
	}
	else {
		wH = wL + 0.035*(posit.length-5)*w;
		hH = hL + 0.1*(posit.length-5)*h;
	}
	if (pointPlace == 'ul') drawhead(ctx, x+radius+ wL,y, posit, Canvas.width,Canvas.height, x+radius+wH,y);
	if (pointPlace == 'ur') drawhead(ctx, r-radius - wH,y, posit, Canvas.width,Canvas.height, r-radius-wL,y);
	ctx.lineTo(r-radius, y); //to end up side
	ctx.quadraticCurveTo(r, y, r, y+radius);
	if (pointPlace == 'ru') drawhead(ctx, r, y+radius+hL, posit, Canvas.width,Canvas.height, r, y+radius +hH);
	if (pointPlace == 'rd') drawhead(ctx, r, b-radius-hH, posit, Canvas.width,Canvas.height, r, b-radius-hL);
	ctx.lineTo(r, b-radius);
	ctx.quadraticCurveTo(r, b, r-radius, b);
	if (pointPlace == 'dr') drawhead(ctx, r-radius-wL, b, posit, Canvas.width,Canvas.height, r-radius-wH, b);
	if (pointPlace == 'dl') drawhead(ctx, x+radius+wH, b, posit, Canvas.width,Canvas.height, x+radius+wL, b);
	ctx.lineTo(x+radius, b);
	ctx.quadraticCurveTo(x, b, x, b-radius);
	if (pointPlace == 'ld') drawhead(ctx, x, b-radius-hL, posit, Canvas.width,Canvas.height, x, b-radius-hH);
	if (pointPlace == 'lu') drawhead(ctx, x, y+radius+hH, posit, Canvas.width,Canvas.height, x, y+radius+hL);
	ctx.lineTo(x, y+radius);
	ctx.quadraticCurveTo(x, y, x+radius, y);
	ctx.stroke();
	ctx.fill();

	var margin = radius;
	if (iStep>0) $('#' + idTextTarget).html(Text + "</br><small>(" + iStep + "/" + nStep + ")</small>");	
	else $('#' + idTextTarget).html(Text);
	// $('#' + idTextTarget).width(w-2*margin);
	// $('#' + idTextTarget).css({top: y+(h-$('#' + idTextTarget).height())/2, left: x+margin, position:'absolute'});
  var obj = window.document.getElementById(idTextTarget);
  var fontSize = parseFloat(obj.style.fontSize);
  obj.style.width = (w-2*margin) / Canvas.width * 100 + "%";
  obj.style.position = "absolute";
	var BtextHeight = $('#' + idTextTarget).height();
  obj.style.top = (y+(h-(BtextHeight*8/fontSize))/2) / Canvas.height * 100 + "%"; // Assuming fontSize of ZoneBigIm is 8pt
  obj.style.left = (x+margin) / Canvas.width * 100 + "%";
}

function drawhead(ctx, pt1x,pt1y, posit_, W,H, pt2x,pt2y) { /*
	*	draw from 0 to n arrowheads according to posit_.length
	*	ctx         canvas context
	*	pt1x,pt1y	first point up to where to draw (pixel units)
	*	posit_		arrowheads (normalized units), only from posit_[5] and by couple  pxi,pyi
	*	W,H			width,height of canvas (pixel units)
	*	pt2x,pt2y	last point up to where to draw (pixel units)  */
	ctx.lineTo(pt1x, pt1y);	//draw first line
	if  (posit_.length > 5) { // If arrowheads to draw
		n = (posit_.length-5)/2; // number of arrowheads
		for (var ii=1; ii<=n; ii++)
		{
			if ((posit_[2*ii+3]>0) || (posit_[2*ii+4]>0)) // just a space if both of posit_[2*ii+3] and posit_[2*ii+4] are 0
				ctx.lineTo(posit_[2*ii+3]*W, posit_[2*ii+4]*H);  //Move to arrowhead
			ctx.lineTo((n-ii)/n * pt1x + ii/n * pt2x, (n-ii)/n * pt1y + ii/n * pt2y);  // back to rect
		}
	}
	else // else only rectangle
		ctx.lineTo(pt2x, pt2y); //Move to point
}	

function toggleBubbles()
{
	if(draw)
	{
		draw = false;
	}
	else
	{
		draw = true;
	}
	drawBubble4('bidon', draw);
}
	
