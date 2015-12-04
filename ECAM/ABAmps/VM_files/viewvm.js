/* viewvm.js
 * ---------
 * Vue d'images de vidéomodèles
 * 
 *  (c) Unité Génie Electronique et Informatique, 2011-2014, ECAM - Haute Ecole Léonard de Vinci, Belgium
 *      Auteur:  F. Gueuning, M. Carlier
 * 
 * SPc 141102: currentTime modified before pause because IE11 (on Windows 7) does not take it into account just after pause + OffsetIE suppressed (no more B-frame in video)
 * SPc 130403: correction vm[].loopFirst and loopLast and transfer from dispIm to selectIm
 * SPc 130323: update vm[].loopFirst and loopLast
 * SPc 130106: Adaptation container
 * SPc 121226: Correction DispToDo
 * SPM 121129: Test for video
 * SPc 121007: add functions  decImId(Lr, iVm)  and  decImIdLin(iVm) 
 * SPc 110918: création des fonctions principales                   */

//window.onload = function () {
/*	var Vm = new Array();
	//__________________________________________________________________________________________________
	Vm[0] = { "nLr": [2, 2, 2, 2, 3], // Vector of number of values for each Layer
           "LrContMax": 4,           // 0, Index of higher Layer for container
           "LrCurvesMax": 0,         // 0 or 1, index of higher Layer for curves (used for click inside curves)
           "nVm": 2,                 // Number of images in a videomodel
           "nCont":                  // Number of images in the container
           "nPtCurves": 0,           // Number of points on curves for all frequencies
			  "ImId":'0006',            // Identifieur de l'image en cours
			  "LrId": [0, 0, 0, 0, 0],  // Identifieurs numériques des Layer, allant de 0 à nLr-1
			  "Name":'V_Rp_SWITCH__vga_8_',  // ex de nom complet d'image : 'V_Rp_SWITCH__vga_8_aa0006.PNG'
			  "Ext": '.mp4',
			  "Size": [640, 480]
           "PlayUse": 1,   // use of standard video play rather than "go to by timer"
           "VidBexist": 1, // videoB existing
           "VidBrunning": 0, /* videoB active (rather than videoA) (only for PlayUse)  
           "loopFirstTime": 0,  // for First image for loop
           "loopLastTime": 0  // for Last image for loop
            };
	//¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯ */
	/* Correspondance entre 4 caractères de ImId et nombres de LrId
	 *  ex: nLr=[2 3 3 2 2 5 2], LrVmMax=2, nVm=18, ImId='0013'
	 *      Il y a donc 7 Layer (numérotés de 0 à 6), 
	 *      Layer :        0       1       2       3       4       5       6
	 *      LrId range :  0-1     0-2     0-2     0-1     0-1     0-4     0-1
	 *      LrId value :   1       0       2       1       0       3       0
	 *      ImId :  0013 = 1  +  2*0  +  6*2  + 18*1  + 36*0  + 72*3 + 360*0         */

var iVm; ;// indice de vidéomodèle (probablement 0 si une seule zone d'affichage à l'écran)
for (iVm=0; iVm<Vm.length; iVm++) {
	convId_Im2Lr(iVm); // Ajuster les LrId en fonction de ImId
}
/*if (document.images) { 	
	//preload images 
	var IM = new Array();
	var ImId; // ex: "ab0013"
	for (iVm=0; iVm<Vm.length; iVm++) {
		IM[iVm] = {};
		ImId = Vm[iVm].ImId; // ex: "ab0013"
		IM[iVm][ImId] = new Image(Vm[iVm].Size[1], Vm[iVm].Size[2]);
		IM[iVm][ImId].src = Vm[iVm].Name + ImId + Vm[iVm].Ext;
		incImIdLin(iVm);
		while (Vm[iVm].ImId != ImId) {
			// Tant qu'on n'est pas revenu à l'image de départ
			//base image 
			IM[iVm][Vm[iVm].ImId] = new Image(Vm[iVm].Size[1], Vm[iVm].Size[2]); 
			//alert(Vm[iVm].Name + Vm[iVm].ImId + Vm[iVm].Ext);
			IM[iVm][Vm[iVm].ImId].src= Vm[iVm].Name + Vm[iVm].ImId + Vm[iVm].Ext; 
			incImIdLin(iVm);
			//next images
		}
	}			
} //end of if document.images 
*/

