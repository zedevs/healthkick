$(document).ready(function(){
	db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM `settings` WHERE `ID` != "PASSCODE"', [], function(tx, results) {
			for(var i = 0; i < results.rows.length; i++){
				if(results.rows.item(i).string != null){
					$('#settings_'+results.rows.item(i).ID.toLowerCase()).val(results.rows.item(i).string);
				}else{
					$('#settings_'+results.rows.item(i).ID.toLowerCase()).val(results.rows.item(i).integer);
				}
			}
		});
	});
	
	$('#settings_form').submit(function(e){
		e.preventDefault();
		var errors = false;
		var error = '';
		
		if($('#settings_name').val() == "" && errors == false){
			error = 'You must enter your name.';
			errors = true;	
		}
		
		if(($('#settings_age').val() == "" || isNaN($('#settings_age').val())) && errors == false){
			error = 'You must enter a valid age.';
			errors = true;	
		}
		if(($('#settings_height').val() == "" || isNaN($('#settings_height').val())) && errors == false){
			error = 'You must enter a valid height.';
			errors = true;	
		}
		
		if(($('#settings_gender').val() != "Male" && $('#settings_gender').val() != "Female") && errors == false){
			error = 'You must enter a valid gender.';
			errors = true;	
		}
		
		
		if($('#settings_passcode').val() != "" && (isNaN($('#settings_passcode').val()) || $('#settings_passcode').val().length != 4) && errors == false){
			error = 'You must enter a 4 digit passcode.';	
			errors = true;
		}
		
		if($('#settings_passcode').val() != $('#settings_retype_passcode').val() && errors == false){
			error = 'You must enter an identical password twice.';
			errors = true;	
		}
		
		if(errors == false){
			db.transaction(updateDatabase, updateFailed, function(){
				$('.modal-validation-heading').text("It's cool.");
				$('.modal-validation-text').text("We've saved your changes!");
				$('.modal-validation-error, .dim').show();
			});
			
		}else{
			$('.modal-validation-heading').text('Oops!');
			$('.modal-validation-text').text(error);
			$('.modal-validation-error, .dim').show();
		}
		
		return false;
	});
	
	function updateDatabase(trans){
		trans.executeSql('UPDATE `settings` SET `string` = "'+escape($('#settings_name').val())+'" WHERE `ID` = "NAME"');
		trans.executeSql('UPDATE `settings` SET `integer` = "'+$('#settings_age').val()+'" WHERE `ID` = "AGE"');
		trans.executeSql('UPDATE `settings` SET `integer` = "'+$('#settings_height').val()+'" WHERE `ID` = "HEIGHT"');
		trans.executeSql('UPDATE `settings` SET `string` = "'+escape($('#settings_gender').val())+'" WHERE `ID` = "GENDER"');
		if($('#settings_passcode').val() != ""){
			trans.executeSql('UPDATE `settings` SET `string` = "'+escape($('#settings_passcode').val())+'" WHERE `ID` = "PASSCODE"');
		}	
	}
	
	function updateFailed(err) {
		$('.modal-validation-heading').text('Oops!');
	   $('.modal-validation-text').text("Oh no. Something went wrong. Please restart the application.");
	   $('.modal-validation-error, .dim').show();
	}
	
});