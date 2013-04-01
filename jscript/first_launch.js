/* INSTALL HANDLER */
$(document).ready(function(){


$('#first_launch_form').submit(function(){
	
	var errors = false;
	var error = '';
	
	if($('#first_launch_name').val() == "" && errors == false){
		error = 'You must enter your name.';
		errors = true;	
	}
	
	if(($('#first_launch_age').val() == "" || $('#first_launch_age').val().isNaN()) && errors == false){
		error = 'You must enter a valid age.';
		errors = true;	
	}
	
	if(($('#first_launch_height').val() == "" || $('#first_launch_height').val().isNaN()) && errors == false){
		error = 'You must enter a valid height.';
		errors = true;	
	}
	
	if(($('#first_launch_gender').val() != "Male" && $('#first_launch_gender').val() != "Female") && errors == false){
		error = 'You must enter a valid gender.';
		errors = true;	
	}
	
	if(($('#first_launch_passcode').val() == "" || $('#first_launch_passcode').val().isNaN()) && errors == false){
		error = 'You must enter a 4 digit passcode.';	
		errors = true;
	}
	
	if($('#first_launch_passcode').val() != $('#first_launch_retype_passcode') && errors == false){
		error = 'You must enter an identical password twice.';
		errors = true;	
	}
	
	if(errors == false){
		
	}else{
		$('.modal-validation-text').text(error);
		$('.modal-validation-error, .dim').show();
	}
	
	return false;
});

/* INSTALL THE DATABASE */
function installDB(trans) {
	trans.executeSql('CREATE TABLE IF NOT EXISTS settings (ID VARCHAR(255) PRIMARY KEY, string TEXT, integer INT(255))');
	trans.executeSql('INSERT INTO settings (id, string, integer) VALUES ("NAME", NULL, NULL)');
	trans.executeSql('INSERT INTO settings (id, string, integer) VALUES ("AGE", NULL, NULL)');
	trans.executeSql('INSERT INTO settings (id, string, integer) VALUES ("GENDER", NULL, NULL)');
}

});