function dispIm(iVm) { 
	/* IN:  iVm   indice de Vm ex: 0   avec
	 *                Vm[0].ImId    Identifieur d'image, ex: 'adab0013'
	 *         we need to name the image in the BODY 
	 *         so we can use its name here  */
				
	var vid = document.getElementById("vid" + iVm);
	if (Vm[iVm].VidBexist)  var vidb = document.getElementById("vid" + iVm + "b");
	var LrId = parseInt(Vm[iVm].ImId.substr(Vm[iVm].ImId.length-4, 4), 10); // 4 last characters: videomodel image index converted in integer
	if (vid.readyState<3) { // if not yet enough data about video
		DispToDo[iVm] = 1; // when onreadystatechange, refresh currentTime
    }
	else {
    DispToDo[iVm] = 0; // 121226
    var total = vid.duration;
    var currentt;
		total = vid.duration;
    if (vid.seeking) alertseeking(iVm, vid.error); // 141006 alertseeking created in functions.php
		if (Vm[iVm].VidBexist) {
      if (vidb.seeking) alertseeking("b " + iVm, vidb.error);
			if (Vm[iVm].VidBrunning) {
				vid.currentTime = Vm[iVm].loopFirstTime;
        currentt = (LrId+0.01)*total/Vm[iVm].nCont;
        if (currentt < total)  vidb.currentTime = currentt;
        else vidb.currentTime = total;
			}
			else {
				currentt =  (LrId+0.01)*total/Vm[iVm].nCont;
        if (currentt < total)  vid.currentTime = currentt;
        else vid.currentTime = total;
				vidb.currentTime = Vm[iVm].loopFirstTime;
			}
		}
		else {
      currentt =  (LrId+0.01)*total/Vm[iVm].nCont;
      if (currentt < total)  vid.currentTime = currentt;
      else vid.currentTime = total;
    }
	}
} // end of dispIm
	
/* Fonctions de conversions entre vm.ImId et vm.LrId :
 *   -------------------------------------------------
 *       - Pour les Layer contenus dans le nombre de 4 chiffres
 *          - La fonction  convId_Im2Lr(iVm)  met à jour les vm.LrId de tous les Layer <= vm.LrContMax
 *                                             en fonction du nombre de 4 chiffres de vm.ImId
 *          - La fonction  convId_Lr2Im(iVm)  met à jour le nombre de 4 chiffres de vm.ImId
 *                                             en fonction des vm.LrId de tous les Layer <= vm.LrContMax
 */

 function convId_Im2Lr(iVm, LrId) {
	// met à jour les vm.LrId de tous les Layer en fonction du nombre de 4 chiffres de vm.ImId ou du numéro d'image LrId (si fourni)
	// In: LrId: index of image (default value: computed from vm.ImId last 4 characters)
	var i;
	var d = 1; // diviseur
	LrId = typeof LrId !== 'undefined' ? LrId : parseInt(Vm[iVm].ImId.substr(Vm[iVm].ImId.length-4, 4), 10); // 4 last characters of ImId: index of image

	for (i=0; i<=Vm[iVm].LrContMax; i++) {
		d = d*Vm[iVm].nLr[i];
	}
	for (i=Vm[iVm].LrContMax; i>=0; i--) { // Pour chaque Layer du Vm en commençant par celui de poids fort
        d = d / Vm[iVm].nLr[i];
		Vm[iVm].LrId[i] = Math.floor(LrId / d);
		LrId = LrId - Vm[iVm].LrId[i] * d;
	}		
}

