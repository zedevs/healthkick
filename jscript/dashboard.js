$(document).ready(function(){
	db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM `achievements` ORDER BY `ID` DESC', [], function(tx, results) {
			for(var i = 0; i < results.rows.length; i++){
				var achievment  = '<p class="percentage_label">'+results.rows.item(i).name+'</p>'
								+ '<div class="percentage_bar">'
								+ '<div style="width:25%">25%</div>'
								+ '</div>'
				$('.dashboard_stats').prepend(achievment);
			}
		});
	});	
});