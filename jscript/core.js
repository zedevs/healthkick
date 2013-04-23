var db;
$(document).ready(function() {
	
	/* DISBALE AJAX CACHE */
	$.ajaxSetup({ cache: false });
	
	/* ONLY ALLOW SCROLLING ON THE CONTENT AREA */
	$(document).on('touchmove', function(e) {
	    if (!$(e.target).parents('#content').length) {
	        e.preventDefault();
	    }
	});
	
	/* MODAL-BOX HANDLER */
	$(document).ready(function(){
	    $('.modal-remove').click(function(){
			$(this).parents('.modal-box').hide();
			$('.dim').hide();
	    });
	});
	
	var appConfigured = window.localStorage.getItem("appConfigured");
	var current_location = window.location.toString();
	if(appConfigured == null && current_location.substr(-17) != "first_launch.html"){
		window.location = "first_launch.html";	
	}
	db = window.openDatabase("Database", "1.0", "Healthkick", 200000);
	
	
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