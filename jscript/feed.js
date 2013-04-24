$(document).ready(function(){

	// RSS url
	var RSS = "http://www.bodybuilding.com/rss/articles/nutrition";

	$('.retry-internet-connection').click(function(){
		if(checkConnection() == true){
			$('.modal-internet-error, .dim').hide();
			loadQuestions();
			$('.modal-internet-error, .dim').hide(); $('.modal-downloading, .dim').show();
		}
	});
	
	/* LISTEN FOR CONNECTION DROP */
	document.addEventListener("offline", function() { 
		$('.modal-box').hide(); $('.modal-internet-error, .dim').show();		
	}, false);
	
	/* LISTEN FOR RE-CONNECTION */
	document.addEventListener("online", function() {
		if( $("#feed_list li").size() == 0){
			loadRSS(); 
		}
		$('.modal-internet-error, .dim').hide(); $('.modal-downloading, .dim').show();
	}, false);	
  
  $("#feed_list").on("click", "a", function(e){
  		e.preventDefault();
  		window.open($(this).attr("href"), "_system");
  });
  
  $('.reload-feed').click(function(){
  	 $("#feed_list").fadeOut('fast', function(){
  	 	 $("#feed_list").html('').show();
  	 	 $('.modal-downloading, .dim').show();
  	 	 loadRSS();
  	 });	
  });
  
  
  function loadRSS(){
    $.ajax({
      url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(RSS),
      dataType: 'json',
      success: function(data) {
        $.each(data.responseData.feed.entries, function (i, f) {
        	if(f.title && f.contentSnippet && f.link){
        	    $("#feed_list").prepend('<li><h3><a href="' + f.link + '">' + f.title + '</a></h3><p><a href="' + f.link + '">' + f.title + '</a>' + f.contentSnippet + '</a></p></li>');
          }
        });
        $('.modal-downloading, .dim').hide();
      }
    });
  }
  
});