function convId_Lr2Im(iVm) {
	// met à jour le nombre de 4 chiffres de vm.ImId en fonction des vm.LrId de tous les Layer <= vm.LrContMax
	var LrId;
	var i;
	LrId = Vm[iVm].LrId[Vm[iVm].LrContMax];
	for (i=Vm[iVm].LrContMax-1; i>=0; i--) { // Pour chaque Layer du Vm en commençant par celui de poids fort
        LrId = LrId * Vm[iVm].nLr[i] + Vm[iVm].LrId[i];
	}
	if (LrId<10) {
		Vm[iVm].ImId = Vm[iVm].ImId.substring(0, Vm[iVm].ImId.length-4) + "000" + LrId;
	}
	else if (LrId<100) {
		Vm[iVm].ImId = Vm[iVm].ImId.substring(0, Vm[iVm].ImId.length-4) + "00" + LrId;
	}
	else if (LrId<1000) {
		Vm[iVm].ImId = Vm[iVm].ImId.substring(0, Vm[iVm].ImId.length-4) + "0" + LrId;
	}
	else {
		Vm[iVm].ImId = Vm[iVm].ImId.substring(0, Vm[iVm].ImId.length-4) + LrId;
	}
}
	
/* Fonctions d'incrément de ImId :
 * -----------------------------
 * - incImId(Lr, iVm)  incrémente vm.LrId[Lr] modulo vm.nLr[Lr] et met à jour vm.ImId
 * - decImId(Lr, iVm)  décrémente vm.LrId[Lr] modulo vm.nLr[Lr] et met à jour vm.ImId
 * - incImIdSat(Lr, iVm)  incrémente vm.LrId[Lr] avec saturation (au maximum jusque vm.nLr[Lr]-1) et met à jour vm.ImId
 * - decImIdSat(Lr, iVm)  décrémente vm.LrId[Lr] avec saturation (pas plus bas que 0) et met à jour vm.ImId
 */

function incImId(Lr, iVm) {
	// incrémente vm.LrId[Lr] modulo vm.nLr[Lr] et met à jour vm.ImId
	Vm[iVm].LrId[Lr]++;
	if (Vm[iVm].LrId[Lr]==Vm[iVm].nLr[Lr]) { // Si au-delà du maximum
        Vm[iVm].LrId[Lr] = 0;
	}
	convId_Lr2Im(iVm);
}

function decImId(Lr, iVm) {
	// décrémente vm.LrId[Lr] modulo vm.nLr[Lr] et met à jour vm.ImId
	if (Vm[iVm].LrId[Lr] == 0) { // Si au minimum
		Vm[iVm].LrId[Lr] = Vm[iVm].nLr[Lr]; // max+1
	}
	Vm[iVm].LrId[Lr]--;
	convId_Lr2Im(iVm);
}

function incImIdSat(Lr, iVm) {
	// incrémente vm.LrId[Lr] avec saturation (au maximum jusque vm.nLr[Lr]-1) et met à jour vm.ImId
	if (Vm[iVm].LrId[Lr]<Vm[iVm].nLr[Lr]-1)  Vm[iVm].LrId[Lr]++;
	convId_Lr2Im(iVm);
}

function decImIdSat(Lr, iVm) {
	// décrémente vm.LrId[Lr] avec saturation (pas plus bas que 0) et met à jour vm.ImId
	if (Vm[iVm].LrId[Lr] > 0) Vm[iVm].LrId[Lr]--;
	convId_Lr2Im(iVm);
}

function selectIm2(iVm, nPtCurves, Event, This)
{
	selectIm(iVm, Math.ceil(nPtCurves/100*(Event.pageX - This.offsetLeft - This.offsetParent.offsetLeft)*img0_W/This.parentElement.clientWidth*1.147)); // 1.147 par r騬e de trois ࡬'ꤲan
}

function selectIm(iVm, img)
{
	// 130106: img is the index of the image inside curves, therefore,
	// it only affects Layers up to LrCurvesMax (Layer 0 and perhaps Layer 1)
	// We need img < nPtCurves
	var ImId = img;
	var vid = document.getElementById("vid" + iVm);
	var total = vid.duration;
	if (vid.readyState<3) { // if not yet enough data about video
		DispToDo[iVm] = 2; // when onreadystatechange, refresh currentTime
    }
	else {
    if (ImId >= Vm[iVm].nPtCurves)  ImId = Vm[iVm].nPtCurves-1;
    if (Vm[iVm].LrCurvesMax==0) {
      Vm[iVm].LrId[0] = ImId; // Only Lr0 modified
    }
    else { // LrCurvesMax assumed at Layer 1
      Vm[iVm].LrId[1] = Math.floor(ImId/Vm[iVm].nLr[0]);
      Vm[iVm].LrId[0] = ImId - Vm[iVm].LrId[1] * Vm[iVm].nLr[0];
    }
    convId_Lr2Im(iVm); // Update vm.ImId
    var LrId = parseInt(Vm[iVm].ImId.substr(Vm[iVm].ImId.length-4, 4), 10); // 4 last characters: videomodel image index converted in integer
    Vm[iVm].loopFirstTime = ((Math.floor(LrId / Vm[iVm].nVm) * Vm[iVm].nVm) +0.01)*total/Vm[iVm].nCont;  // First image for loop = First image of videomodel inside container  130423
    Vm[iVm].loopLastTime = Vm[iVm].loopFirstTime + (Vm[iVm].nVm - 1)*total/Vm[iVm].nCont;  // Last image for loop
    dispIm(iVm);
  }
}



