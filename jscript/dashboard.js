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
					var recordsSQL = 'SELECT * FROM `achievements_records` WHERE `achievement_id` = '+results.rows.item(i).ID+' AND `time` > '+parseInt(Date.now()-timeAgo)+' ORDER BY `ID` DESC LIMIT 1';
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
				var achievment  = '<p class="percentage_label">'+row.name+'</p>'
								+ '<div class="percentage_bar">'
								+ '<div style="width:'+percentage+'%">'+percentage+'%</div>'
								+ '</div>'
				$('.dashboard_stats').prepend(achievment);
				});
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
});