$(document).ready(function(){

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
		parseRSS(RSS, processFeed); 
		$('.modal-internet-error, .dim').hide(); $('.modal-downloading, .dim').show();
	}, false);	

  // RSS url
  var RSS = "http://www.bodybuilding.com/rss/articles/nutrition";
  parseRSS(RSS, processFeed);
  
  $("#feed_list").on("click", "a", function(e){
  		e.preventDefault();
  		window.open($(this).attr("href"), "_system");
  });
  
  $('.reload-feed').click(function(){
  	 $("#feed_list").fadeOut('fast', function(){
  	 	 $("#feed_list").html('').show();
  	 	 $('.modal-downloading, .dim').show();
  	 	 parseRSS(RSS, processFeed);
  	 });	
  });
  
  
});

function processFeed(items){
  // console.log(items);
  var entries = [];
  var s = "";
  $.each(items, function (i, v) {
  	if(v.title && v.contentSnippet && v.link){
	    s += '<li><h3><a href="' + v.link + '" data-entryid="' + i + '" target=>' + v.title + '</a></h3><p><a href="' + v.link + '" data-entryid="' + i + '">' + v.title + '</a>' + v.contentSnippet + '</a></p></li>';
    }
  });
  //now draw the list

  $("#feed_list").append(s);

}

function parseRSS(url, callback) {
  $.ajax({
    url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
    dataType: 'json',
    success: function(data) {
      callback(data.responseData.feed.entries);
      $('.modal-downloading, .dim').hide();
    }
  });
}

