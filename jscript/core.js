var db;
$(document).ready(function() {
	/* ONLY ALLOW SCROLLING ON THE CONTENT AREA */
	$(document).on('touchmove', function(e) {
	    if (!$(e.target).parents('#content').length) {
	        e.preventDefault();
	    }
	});
	
	/* RUN SCRIPTS WHEN READY */
	function onDeviceReady() {
		var appConfigured = window.localStorage.getItem("appConfigured");
		var current_location = window.location.toString();
		if(appConfigured == null && current_location.substr(-17) != "first_launch.html"){
			window.location = "first_launch.html";	
		}
		db = window.openDatabase("Database", "1.0", "Healthkick", 200000);
	}
	onDeviceReady();
	
	/* CHECK IF THE APP HAS CONNECTIVITY */
	function checkConnection() {
	    var checkConnection = navigator.connection.type;
		if(checkConnection != Connection.UNKNOWN && checkConnection != Connection.NONE){
	        return true;
		}
		return false;
	}
	
	/* MODAL-BOX HANDLER */
	$(document).ready(function(){
	    $('.modal-remove').click(function(){
			$(this).parents('.modal-box').hide();
			$('.dim').hide();
	    });
	});
});

/* Query additional information for the row you're already querying */
function queryAchievementRecords(sql, row, callBack){
   db.transaction(function (tx) {
      tx.executeSql(sql, [], function(tx, result){
         callBack(result, row);
      });
   });
} 