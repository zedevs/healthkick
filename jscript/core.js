$(function(){
	$(window).scroll(function(e) {
	  e.preventDefault();
	});
});
// Load Cordova.
document.addEventListener("deviceready", onDeviceReady, false);

// Run Ready Scripts.
function onDeviceReady() {
	var db = window.openDatabase("Database", "1.0", "Healthkick", 200000);
	db.transaction(installDB);
}


// Install initial database.
function installDB(trans) {
	trans.executeSql('CREATE TABLE IF NOT EXISTS settings (ID VARCHAR(255) PRIMARY KEY, value TEXT)');
	//trans.executeSql('INSERT INTO settings (id, data) VALUES ("NAME", NULL)');
	//trans.executeSql('INSERT INTO settings (id, data) VALUES ("AGE", NULL)');
	//trans.executeSql('INSERT INTO settings (id, data) VALUES ("GENDER", NULL)');
}