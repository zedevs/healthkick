$(function(){

  // RSS url
  var RSS = "http://www.bodybuilding.com/rss/articles/nutrition";
  parseRSS(RSS, processFeed);
});

function processFeed(items){
  console.log(items);
  var entries = [];
  var s = "";
  $.each(items, function (i, v) {
    s += '<li><a href="' + v.link + '" data-entryid="' + i + '"><h3>' + v.title + '</h3><p>' + v.contentSnippet + '</p></a></li>';
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

