/*
Javascript function called after each action defined in meta file
SPn 131219: argin ExplodeMessage
SPn 130430: correction
*/

function StateCheck(progressBar, VMnum, ExplodeMessage){
//Teste l'état actuel
	//Trouver un manière de calculer k
	var k=parseInt(Vm[VMnum].ImId); // indice de la nouvelle image (je pense)
	var bar=document.getElementById(progressBar);
	switch(State)
	{
	case 0:
		//Set progress bar to 0
		bar.value=0;
		//Si l'état prochain est l'état est l'état actuel +1, fait avancer la barre de progression
		if (NextState[0][k] == 1)
		{
		bar.value=20;
		}
		//Sinon, si l'état prochain est différent que l'état actuel, remet la barre de progression à zéro
		else if (NextState[0][k]!=0)
		{
		bar.value=0;
		}
		//Met à jour l'état actuel
		State=NextState[0][k];
		//Vérifie que la source ne doit pas exploser
		UsourceExplose(VMnum, ExplodeMessage);
	break;
	case 1:
		//Si l'état prochain est l'état est l'état actuel +1, fait avancer la barre de progression
		if (State <= 1 && NextState[1][k] == 2)
		{
		bar.value=40;
		}
		//Sinon, si l'état prochain est différent que l'état actuel, remet la barre de progression à zéro
		else if (NextState[1][k]!=1)
		{
		bar.value=0;
		}
		//Met à jour l'état actuel
		State=NextState[1][k];
		//Vérifie que la source ne doit pas exploser
		UsourceExplose(VMnum, ExplodeMessage);
	break;
	case 2:
		//Si l'état prochain est l'état est l'état actuel +1, fait avancer la barre de progression
		if (State <= 2 && NextState[2][k] == 3)
		{
		bar.value=60;
		}
		//Sinon, si l'état prochain est différent que l'état actuel, remet la barre de progression à zéro
		else if (NextState[2][k]!=2)
		{
		bar.value=0;
		}
		//Met à jour l'état actuel
		State=NextState[2][k];
		//Vérifie que la source ne doit pas exploser
		UsourceExplose(VMnum, ExplodeMessage);
	break;
	case 3:
		//Si l'état prochain est l'état est l'état actuel +1, fait avancer la barre de progression
		if (State <= 3 && NextState[3][k] == 4)
		{
		bar.value=80;
		}
		//Sinon, si l'état prochain est différent que l'état actuel, remet la barre de progression à zéro
		else if (NextState[3][k]!=3)
		{
		bar.value=0;
		}
		//Met à jour l'état actuel
		State=NextState[3][k];
		//Vérifie que la source ne doit pas exploser
		UsourceExplose(VMnum, ExplodeMessage);
	break;
	case 4:
		//Si l'état prochain est l'état est l'état actuel +1, fait avancer la barre de progression
		if (NextState[4][k] == 5)
		{
		bar.value=100;
		//send the OK message
		alert("Félicitations!!!!! Tu as réussi ;) ");
		//Remise à zéro
		State=0;
		Vm[VMnum].ImId = StartIm;
		convId_Im2Lr(VMnum);
		dispIm(VMnum, ExplodeMessage);
		}
		//Sinon
		else
		{
		if (NextState[4][k]!=4)
			{
		bar.value=0;
			}
		//Met à jour l'état actuel
		State=NextState[4][k];
		//Vérifie que la source ne doit pas exploser
		UsourceExplose(VMnum, ExplodeMessage);
		}
	break;
	}
}

// Check if the source explodes
function UsourceExplose(VMnum, ExplodeMessage){
// If the source explodes
	if (State==-1){
		//Put the Explode message on the screen
		alert(ExplodeMessage);
		//Put the first image
		Vm[VMnum].ImId = StartIm;
		convId_Im2Lr(VMnum);
		dispIm(VMnum);
		//Set the State at zero
		State = 0;
	}
}
