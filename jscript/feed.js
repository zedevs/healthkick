$(function(){

  // RSS url
  var RSS = "http://www.bodybuilding.com/rss/articles/nutrition";
  parseRSS(RSS, processFeed);
  
  $("#feed_list").on("click", "a", function(e){
  		e.preventDefault();
  		window.open($(this).attr("href"), "_system");
  });
});

function processFeed(items){
  // console.log(items);
  var entries = [];
  var s = "";
  $.each(items, function (i, v) {
    s += '<li><h3><a href="' + v.link + '" data-entryid="' + i + '" target=>' + v.title + '</a></h3><p><a href="' + v.link + '" data-entryid="' + i + '">' + v.title + '</a>' + v.contentSnippet + '</a></p></li>';
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
    }
  });
}

