$(document).ready(function(){
	db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM `settings` WHERE `ID` = "NAME"', [], function(tx, results) {
			$('#login_name').text(results.rows.item(0).string);
		});
	});
	
	$('#login_form').submit(function(e){
		e.preventDefault();
		db.transaction(function(tx) {
			tx.executeSql('SELECT * FROM `settings` WHERE `ID` = "PASSCODE"', [], function(tx, results) {
				if($('#login_passcode').val() == results.rows.item(0).string){
					window.location = "dashboard.html";			
				}else{
					$('.modal-invalid-passcode, .dim').show();	
				}
			});
		});
		return false;
	});
});