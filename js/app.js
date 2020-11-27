const STORE = {
  //store an array of questions to be rendered to the DOM
  questions: [
    {
      title: "Is Dubai a",
      answers: ["city", "country", "continent", "none of the above"],
      correct: 0,
    },
    {
      title: "Is Hawaii a",
      answers: ["city", "country", "continent", "none of the above"],
      correct: 3,
    },
    {
      title: "Is Antarctica a",
      answers: ["city", "country", "continent", "none of the above"],
      correct: 2,
    },
    {
      title: "Is Fiji a",
      answers: ["city", "country", "continent", "none of the above"],
      correct: 1,
    },
    {
      title: "Is Seychelles a",
      answers: ["city", "country", "continent", "none of the above"],
      correct: 1,
    },
  ],

  score: 0,
  currentQuestion: 0,
  started: false,
  hasFeedback: false,
};

function render() {
  //rendering the html
  $("#start").hide();
  $("#quiz").hide();
  $("#feedback").hide();
  $("#results").hide();

  if (!STORE.started) {
    $("#start").show();
  } else if (STORE.hasFeedback) {
    renderFeedback();
  } else if (STORE.currentQuestion < STORE.questions.length) {
    renderQuestion();
  } else {
    renderResults();
  }
}

function renderQuestion() {
  //this function will be responsible for rendering the questions in the DOM
  $("#quiz").show();
  const question = STORE.questions[STORE.currentQuestion];
  const totalNumberOfQuestions = STORE.questions.length;
  $("#progress").text(
    `Question ${STORE.currentQuestion + 1} / ${totalNumberOfQuestions}`
  );
  $("#quiz h2#question").text(question.title);
  $("#choices").html("");
  question.answers.forEach((answer, i) => {
    //i is the index. loop through each answer and the index i
    $("#choices").append(`
    <div>
      <input 
      type ="radio" name ="choice" value="${answer}"  id="${i}" required />
        <label for="${i}"> ${answer} </label>
    </div>
    `);
  });
}

function renderFeedback() {
  //lets user know their progress while doing the quiz
  $("#feedback").show();
  $("#feedback h1").text(STORE.hasFeedback);
  $(".user-answer").text("");

  if (STORE.currentQuestion + 1 === STORE.questions.length) {
    $("#next").text("Finish Quiz");
  }
  const question = STORE.questions[STORE.currentQuestion];
  if (STORE.hasFeedback === "incorrect") {
    $(".user-answer").text(`You answered ${STORE.guess}`);
  }
  $(".correct-answer").text(
    `The correct answer is ${question.answers[question.correct]}`
  );

  $("#score").text(`Score is ${STORE.score} / ${STORE.questions.length}`);
}

function renderResults() {
  //shows the user their total score after finishing the quiz
  $("#results").show();
  $("#results p").text(`You scored ${STORE.score}/${STORE.questions.length}`);
}

function startQuiz() {
  //starts the quiz when user clicks the start button
  $("#start-quiz").click((e) => {
    e.preventDefault();
    $("header#start").hide();
    STORE.started = true;
    render();
  });
}
function submitChoice() {
  //submit user's answer when the user clicks the submit button
  $("#quiz form").submit((e) => {
    e.preventDefault();
    const userAnswer = $("input[type='radio']:checked").val();
    const question = STORE.questions[STORE.currentQuestion];
    const correctAnswerIndex = question.correct;
    const correctAnswer = question.answers[correctAnswerIndex];

    if (userAnswer === correctAnswer) {
      STORE.score++;
      STORE.hasFeedback = "correct";
      showFeedback(userAnswer, correctAnswer, true);
    } else {
      STORE.hasFeedback = "incorrect";
      showFeedback(userAnswer, correctAnswer, false);
    }
    render();
  });
}

function showFeedback(userChoice, correctAnswer, isCorrect) {
  // Show feedback to the user on how they are doing on the quiz...
  const numberOfQuestions = STORE.questions.length;

  if (numberOfQuestions === STORE.currentQuestion) {
    alert("Test completed");
  }

  if (isCorrect) {
    $("#message").text("Correct");
  } else {
    $("#message").text(`Wrong! The correct answer is ${correctAnswer}`);
    // give user feedback based on how she answered. insert this text in the DOM
  }
}

function nextQuestion() {
  //this function lets the user go to the next question when user clicks next Question button
  $("#next").click((e) => {
    STORE.hasFeedback = false;
    STORE.currentQuestion = STORE.currentQuestion + 1;
    // check if the current question is the last question
    render();
  });
}

function summary() {
  //this function will be responsible for displaying the total score once the user has finished the quiz
  nextQuestion().hide();
  $("#results").show();
  $("#results p").text(
    `You scored ${STORE.score} out of ${STORE.questions.length}`
  );
}

function restartQuiz() {
  //this function will be responsible for restarting the quiz once the user has finished the quiz
  STORE.hasFeedback = false;
  $("#restart").click((e) => {
    e.preventDefault();
    STORE.score = 0;
    STORE.currentQuestion = 0;
    STORE.started = false;
    render();
  });
}

function main() {
  startQuiz();
  render();
  submitChoice();
  nextQuestion();
  restartQuiz();
  // when the page loads, call `main`
}
$(main);
