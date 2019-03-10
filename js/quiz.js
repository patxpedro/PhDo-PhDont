var myQuestions = [
	{
		question: "What is 10/2?",
		answers: {
			a: '3',
			b: '5',
			c: '115'
		},
		correctAnswer: 'b'
	},
	{
		question: "What is 30/3?",
		answers: {
			a: '3',
			b: '5',
			c: '10'
		},
		correctAnswer: 'c'
	}
];

//next line not needed
//function generateQuiz(questions, quizContainer, resultsContainer, submitButton){
// }

function showQuestions(questions, quizContainer){

  // we'll need a place to store the output and the answer choices
  	var output = [];
  	var answers;

  	// for each question...
    //i++ is the same as i=i+1
  	for(var i=0; i<questions.length; i++){

  		// first reset the list of answers
  		answers = [];

  		// for each available answer to this question...
  		for(letter in questions[i].answers){

  			// ...add an html radio button
        //The push() method adds new items to the end of an array, and returns the new length.
        //The <label> tag defines a label for a <button>, <input>, <meter>, <output>, <progress>, <select>, or <textarea> element.
        // radio means it only allows one answer per question, round buttons to click
  			answers.push(
  				'<label>'
  					+ '<input type="radio" name="question'+i+'" value="'+letter+'">'
  					+ letter + ': '
  					+ questions[i].answers[letter]
  				+ '</label>'
    			);
    		}

    		// add this question and its answers to the output
    		output.push(
    			'<div class="question">' + questions[i].question + '</div>'
    			+ '<div class="answers">' + answers.join('') + '</div>'
    		);
    	}

    	// finally combine our output list into one string of html and put it on the page
    	quizContainer.innerHTML = output.join('');
    }



function showResults(questions, quizContainer, resultsContainer){

    // gather answer containers from our quiz
	var answerContainers = quizContainer.querySelectorAll('.answers');

	// keep track of user's answers
	var userAnswer = '';
	var numCorrect = 0;

	// for each question...
	for(var i=0; i<questions.length; i++){

		// find selected answer
    //|| operator, which means "or" to basically say "Give us the selected answer OR if there's not one, then just give us an empty object."
    //cont. That way, trying to get the .value will give us undefined instead of causing an error.
		userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;

		// if answer is correct
    //triple equals --> testing for strict equality. This means both the type and the value we are comparing have to be the same.
		if(userAnswer===questions[i].correctAnswer){
			// add to the number of correct answers
			numCorrect++;

			// color the answers green
			answerContainers[i].style.color = 'lightgreen';
		}
		// if answer is wrong or blank
		else{
			// color the answers red
			answerContainers[i].style.color = 'red';
		}
	}

	// show number of correct answers out of total
	resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
}


  var quizContainer = document.getElementById('quiz');
  var resultsContainer = document.getElementById('results');
  var submitButton = document.getElementById('submit');

  //next line not needed
  //generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

	// show the questions
	showQuestions(myQuestions, quizContainer);

	// when user clicks submit, show results
	submitButton.onclick = function(){
		showResults(myQuestions, quizContainer, resultsContainer);
	}
