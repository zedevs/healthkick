/* CREATE POST HANDLER */
$(document).ready(function(){
		
	$('.retry-internet-connection').click(function(){
		if(checkConnection() == true){
			$('.modal-internet-error, .dim').hide();
			loadQuestions();
			$('.modal-internet-error, .dim').hide(); $('.modal-downloading, .dim').show();
		}
	});
	
	/* LISTEN FOR CONNECTION DROP */
	document.addEventListener("offline", function() { $('.modal-box').hide(); $('.modal-internet-error, .dim').show(); }, false);
	
	/* LISTEN FOR RE-CONNECTION */
	document.addEventListener("online", function() { $('.modal-internet-error, .dim').hide(); }, false);
	
	$('.button-create-post').click(function(){
		$('.modal-create-post, .dim').show();
	});
	
	
	$.getJSON("http://search.twitter.com/search.json?rpp=25&callback=?&q=%23healthkick",function(tweets){
		for(var i=0; i < tweets.results.length; i++){
			$('.social_feed').prepend('<li>' +
			'<img src="'+tweets.results[i].profile_image_url+'">' +
			'<h3>'+tweets.results[i].from_user_name+'</h3>' +
			'<p>'+tweets.results[i].text+'</p>' +
			'</li>');
		}
	});        
});
