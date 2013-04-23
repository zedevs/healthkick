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

    $('.retry-internet-connection').click(function () {
        if (checkConnection() == true) {
            $('.modal-internet-error, .dim').hide();
            loadQuestions();
            $('.modal-internet-error, .dim').hide();
            $('.modal-downloading, .dim').show();
        }
    });

    /* LISTEN FOR CONNECTION DROP */
    document.addEventListener("offline", function () {
        $('.modal-box').hide();
        $('.modal-internet-error, .dim').show();
    }, false);

    /* LISTEN FOR RE-CONNECTION */
    document.addEventListener("online", function () {
    	loadTweets();
        $('.modal-internet-error, .dim').hide();
    }, false);

    $('.button-create-post').click(function () {
        $('.modal-create-post, .dim').show();
    });
	    
    $('#twitter_form').submit(function (e) {
    	e.preventDefault();
    	tweet();
    });
    
   
    var oauth;
    var config 	= {
    				consumerKey: 		'sPs42tdK9cUPENxoa5j4sw',
    				consumerSecret: 	'Um1UYzaz0l2dRgROsY0XVBox49QO2MFNwOe99QwucNg',
    				callbackUrl: 		'http://homepages.cs.ncl.ac.uk/2012-13/Csc2015Team1/',
    				authorizationUrl: 	'https://api.twitter.com/oauth/authorize',
    				accessTokenUrl: 	'https://api.twitter.com/oauth/access_token',
    				requestTokenUrl: 	'https://api.twitter.com/oauth/request_token'
    }
    var childbrowser;
    var temp;
    
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        childbrowser = window.plugins.childBrowser;        
    	twitterAuth();
    }
    
    function loadTweets(){
    	$('.social_feed').html('');
        $.getJSON("http://search.twitter.com/search.json?rpp=25&callback=?&q=%23healthkick", function (tweets) {
            for (var i = 0; i < tweets.results.length; i++) {
                $('.social_feed').prepend('<li>' +
                    '<img src="' + tweets.results[i].profile_image_url + '">' +
                    '<h3>' + tweets.results[i].from_user_name + '</h3>' +
                    '<p>' + tweets.results[i].text + '</p>' +
                    '</li>');
            }
        });
    }
    loadTweets();
    
    function twitterAuth() {
    	oauth = OAuth(config);
		
		console.log("Key: " + oauth.getAccessTokenKey());
		console.log("Secret: " + oauth.getAccessTokenSecret());
		if (!oauth.getAccessTokenKey() || !oauth.getAccessTokenSecret()) {
			oauth.fetchRequestToken(function (url) {
				childbrowser.showWebPage(url);
				 childbrowser.onLocationChange = function (url) {
					if (url.indexOf('http://homepages.cs.ncl.ac.uk/2012-13/Csc2015Team1/?') >= 0) {
						var index, code = '';
					    var params = url.substr(url.indexOf('?') + 1);
						params = params.split('&');
					    for (var i = 0; i < params.length; i++) {
					    	var y = params[i].split('=');
					    	if (y[0] === 'oauth_verifier') {
					    		code = y[1];
					    	}
					    }
						oauth.setVerifier(code);
						oauth.fetchAccessToken(function (data) {
							var authData = {};
							var qvars_tmp = data.text.split('&');
							for (var i = 0; i < qvars_tmp.length; i++) {
							    var y = qvars_tmp[i].split('=');
							    authData[y[0]] = decodeURIComponent(y[1]);
							}
							oauth.setAccessToken([authData.oauth_token, authData.oauth_token_secret]);
							window.plugins.childBrowser.close();
						}, function (data) {
							// Error
						});
						
					}else{
					 // Error
					}
				}
			}, function (data) {
				// Error
			});
		}
		    	
    }
    
    
    function tweet() {
           
       oauth.post('https://api.twitter.com/1/statuses/update.json', {
                'status': $("#tweet_msg").val(),
                'trim_user': 'true'
       }, function (data) {
       			$("#tweet_msg").val('');
                $('.modal-create-post, .dim').hide();
       }, function(){
       		// Oops something went wrong.
       });
    }
        
});