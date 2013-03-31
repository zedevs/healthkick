/* CREATE POST HANDLER */
$(document).ready(function(){
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
	
	/* LISTEN FOR CONNECTION DROP */
	document.addEventListener("offline", function() { $('.modal-box').hide(); $('.modal-internet-error, .dim').show(); }, false);
	
	/* LISTEN FOR RE-CONNECTION */
	document.addEventListener("online", function() { $('.modal-internet-error, .dim').hide(); }, false);
	
	$('.button-create-post').click(function(){
		$('.modal-create-post, .dim').show();
	});
});
