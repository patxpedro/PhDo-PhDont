var myQuestions = [
	{
		question: "Do you want to do a PhD?",
		answers: {
			a: 'Yes',
			b: 'No',
			c: 'I don\'t know / I already have one'
		},
		//correctAnswer: ''
	},
	{
		question: "How do you feel about research?",
		answers: {
			a: 'It\'s so exciting!',
			b: 'Labs are not for me',
			c: 'Been there, done that!'
		},
	//	correctAnswer: 'c'
	},
	{
		question: "Are you willing to sacriffice parts of your life?",
		answers: {
			a: 'YES!',
			b: 'Not really. I want to keep my social life!',
			c: 'I am done with that...'
		},
		//correctAnswer: 'c'
	}];

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
	var numAanswers = 0;
	var numBanswers = 0;
	var numCanswers = 0;

	// for each question...
	// for(var i=0; i<questions.length; i++){
	var i = 0;
	while(i < 3){

		// find selected answer
    //|| operator, which means "or" to basically say "Give us the selected answer OR if there's not one, then just give us an empty object."
    //cont. That way, trying to get the .value will give us undefined instead of causing an error.
		userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;

		// if answer is correct
    //triple equals --> testing for strict equality. This means both the type and the value we are comparing have to be the same.
		if(userAnswer==='a'){
			// add to the number of correct answers
			numAanswers++;

			// color the answers green
			answerContainers[i].style.color = 'limegreen';
		}
		// if answer is wrong or blank
		else if(userAnswer==='b'){
			numBanswers++;
			// color the answers red
			answerContainers[i].style.color = 'GoldenRod';
		}
		else if(userAnswer==='c'){
			numCanswers++;
				// color the answers red
				answerContainers[i].style.color = 'Royalblue';
		}
			// if answer is wrong or blank
		else {
			answerContainers[i].style.color = 'red';
		}

		i=i+1;
	}

	if (numAanswers > numBanswers && numAanswers > numCanswers) {
		resultsContainer.innerHTML = "More A answers";
	} else if (numBanswers > numAanswers && numBanswers > numCanswers) {
		resultsContainer.innerHTML = "More B answers";
	} else if (numCanswers > numAanswers && numCanswers > numBanswers) {
		resultsContainer.innerHTML = "More C answers";
	} else if (numAanswers == numBanswers && numBanswers === numCanswers) {
		resultsContainer.innerHTML = "We can't help you!";
	} else if (numAanswers === numBanswers) {
		resultsContainer.innerHTML = "Same a and b, less c";
	} else if (numBanswers === numCanswers) {
		resultsContainer.innerHTML = "Same b and c, less a";
	} else if (numAanswers === numCanswers) {
		resultsContainer.innerHTML = "Same a and c, less b";
	}

	// show number of correct answers out of total
//	resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
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
