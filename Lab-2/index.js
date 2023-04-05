function Question(text, options, answer) {
    this.text = text;
    this.options = options;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (answer) {
    return this.answer === answer;
}

let questions = [
    new Question('Javascript Supports', ['Functions', 'XML', 'CSS', 'HTML'], 'Functions'),
    new Question('Language used for styling web pages', ['HTML', 'Jquery', 'CSS', 'XML'], 'CSS'),
    new Question('Which is not a Javascript Framework', ['Python Script', 'Jquery', 'Django', 'NodeJS'], 'Django'),
    new Question('Which application is used to connect to DB?', ['PHP', 'HTML', 'JS', 'ALL'], 'PHP'),
    new Question('Javascript is a', ['Language', 'Editor', 'Software', 'Program'], 'Language')
]

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.checkOptionWithAnswer = function (answer) {
    if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}

var quiz = new Quiz(questions);

function loadQuestions() {

    if (quiz.isEnded()) {
        showScore();
    } else {
        var element = document.getElementById('question');
        element.innerHTML = quiz.getQuestionByIndex().text;

        var options = quiz.getQuestionByIndex().options;
        for (var i = 0; i < options.length; i++) {
            var optionElement = document.getElementById('choice' + i);
            optionElement.innerHTML = options[i];

            handleOptionButton('btn' + i, options[i]);
        }

        showProgress();
    }
}

function handleOptionButton(id, choice) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.checkOptionWithAnswer(choice);
        loadQuestions();
    }
}

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById('progress');
    element.innerHTML = 'Question ' + currentQuestionNumber + ' of ' + quiz.questions.length;
}

function showScore() {
    var quizOverHtml = '<h1> Result </h1>';
    quizOverHtml += '<h2 id="score"> Your Score is ' + quiz.score + ' and Percentage is ' + (quiz.score / quiz.questions.length * 100) + '% </h2>';
    var element = document.getElementById('quiz');
    element.innerHTML = quizOverHtml;
}

loadQuestions();
