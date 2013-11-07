$(document).ready(function(){
  var request = $.ajax({url:'http://localhost:3000/quizzes.json', method: 'get'});
  request.done(function(response){
    $('#quiz_name').text(response.quizzes[0].name)
    attachListenerToQuizName()
  });

  function attachListenerToQuizName() {
    $('#quiz_name').on('click', grabQuestions)
  }

  function grabQuestions(e) {
    var request = $.ajax({url: 'http://localhost:3000/quizzes/1/questions/next.json', method: 'get', data: {session_key: 'whatthefuck'}
    });
    renderChoices(request);
  }

  function renderChoices(request) {
    request.done(function(response){
      debugger;
      $('#current_quiz').remove();
      $('h1').text(response.question.question);
      var arrayOfChoices = response.question.choices;

      for(var i = 1; i <arrayOfChoices.length + 1; i++) {

        $('#choices').append('<a href="#" class="answer" id='+i+'>' + arrayOfChoices[i - 1].choice + '<br></a>');
      }
      attachListenersToChoices()
    })
  }

  function attachListenersToChoices() {
    $('.answer').on('click', sendAnswer)
  }

  function sendAnswer(pickedAnswer) {
    var chosenAnswer = $.ajax({url: 'questions/1/answers.json', method: 'post', data: {session_key:'whatthefuck', choice_id: this.id}
    });
    chosenAnswer.done(function(response){
      nextQuestion();
    })
  };

  function nextQuestion(){
    var request = $.ajax({url: 'http://localhost:3000/quizzes/1/questions/next.json', method: 'get', data: {session_key: 'whatthefuck'}
    });
    request.done(function(response) {
    })
  }
});