$(document).ready(function(){
	db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM `achievements` ORDER BY `ID` DESC', [], function(tx, results) {
			for(var i = 0; i < results.rows.length; i++){
				var percentage = 0;
				var last_submission;
				queryAchievementRecords('SELECT * FROM `achievements_records` WHERE `achievement_id` = '+results.rows.item(i).ID+' ORDER BY `ID` DESC LIMIT 1', results.rows.item(i), function(records, row){
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
});