function Timer(iVm){ 		//Boucle de 100 milisecondes
	if(Run[iVm] == 1)
	{
		timeoutID[iVm] = window.setTimeout("Timer(" + iVm + ")",TimeOut[iVm]);//
		incImId(0, iVm); 
		dispIm(iVm);
	}
}

function Timer2(iVm){ 		//Loop 10 milisecondes
	if(Run[iVm] == 1)
	{
		timeoutID[iVm] = window.setTimeout("Timer2(" + iVm + ")", 10);// 10ms
		var vid = document.getElementById("vid" + iVm);	
		var vidb = document.getElementById("vid" + iVm + "b");
		//var Plus = document.getElementById("Plus"); // for test	
		//var Moins = document.getElementById("Moins"); // for test	
		//var PlayPause = document.getElementById("PlayPause"); // for test	
		if (Vm[iVm].VidBrunning) {
			if (vidb.currentTime>Vm[iVm].loopLastTime) {
				vidb.style.visibility='hidden'; // for IExplorer
				vid.style.visibility='visible'; // for IExplorer
				vid.play();
				vidb.currentTime = Vm[iVm].loopFirstTime; // before pause for IE (141102, IE11 on Win7) unable to execute it just after pause
				vidb.pause();
				Vm[iVm].VidBrunning = 0;
				//vidb.currentTime = Vm[iVm].loopFirstTime;
        //Plus.innerHTML = "<b>" + vid.currentTime.toFixed(2) + "</b>";
        //Moins.innerHTML = vidb.currentTime.toFixed(2);
        //PlayPause.innerHTML = Vm[iVm].loopFirstTime;
			}
		}
		else 
		{
			if (vid.currentTime>Vm[iVm].loopLastTime) {
        //X vid.loop = true;
				//vid.hidden = true;
				//vidb.hidden = false;
				vid.style.visibility='hidden'; // for IExplorer
				vidb.style.visibility='visible'; // for IExplorer
				vidb.play();
				vid.currentTime = Vm[iVm].loopFirstTime; // before pause for IE (141102, IE11 on Win7) unable to execute it just after pause
				vid.pause();
				Vm[iVm].VidBrunning = 1;
				//vid.currentTime = Vm[iVm].loopFirstTime;
				/// vid.play(); ///
        //Plus.innerHTML = vid.currentTime.toFixed(2);
        //Moins.innerHTML = "<b>" + vidb.currentTime.toFixed(2) + "</b>";
        //PlayPause.innerHTML = Vm[iVm].loopFirstTime;
			}
		}
	}
}
		
function StartStop(iVm){		//Arret de la boucle
	if (Run[iVm]==1) {
		Stop(iVm);
		incImId(0,iVm); //130411 because without it seen going to back on firefox ubuntu
		dispIm(iVm); //130411 seems to give a better result on firefox ubuntu but surprising
	} else {
		Start(iVm);
	}
}
		
function Start(iVm){
//Demarrage de la boucle
	if (Run[iVm]==1) Stop(iVm);
	Run[iVm] = 1;
	if(Vm[iVm].PlayUse != 1)
	{
		Timer(iVm);
	}
	else 
	{	
		if(Vm[iVm].VidBrunning)
		{
			var vidb = document.getElementById("vid" + iVm + "b");	
			vidb.play();
			Timer2(iVm);
		}
		else
		{
			var vid = document.getElementById("vid" + iVm);	
			vid.play();
			if (Vm[iVm].VidBexist) 	Timer2(iVm);
		}
	}
}

