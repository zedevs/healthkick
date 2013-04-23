/* CREATE POST HANDLER */
$(document).ready(function(){

	var config 	= {
					consumerKey: 		'sPs42tdK9cUPENxoa5j4sw',
					consumerSecret: 	'Um1UYzaz0l2dRgROsY0XVBox49QO2MFNwOe99QwucNg',
					callbackUrl: 		'http://homepages.cs.ncl.ac.uk/2012-13/Csc2015Team1/',
					authorizationUrl: 	'https://api.twitter.com/oauth/authorize',
					accessTokenUrl: 	'https://api.twitter.com/oauth/access_token',
					requestTokenUrl: 	'https://api.twitter.com/oauth/request_token'
	}
	var oauth = OAuth(config);
	var childbrowser;
	var childbrowserOpen = false;
		
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
    	if ((!oauth.getAccessTokenKey() || !oauth.getAccessTokenSecret()) && childbrowserOpen == false) {
	    	childbrowser = window.plugins.childBrowser;
	    	childbrowser.onClose = function(){
	    		childbrowserOpen = false;
	    	};       
	    	twitterAuth();
    	}
    }, false);
	
    $('.button-create-post').click(function () {
        $('.modal-create-post, .dim').show();
    });
	    
    $('#twitter_form').submit(function (e) {
    	e.preventDefault();
    	tweet();
    });
    
    $('.modal-twitter-fail').click(function () {
    	window.localStorage.removeItem("oauth_token");
    	window.localStorage.removeItem("oauth_token_secret");
    	$('.modal-twitter-fail, .dim').hide();
    	twitterAuth();
    });
    
    function loadTweets(){
    	$('.social_feed').html('');
        $.getJSON("http://search.twitter.com/search.json?rpp=25&callback=?&q=%23healthkick&result_type=recent", function (tweets) {
            for (var i = 0; i < tweets.results.length; i++) {
                $('.social_feed').prepend('<li>' +
                    '<img src="' + tweets.results[i].profile_image_url + '">' +
                    '<h3>' + tweets.results[i].from_user_name + '</h3>' +
                    '<p>' + tweets.results[i].text + '</p>' +
                    '</li>');
            }
        });
    }
    
    function twitterAuth() {
		$('.modal-twitter-connecting, .dim').show();
		if (window.localStorage.getItem("oauth_token") == null || window.localStorage.getItem("oauth_token_secret") == null) {
			oauth.fetchRequestToken(function (url) {
				 childbrowser.showWebPage(url);
				 childbrowserOpen = true;
				 childbrowser.onLocationChange = function (url) {
					if (url.indexOf(config.callbackUrl+'?') >= 0) {
						oauth.setVerifier(getURLParm(url, 'oauth_verifier'));
						oauth.fetchAccessToken(function (data) {
							window.localStorage.setItem("oauth_token", getURLParm(data.text, 'oauth_token'));
							window.localStorage.setItem("oauth_token_secret", getURLParm(data.text, 'oauth_token_secret'));
							oauth.setAccessToken(getURLParm(data.text, 'oauth_token'), getURLParm(data.text, 'oauth_token_secret'));
							window.plugins.childBrowser.close();
							$('.modal-twitter-connecting, .dim').hide();
						}, function (data) {
							$('.modal-twitter-connecting, .dim').hide();
							$('.modal-twitter-fail, .dim').show();
						});
						
					}
				}
			}, function (data) {
				$('.modal-twitter-connecting, .dim').hide();
				$('.modal-twitter-fail, .dim').show();
			});
		}else{
			$('.modal-twitter-connecting, .dim').hide();
			oauth.setAccessToken(window.localStorage.getItem("oauth_token"), window.localStorage.getItem("oauth_token_secret"));
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
       		$("#tweet_msg").val('');
       		$('.modal-create-post, .dim').hide();
       		$('.modal-twitter-fail, .dim').show();
       });
    }
    
    function getURLParm(data, key) {
    	splitData = data.split('&');
    	for (var i = 0; i < splitData.length; i++) {
    		var keyValue = splitData[i].split('=');
    		if (keyValue[0] == key) {
    			return keyValue[1];
    		}
    	}
    	return "";
    }
        
});