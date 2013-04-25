$(document).ready(function(){
	
	$('#update_achievement_form').submit(function(e){
		e.preventDefault();
		var errors = false;
		var error = '';
		
		if(($('#update_achievement_reading').val() == "" || isNaN($('#update_achievement_reading').val())) && errors == false){
			error = 'You must enter a valid reading.';
			errors = true;	
		}
				
		if(errors == false){
			db.transaction(updateDatabase, updateFailed, function(){
				$('.modal-validation-ok, .dim').show();
			});
			
		}else{
			$('.modal-validation-heading').text('Oops!');
			$('.modal-validation-text').text(error);
			$('.modal-validation-error, .dim').show();
		}
		
		return false;
	});
	
	function updateDatabase(trans){
		var date = new Date().getTime();
		trans.executeSql('INSERT INTO `achievements_records` (`ID`, `achievement_id`, `reading`, `time`) VALUES (NULL, '+window.localStorage.getItem("achievment_id")+', '+$('#update_achievement_reading').val()+', '+(date)+')');
	}
	
	function updateFailed(err) {
		$('.modal-validation-heading').text('Oops!');
		$('.modal-validation-text').text("Oh no. Something went wrong. Please restart the application.");
		$('.modal-validation-error, .dim').show();
	}
	
});