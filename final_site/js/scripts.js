window.onload = function() {
	CKEDITOR.replace( 'my_text' );
	atachEventsToTextArea();
}

function atachEventsToTextArea() {
	$('#my_text').on('keydown, keyup', checkLastWord);
}

function checkLastWord() {
	
}