function Stop(iVm){		//Arret de la boucle
	if((Vm[iVm].PlayUse != 1) || Vm[iVm].VidBexist)
	{
		window.clearTimeout(timeoutID[iVm]);
	}
	Run[iVm] = 0;
	if(Vm[iVm].PlayUse)
	{
		var vid = document.getElementById("vid" + iVm);	
		vid.pause();
		if(Vm[iVm].VidBrunning)
		{
			var vidb = document.getElementById("vid" + iVm + "b");	
			vidb.pause();
			convId_Im2Lr(iVm, Math.round(vidb.currentTime/vidb.duration*Vm[iVm].nCont)); // update vm.LrId from currentTime
			convId_Lr2Im(iVm); // update vm.ImId from vm.LrId
		}
		else
		{
			convId_Im2Lr(iVm, Math.round(vid.currentTime/vid.duration*Vm[iVm].nCont)); // update vm.LrId from currentTime
			convId_Lr2Im(iVm); // update vm.ImId from vm.LrId
		}
	}
}
		
function Slower(iVm) {
	if(Vm[iVm].PlayUse == 1)
	{
		var vid = document.getElementById("vid" + iVm);	
		if (vid.defaultPlaybackRate) vid.defaultPlaybackRate = vid.defaultPlaybackRate/1.4142;
		else vid.defaultPlaybackRate = 1;
		if (vid.playbackRate) vid.playbackRate = vid.playbackRate/1.4142;
		else vid.playbackRate = 1;
		if (Vm[iVm].VidBexist) {
			var vidb = document.getElementById("vid" + iVm + "b");	
			if (vidb.defaultPlaybackRate) vidb.defaultPlaybackRate = vidb.defaultPlaybackRate/1.4142;
			else vidb.defaultPlaybackRate = 1;
			if (vidb.playbackRate) vidb.playbackRate = vidb.playbackRate/1.4142;
			else vidb.playbackRate = 1;
		}
	}
	else TimeOut[iVm] = TimeOut[iVm] * 1.4142;
}
		
function Faster(iVm) {
	if(Vm[iVm].PlayUse == 1)
	{
		var vid = document.getElementById("vid" + iVm);	
		if (vid.defaultPlaybackRate) vid.defaultPlaybackRate = vid.defaultPlaybackRate*1.4142;
		else vid.defaultPlaybackRate = 1;
		if (vid.playbackRate) vid.playbackRate = vid.playbackRate*1.4142;
		else vid.playbackRate = 1;
		if (Vm[iVm].VidBexist) {
			var vidb = document.getElementById("vid" + iVm + "b");	
			if (vidb.defaultPlaybackRate) vidb.defaultPlaybackRate = vidb.defaultPlaybackRate*1.4142;
			else vidb.defaultPlaybackRate = 1;
			if (vidb.playbackRate) vidb.playbackRate = vidb.playbackRate*1.4142;
			else vidb.playbackRate = 1;
		}
	}
	else TimeOut[iVm] = TimeOut[iVm] / 1.4142;
}


function switchDiv2(){
  Big0Little1 = !Big0Little1;
  if (Big0Little1) {
    ZoneBigIm.appendChild(wrapper0);
    ZoneLittleIm.appendChild(wrapper1);
  }
  else {
    ZoneBigIm.appendChild(wrapper1);
    ZoneLittleIm.appendChild(wrapper0);
  }
  bubbleTextSize()
}
function bubbleTextSize(){
  if (Big0Little1) {
    $(".bubbletext0").css("font-size", "8pt");
    $(".bubbletext1").css("font-size", "4.5pt");
  }
  else {
    $(".bubbletext1").css("font-size", "8pt");
    $(".bubbletext0").css("font-size", "4.5pt");
  }
}


function toggleRectHidden(){
  var x = document.querySelectorAll(".rect_s");
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].classList.toggle("rect_std");
  }
  x = document.querySelectorAll(".rect_n");
  for (i = 0; i < x.length; i++) {
    x[i].classList.toggle("rect_next");
  }
  x = document.querySelectorAll(".rect_p");
  for (i = 0; i < x.length; i++) {
    x[i].classList.toggle("rect_previous");
  }
}