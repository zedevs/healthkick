$(document).ready(function(){
	
	$('#create_achievement_form').submit(function(e){
		e.preventDefault();
		var errors = false;
		var error = '';
		
		if($('#create_achievement_name').val() == "" && errors == false){
			error = 'You must a name for your achievement.';
			errors = true;	
		}
		
		if(($("#create_achievement_measurement option[value='"+$('#create_achievement_measurement').val()+"']").length == 0) && errors == false){
			error = 'You must enter a valid measurement.';
			errors = true;	
		}
		
		if(($('#create_achievement_target').val() == "" || isNaN($('#create_achievement_target').val()) || $('#create_achievement_target').val() < 1) && errors == false){
			error = 'You must enter a target which is greater than 0.';
			errors = true;	
		}
		if(($('#create_achievement_current_reading').val() == "" || isNaN($('#create_achievement_current_reading').val()) || $('#create_achievement_current_reading').val() < 1) && errors == false){
			error = 'You must enter a valid current reading which is greater than 0.';
			errors = true;	
		}
		
		
				
		if(errors == false){
			db.transaction(updateDatabase, updateFailed, function(){
				$('.modal-validation-heading').text("All Done.");
				$('.modal-validation-text').text("We've added your achievement, good luck!");
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
		trans.executeSql('INSERT INTO `achievements` (`ID`, `name`, `measurement`, `target`, `initial_reading`) VALUES (NULL, "'+escape($('#create_achievement_name').val())+'", "'+escape($('#create_achievement_measurement').val())+'", '+$('#create_achievement_target').val()+', '+$('#create_achievement_current_reading').val()+')');
	}
	
	function updateFailed(err) {
		$('.modal-validation-heading').text('Oops!');
		$('.modal-validation-text').text("Oh no. Something went wrong. Please restart the application.");
		$('.modal-validation-error, .dim').show();
	}
	
});