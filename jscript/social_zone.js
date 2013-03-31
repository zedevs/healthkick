/* CREATE POST HANDLER */
$(document).ready(function(){
	$('.button-create-post').click(function(){
		$('.modal-create-post, .dim').show();
	});
});
document.addEventListener("deviceready", onReadySocialZone, false);

/* RUN SCRIPTS WHEN READY */
function onReadySocialZone() {
	if(checkConnection() == false){
		$('.modal-internet-error, .dim').show();
	}
    
	$('.retry-internet-connection').click(function(){
		if(checkConnection() == true){
			$('.modal-internet-error, .dim').hide();
		}
	});
}
