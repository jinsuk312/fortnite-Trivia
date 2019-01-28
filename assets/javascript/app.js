
var panel = $("#quiz-area");
var countStartNumber = 30;

// Question set
var questions = [{
  question: "When did cross-play become available?",
  answers: ["Sept 28, 2018", "Dec 17, 2018", "Jan 1, 2019", "Fortnite always had crossplay"],
  correctAnswer: "Sept 28, 2018",
  image: "assets/images/toystory.gif"
}, {
  question: "Which named location is in the middle?",
  answers: ["Dusty Divot", "Tomato Town", "Tilted Towers", "Snobby Shores"],
  correctAnswer: "Dusty Divot",
  image: "assets/images/spicegirls.gif"
}, {
  question: "Which area is covered in ice?",
  answers: ["Junked Junction", "Risky Reels", "Snobby Shores", "Fatal Fields"],
  correctAnswer: "Snobby Shores",
  image: "assets/images/bulls.gif"
}, {
  question: "Which color is common weapons/items'?",
  answers: ["Gray", "Green", "Purple", "Blue"],
  correctAnswer: "Gray",
  image: "assets/images/nirvanabark.gif"
}, {
  question: "Which color is Mythic weapons/items?",
  answers: ["Purple", "Orange", "Gold", "Blue"],
  correctAnswer: "Gold",
  image: "assets/images/lionking.gif"
}, {
  question: "Can you swim in Fortnite?",
  answers: ["Yes", "No", "Maybe", "Sometimes"],
  correctAnswer: "Yes",
  image: "assets/images/fresh.gif"
}, {
  question: "Which Youtuber makes the most money playing Fortnite?",
  answers: ["KEEMSTAR", "Ali-A", "PewDiePie", "Ninja"],
  correctAnswer: "Ninja",
  image: "assets/images/skeeter.gif"
}, {
  question: "How many times can you die before you lose?",
  answers: ["1", "0", "Until the time runs out", "Depends on the game mode"],
  correctAnswer: "Depends on the game mode",
  image: "assets/images/belding.gif"
}];

// Variable to hold our setInterval
var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    this.counter--;
    $("#counter-number").html(this.counter);
    if (this.counter === 0) {
      console.log("TIME UP");
      this.timeUp();
    }
  },

  loadQuestion: function() {

    timer = setInterval(this.countdown.bind(this), 1000);

    panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    this.counter = window.countStartNumber;
    $("#counter-number").html(this.counter);
    this.currentQuestion++;
    this.loadQuestion.bind(this)();
  },

  timeUp: function() {

    clearInterval(window.timer);

    $("#counter-number").html(this.counter);

    panel.html("<h2>Out of Time!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results, 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion, 3 * 1000);
    }
  },

  results: function() {

    clearInterval(window.timer);

    panel.html("<h2>All done, heres how you did!</h2>");

    $("#counter-number").html(this.counter);

    panel.append("<h3>Correct Answers: " + this.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
    panel.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(window.timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    this.incorrect++;

    clearInterval(window.timer);

    panel.html("<h2>Nope!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer + "</h3>");
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(window.timer);

    this.correct++;

    panel.html("<h2>Correct!</h2>");
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS
$(document).on("click", "#start-over", game.reset.bind(game));

$(document).on("click", ".answer-button", function(e) {
  game.clicked.bind(game, e)();
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion.bind(game)();
});
