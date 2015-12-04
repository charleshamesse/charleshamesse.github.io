/*
	This script allows questions, that where added to a website, to be checked in 3 languages (Dutch, Frensh, English).
	
	For each language there is a function that checks the question and alerts the result in the correct language.
*/

function checkFormNL(radioObj){
	var val = 0;
			
	for( i = 0; i < document.question.answer.length; i++ )
	{
		if( document.question.answer[i].checked == true && document.question.answer[i].value == "true"){
			alert("Juist");
			return false
		}
	}
	alert("Fout");
	return false
}
		
function checkFormFR(radioObj){
			
	var val = 0;
	
	for( i = 0; i < document.question.answer.length; i++ )
	{
		if( document.question.answer[i].checked == true && document.question.answer[i].value == "true"){
			alert("Vrai");
			return false
		}
	}
	alert("faux");
	return false
}
		
function checkFormEN(radioObj){
		
	var val = 0;
			
	for( i = 0; i < document.question.answer.length; i++ )
	{
		if( document.question.answer[i].checked == true && document.question.answer[i].value == "true"){
			alert("Correct");
			return false
		}
	}
	alert("Wrong");
	return false
}