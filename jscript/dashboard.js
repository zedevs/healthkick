$(document).ready(function(){
	var timeAgo = 0;
	function generateAchievementsView(tAgo){
	$('.dashboard_stats').html('');
	db.transaction(function(tx) {
		// Store it in a global variable so it can be passed down.
		if(tAgo > 0){
			timeAgo = tAgo;
		}else{
			timeAgo = 0;
		}
		tx.executeSql('SELECT * FROM `achievements` ORDER BY `ID` DESC', [], function(tx, results) {
			for(var i = 0; i < results.rows.length; i++){
				var percentage = 0;
				var last_submission;
				if(timeAgo > 0){
					var date = new Date().getTime();
					var recordsSQL = 'SELECT * FROM `achievements_records` WHERE `achievement_id` = '+results.rows.item(i).ID+' AND `time` > '+(date-timeAgo)+' ORDER BY `ID` DESC LIMIT 1';
				}else{
					var recordsSQL = 'SELECT * FROM `achievements_records` WHERE `achievement_id` = '+results.rows.item(i).ID+' ORDER BY `ID` DESC LIMIT 1';
				}
				
				queryAchievementRecords(recordsSQL, results.rows.item(i), function(records, row){
				if(records.rows.length == 0){
					last_submission = row.initial_reading;
				}else{					
					last_submission = records.rows.item(0).reading;
				}
				percentage = ((last_submission-row.initial_reading)/(row.target-row.initial_reading)*100).toFixed(2);
				
				var extraClass = '';
				if(percentage >= 100) { percentage = 100; extraClass = 'class="complete"'; }else 
				if(percentage < 0) { percentage = 0; }
				var achievment  = '<p class="percentage_label">'+row.name+'</p>'
								+ '<div class="percentage_bar">'
								+ '<div '+extraClass+' style="width:'+percentage+'%">'+percentage+'%</div>'
								+ '</div>'
				$('.dashboard_stats').prepend(achievment);
				});
			}
			
			if(results.rows.length == 0 && $('.no_achievements_warning').size() == 0){
				$('.timescale_selector').after('<div class="no_achievements_warning"><p>You haven\'t created any achievements yet! Don\'t worry though, it\'s pretty simple!</p><a class="button" href="create_achievement.html">Create your first achievement!</a></div>');
			}
		});
	});
	}
	generateAchievementsView(0);
	
	$('.timescale_selector li a').click(function(e){
		e.preventDefault();
		$('.timescale_selector li').removeClass('selected');
		$(this).parent('li').addClass('selected');
		
		var option = $(this).attr('href');
		
		if(option == '#all_time'){
			generateAchievementsView(0);
		}else if(option == '#this_week'){
			generateAchievementsView(604800);			
		}else if(option == '#this_month'){
			generateAchievementsView(2592000);
		}
		
	});
	
	$('#bmi_form').submit(function (e) {
		e.preventDefault();
		
		if(isNaN($('#bmi_weight').val()) || $('#bmi_weight').val() == ""){
			$('.bmi-result-text').text('You must enter a valid weight.');
			$('.modal-bmi-result, .dim').show();
		}else{
		
		
		
			db.transaction(function(tx) {
				tx.executeSql('SELECT * FROM `settings` WHERE `ID` = "HEIGHT"', [], function(tx, results) {
					var height = results.rows.item(0).integer;
					var bmi = ($('#bmi_weight').val() / ((height/100)*(height/100))).toFixed(2);
					
					var bmiStatus = '';
					if(bmi < 18.5){
						bmiStatus = 'underweight';
					}else if(bmi >= 18.5 && bmi <= 24.9){
						bmiStatus = 'a healthy weight';
					}else if(bmi >= 25 && bmi <= 29.9){
						bmiStatus = 'overweight';
					}else if(bmi >= 30){
						bmiStatus = 'obese';
					}
					
					$('.bmi-result-text').text("Your BMI is " + bmi + ". Therefore according to be BMI you are " + bmiStatus + ".");
					$('.modal-bmi-result, .dim').show();
	 			});
			});
		
		}
	});	
		
});