/* ONLY ALLOW SCROLLING ON THE CONTENT AREA */
$(document).on('touchmove', function(e) {
    if (!$(e.target).parents('#content').length) {
        e.preventDefault();
    }
});

/* READY LISTENER */
document.addEventListener("deviceready", onDeviceReady, false);

/* RUN SCRIPTS WHEN READY */
function onDeviceReady() {
	var db = window.openDatabase("Database", "1.0", "Healthkick", 200000);
	db.transaction(installDB);
}


/* INSTALL THE DATABASE ON THE FIRST RUN */
function installDB(trans) {
	var firstRun = window.localStorage.getItem("firstRun");
	if(firstRun == null){
		window.localStorage.setItem("firstRun", "false"); 
		trans.executeSql('CREATE TABLE IF NOT EXISTS settings (ID VARCHAR(255) PRIMARY KEY, string TEXT, integer INT(255))');
		trans.executeSql('INSERT INTO settings (id, string, integer) VALUES ("NAME", NULL, NULL)');
		trans.executeSql('INSERT INTO settings (id, string, integer) VALUES ("AGE", NULL, NULL)');
		trans.executeSql('INSERT INTO settings (id, string, integer) VALUES ("GENDER", NULL, NULL)');
	}
}

/* CHECK IF THE APP HAS CONNECTIVITY */
function checkConnection() {
	var checkConnection = navigator.connection.type;
	if(checkConnection !== Connection.UNKOWN && checkConnectiom !== Connection.NONE){
		return true;
	}
	return false
}