var db;
/* ONLY ALLOW SCROLLING ON THE CONTENT AREA */
$(document).on('touchmove', function(e) {
    if (!$(e.target).parents('#content').length) {
        e.preventDefault();
    }
});

/* READY LISTENER */
document.addEventListener("deviceready", onDeviceReady, false);
onDeviceReady();

/* RUN SCRIPTS WHEN READY */
function onDeviceReady() {
	var appConfigured = window.localStorage.getItem("appConfigured");
	var current_location = window.location.toString();
	if(appConfigured == null && current_location.substr(-17) != "first_launch.html"){
		window.location = "first_launch.html";	
	}
	db = window.openDatabase("Database", "1.0", "Healthkick", 200000);
}

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