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
    var request = $.ajax({url: 'http://localhost:3000/quizzes/1/questions/next.json', method: 'get', data: {session_key: 'kenisawesomesauce'}
    });
    renderChoices(request);
  }

  function renderChoices(request) {
    request.done(function(response){
      $('#current_quiz').remove();
      $('h1').text(response.question.question);
      var arrayOfChoices = response.question.choices;

      for(var i = 0; i <arrayOfChoices.length; i++) {
        $('#choices').append('<div class="answer", id='+i+'>' + arrayOfChoices[i].choice + '<br> </div>');
      }
    })
  }


  // function nextQuestion(e){
  //   var request = $.ajax({url:'http://localhost:3000/quizzes/1/answers.json', method:'post', data: {session_key: 'kenisawesomesauce'}
  //   });
  //   renderChoices(e);

  // }
});
