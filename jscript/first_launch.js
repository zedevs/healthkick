/* INSTALL HANDLER */
$(document).ready(function(){


$('#first_launch_form').submit(function(e){
	e.preventDefault();
	var errors = false;
	var error = '';
	
	if($('#first_launch_name').val() == "" && errors == false){
		error = 'You must enter your name.';
		errors = true;	
	}
	
	if(($('#first_launch_age').val() == "" || isNaN($('#first_launch_age').val())) && errors == false){
		error = 'You must enter a valid age.';
		errors = true;	
	}
	if(($('#first_launch_height').val() == "" || isNaN($('#first_launch_height').val())) && errors == false){
		error = 'You must enter a valid height.';
		errors = true;	
	}
	
	if(($('#first_launch_gender').val() != "Male" && $('#first_launch_gender').val() != "Female") && errors == false){
		error = 'You must enter a valid gender.';
		errors = true;	
	}
	
	if(($('#first_launch_passcode').val() == "" || isNaN($('#first_launch_passcode').val())) && errors == false){
		error = 'You must enter a 4 digit passcode.';	
		errors = true;
	}
	
	if($('#first_launch_passcode').val() != $('#first_launch_retype_passcode').val() && errors == false){
		error = 'You must enter an identical password twice.';
		errors = true;	
	}
	
	if(errors == false){
		db.transaction(installDatabase, installFailed, installSuccess);
	}else{
		$('.modal-validation-text').text(error);
		$('.modal-validation-error, .dim').show();
	}
	
	return false;
});

function installDatabase(trans){
	trans.executeSql('CREATE TABLE IF NOT EXISTS `settings` (`ID` varchar(255) NOT NULL, `string` varchar(255) NULL, `integer` int(255) NULL, PRIMARY KEY (`ID`))');
	trans.executeSql('DELETE FROM `settings`');
	trans.executeSql('INSERT INTO `settings` (`id`, `string`, `integer`) VALUES ("NAME", "'+$('#first_launch_name').val()+'", NULL)');
	trans.executeSql('INSERT INTO `settings` (`id`, `string`, `integer`) VALUES ("AGE", NULL, NULL)');
	trans.executeSql('INSERT INTO `settings` (`id`, `string`, `integer`) VALUES ("HEIGHT", NULL, NULL)');
	trans.executeSql('INSERT INTO `settings` (`id`, `string`, `integer`) VALUES ("GENDER", "'+$('#first_launch_gender').val()+'", NULL)');
	trans.executeSql('INSERT INTO `settings` (`id`, `string`, `integer`) VALUES ("PASSCODE", "'+$('#first_launch_passcode').val()+'", NULL)');
}

function installFailed(err) {
   $('.modal-validation-text').text("Oh no. Something went wrong. Please restart the application.");
   $('.modal-validation-error, .dim').show();
}

function installSuccess() {
	window.localStorage.setItem("appConfigured", "true");
    window.location = "dashboard.html"
    
}


});



