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
	
	/* SETTINGS */
	trans.executeSql('CREATE TABLE IF NOT EXISTS `settings` (`ID` varchar(255) NOT NULL, `string` varchar(255) NULL, `integer` int(255) NULL, PRIMARY KEY (`ID`))');
	trans.executeSql('DELETE FROM `settings`');
	trans.executeSql('INSERT INTO `settings` (`ID`, `string`, `integer`) VALUES ("NAME", "'+$('#first_launch_name').val()+'", NULL)');
	trans.executeSql('INSERT INTO `settings` (`ID`, `string`, `integer`) VALUES ("AGE", NULL, '+parseInt($('#first_launch_age').val())+')');
	trans.executeSql('INSERT INTO `settings` (`ID`, `string`, `integer`) VALUES ("HEIGHT", NULL, '+parseInt($('#first_launch_height').val())+')');
	trans.executeSql('INSERT INTO `settings` (`ID`, `string`, `integer`) VALUES ("GENDER", "'+$('#first_launch_gender').val()+'", NULL)');
	trans.executeSql('INSERT INTO `settings` (`ID`, `string`, `integer`) VALUES ("PASSCODE", "'+$('#first_launch_passcode').val()+'", NULL)');

	/* ACHIEVEMENTS */	
	trans.executeSql('CREATE TABLE IF NOT EXISTS `achievements` (`ID` int(255) NOT NULL, `name` varchar(255) NULL, `measurement` varchar(255) NULL, `target` int(255) NULL, `initial_reading` int(255) NULL, PRIMARY KEY (`ID`))');
	trans.executeSql('DELETE FROM `achievements`');
	
	trans.executeSql('INSERT INTO `achievements` (`ID`, `name`, `measurement`, `target`, `initial_reading`) VALUES (1, "Lose Weight", "KG", "100", "75")');
	trans.executeSql('INSERT INTO `achievements` (`ID`, `name`, `measurement`, `target`, `initial_reading`) VALUES (2, "Gun Size", "CM", "70", "40")');
	
	/* ACHIEVEMENTS RECORDS */
	trans.executeSql('CREATE TABLE IF NOT EXISTS `achievements_records` (`ID` varchar(255) NOT NULL, `achievement_id` int(255) NULL, `reading` int(255) NULL, PRIMARY KEY (`ID`))');
	trans.executeSql('DELETE FROM `achievements_records`');
	
}

function installFailed(err) {
	console.log(err);
   $('.modal-validation-text').text("Oh no. Something went wrong. Please restart the application.");
   $('.modal-validation-error, .dim').show();
   
}

function installSuccess() {
	window.localStorage.setItem("appConfigured", "true");
    window.location = "dashboard.html"
    
}


});



