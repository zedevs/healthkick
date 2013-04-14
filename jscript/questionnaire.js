/* CREATE QUESTIONNAIRE HANDLER */
$(document).ready(function(){
	var questions_loaded = false;
	var storeAnswers = new Array();
	
	if(checkConnection() == false){
		$('.modal-internet-error, .dim').show();
	}
	    
	$('.retry-internet-connection').click(function(){
		if(checkConnection() == true){
			$('.modal-internet-error, .dim').hide();
			loadQuestions();
			$('.modal-internet-error, .dim').hide(); $('.modal-downloading, .dim').show();
		}
	});
	
	/* LISTEN FOR CONNECTION DROP */
	document.addEventListener("offline", function() { 
		if(questions_loaded == false){
			$('.modal-box').hide(); $('.modal-internet-error, .dim').show();
		}		
	}, false);
	
	/* LISTEN FOR RE-CONNECTION */
	document.addEventListener("online", function() { 
	if(questions_loaded == false){
		loadQuestions();
		$('.modal-internet-error, .dim').hide(); $('.modal-downloading, .dim').show();
	}
	}, false);
	
	function loadQuestions(){
		
		$.getJSON('http://jqmes.com/healthkick/daily_questions.php', function(data) {
		questions_loaded = true;
		$('.modal-downloading, .dim').hide();
		  $.each(data, function(questionKey, questionData) {
		  	var question = '<p class="questionnaire_question">'+questionData['question']+'</p>';
		  	storeAnswers[questionKey] = questionData['correct_answer'];
		  	 $.each(questionData['answers'], function(answerKey, answerData) {
		  	 	question += '<fieldset class="questionnaire_answer">';
		  	 	question += '<label for="question_'+(questionKey+1)+'_answer_'+(answerKey+1)+'">'+(answerKey+1)+') '+answerData+'</label>';
		  	 	question += '<input type="radio" id="question_'+(questionKey+1)+'_answer_'+(answerKey+1)+'" name="question_'+(questionKey+1)+'" value="'+(answerKey+1)+'">';
		  	 	question += '</fieldset>';
		  	 	
		  	 });
		  	$('#questionnaire_container .actions').before(question);
		  });
		  $('#questionnaire_container').show();
		});
	}
	loadQuestions();
	
	$('#questionnaire_container').submit(function(e){
		e.preventDefault();
		if(storeAnswers.length > 0){
			var correct = 0;
			var wrong = 0;
			for(var i = 0; i < storeAnswers.length; i++){
				if($('input[name="question_'+(i+1)+'"]:checked').val() == storeAnswers[i]){
					correct++;
				}else{
					wrong++;
				}
			}
			var percentage = Math.round(correct/(correct+wrong) * 100);
			$('#questionnaire_percentage').text(percentage);
			$('.modal-questionnaire-results, .dim').show();
				
		}
		
		return false;
	});
});

