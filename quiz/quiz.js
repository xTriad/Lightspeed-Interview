// Create a command line multiple choice quiz (any programming language), that
// when completed by the user outputs the results (with score), with corrected
// questions/answers if any were submitted with incorrect answers.

// The presented questions and answers should be randomized.

// The test should subsequently be able to be taken again to "improve" the test
// takers score, and any subsequent completed tests will have comparison results
// from the previous quizzes.

var fs = require('fs');
var prompt = require('prompt');

const QuizApp = function() {

  const QUIZ_QUESTIONS_FILE = './quiz-questions.json';
  const QUIZ_TEST_SCORES_FILE = './quiz-test-scores.json';

  const PROMPT_RULES = [
    {
      name: 'answer', 
      validator: /^[\d+]+$/,
      warning: 'Answer must be an integer such as 1, 2, 3 or 4'
    },
  ];

  // todo randomize array
  // todo generate array of quiz.length numbers, then sleect questionKey+ranNum
  const loadQuizQuestions = function() {
    let data = JSON.parse(fs.readFileSync(QUIZ_QUESTIONS_FILE, 'utf8').toString());
    let questions = [];
    for(let questionKey in data.quiz) {
      questions.push(data.quiz[questionKey]);
    }
    return questions;
  };

  const loadPreviousScores = function() {
    let data = fs.readFileSync(QUIZ_TEST_SCORES_FILE, 'utf8');
    if(data) {
      data = data.toString();
      if(typeof data === "string") {
        return JSON.parse(data);
      }
    }
    return {
      scores: []
    };
  };

  const startQuiz = function(questions) {
    console.log('\nHello! Welcome to the Quiz.');
    console.log('\nPlease answer the following questions.');

    prompt.start();
    recursiveAsyncQuestionPrompt(questions, 0);
  };

  const recursiveAsyncQuestionPrompt = function(questions, currentQuestionIndex) {
    let question = questions[currentQuestionIndex];

    console.log(`\nQuestion #${currentQuestionIndex+1}: ${question.question}`);
    for(let i = 0; i < question.options.length; i++) {
      console.log(`${i+1}: ${question.options[i]}`);
    }

    prompt.get(PROMPT_RULES, function (err, result) {
      if (err) {
        return console.log(err);
        return 1;
      }
      question.userAnswer = result.answer;
      if(++currentQuestionIndex < questions.length) {
        recursiveAsyncQuestionPrompt(questions, currentQuestionIndex);
      } else {
        printAndSaveQuizScore(questions);
      }
    });
  };

  const printAndSaveQuizScore = function(questions) {
    let score = 0;
    let questionIndex = 0;
    let wrongAnswersIndexes = [];

    questions.forEach(function(question) {
      if(question.answer == question.userAnswer) {
        score++;
      } else {
        wrongAnswersIndexes.push(questionIndex);
      }
      questionIndex++;
    });

    console.log('\n============================================');
    console.log(`\nYou scored ${score} out of ${questions.length}`);

    if(wrongAnswersIndexes.length > 0) {
      console.log('\nIncorrect Answers:');
      wrongAnswersIndexes.forEach(function(index) {
        console.log(`\nQuestion: ${questions[index].question}`);
        console.log(`Correct Answer: ${questions[index].options[questions[index].answer-1]}`);
        console.log(`User Answer: ${questions[index].options[questions[index].userAnswer-1]}`);
      });
    }

    let previousScores = loadPreviousScores();
    if(previousScores.scores.length > 0) {
      console.log('\n===== Previous Quiz Scores Comparison ======');
      for(let i = previousScores.scores.length-1; i >= 0; i--) {
        let score = previousScores.scores[i];
        console.log(`Scored ${score.numCorrect}/${score.total} on ${score.date}`);
      }
    }

    console.log('\nSaving quiz scores...');
    saveQuizScores(previousScores, questions, wrongAnswersIndexes);
    console.log('Your scores have been successfully saved.');
  };

  const saveQuizScores = function(previousScores, questions, wrongAnswersIndexes) {
    let currentScore = {
      numCorrect: questions.length - wrongAnswersIndexes.length,
      total: questions.length,
      date: new Date(Date.now()).toLocaleString()
    };

    previousScores.scores.push(currentScore);

    fs.writeFileSync(QUIZ_TEST_SCORES_FILE, JSON.stringify(previousScores), 'utf8');
  };

  return {
    init: function() {
      startQuiz(loadQuizQuestions());
    }
  };

}

QuizApp().init();
