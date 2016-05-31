window.onload = function() {
	CKEDITOR.replace( 'text-editor' );
	atachEventsToTextArea();
}

function atachEventsToTextArea() {
	$('#text-editor').on('keydown, keyup', checkLastWord);
}

function checkLastWord() {
	
}