var db;
$(document).ready(function() {
	var appConfigured = window.localStorage.getItem("appConfigured");
	db = window.openDatabase("Database", "1.0", "Healthkick", 200000);
	/* APPLY FEMALE COLOUR SCHEME IF REQUIRED */
	if(window.localStorage.getItem("appGender") == 'Female'){
		$('body').addClass('female');
	}
	
	/* DISBALE AJAX CACHE */
	$.ajaxSetup({ cache: false });
	
	/* ONLY ALLOW SCROLLING ON THE CONTENT AREA */
	$(document).on('touchmove', function(e) {
	    if (!$(e.target).parents('#content').length) {
	        e.preventDefault();
	    }
	});
	
	/* Fix iOS fixed bug */
	$('input, textarea').on('focus', function(){
	    $('header, #content, footer, .did_you_know').css('position', 'absolute');
	});
	$('input, textarea').on('blur', function(){
	    setTimeout(function(){
	    	$('header, #content, footer, .did_you_know').css('position', 'fixed');
	    }, 20);
	});
	
	/* MODAL-BOX HANDLER */
	$(document).ready(function(){
	    $('.modal-remove').click(function(){
			$(this).parents('.modal-box').hide();
			$('.dim').hide();
	    });
	});
	
	
	var current_location = window.location.toString();
	if(appConfigured == null && current_location.substr(-17) != "first_launch.html"){
		window.location = "first_launch.html";	
	}
	
	
	
	/* CHECK IF THE APP HAS CONNECTIVITY */
	function checkConnection() {
	    var checkConnection = navigator.connection.type;
		if(checkConnection != Connection.UNKNOWN && checkConnection != Connection.NONE){
	        return true;
		}
		return false;
	}
});

/* QUERY ADDITIONAL INFORMATION FOR THE ROW YOU'RE ALREADY QUERYING */
function queryAchievementRecords(sql, row, callBack){
   db.transaction(function (tx) {
      tx.executeSql(sql, [], function(tx, result){
         callBack(result, row);
      });
   });
} 

/* ESCAPE QUOTE ON DATABASE */
function escape(str) {
	return str.replace('/"/g', '\"');
}