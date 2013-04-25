$(document).ready(function(){
	var url = window.location.toString();
	if(getURLParm(url, 'achievement') == 'added'){
		$('.modal-validation-ok, .dim').show();
	}
		
	$(".achievement_list").on("click", "a", function(e){
			e.preventDefault();
			var achievment_id = parseInt($(this).attr('id').replace('achievment_', ''));
			window.location = "update_achievement.html";
			window.localStorage.setItem("achievment_id", achievment_id);
	});
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
				var extraClass = '';
				if(percentage >= 100) { percentage = 100; extraClass = 'class="complete"'; }else 
				if(percentage < 0) { percentage = 0; }
				var achievement  = '<li>'
								+ '<a href="#" id="achievment_'+row.ID+'">'
								+ '<h3>'+row.name+' <span>Add submission &raquo;</span></h3>'
								+ '<p class="info">'
								+ '<span class="target"><strong>target:</strong> '+row.target+row.measurement+'</span> <span class="submission"><strong>last submission:</strong> '+last_submission+row.measurement+'</span>'
								+ '</p>'
								+ '<div class="percentage_bar">'
								+ '<div '+extraClass+' style="width:'+percentage+'%">'+percentage+'%</div>'
								+ '</div>'
								+ '</a>'
								+ '</li>'
				$('.achievement_list').prepend(achievement);
				});
			}
			
		});
	});	
});