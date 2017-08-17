
$(document).ready(function(){

    var questionNumberArray = ["question1","question2","question3"];

    var gameCorrect = 0;
    var gameIncorrect = 0;
    var gameUnanswered = 0;
    var currentQuestion = 0;

    var timeKeeper = {
        timer: 30,
        intervalId: "",

        runTimer: function() {
            timeKeeper.intervalId = setInterval(timeKeeper.decrement, 1000);
        },

        decrement: function(){
            timeKeeper.timer--;
            $("#timer").html("Time remaining: " + timeKeeper.timer);
                    
            if (timeKeeper.timer === 0){
                gameUnanswered++;
                currentQuestion++;
                timeKeeper.stopTimer();
                timeKeeper.timer=30;
                $("#timer").html("Time remaining: " + timeKeeper.timer);
                playTrivia();
            }
        },

        stopTimer: function() {
            clearInterval(timeKeeper.intervalId);
        },
    }

    var question1 ={
        q:"What is my favorite color?",
        a:"Black",
        b:"Purple",
        c:"Blue",
        d:"Green",
        correct:"d",
        answer:"Green",
    }

    var question2 ={
        q:"What is my astrological sign?",
        a:"Pisces",
        b:"Aries",
        c:"Leo",
        d:"Stop",
        correct:"b",
        answer:"Aries",
    }

    var question3 ={
        q:"What was the name of my parrot?",
        a:"Mortimer",
        b:"Regal",
        c:"Pudget",
        d:"Edgar",
        correct:"c",
        answer:"Pudget",
    }

    function resetGame(){
        gameCorrect = 0;
        gameIncorrect = 0;
        gameUnanswered = 0;
        currentQuestion = 0;
        timeKeeper.stopTimer();
        timeKeeper.timer = 30;
        $("#timer").html("Time remaining: " + timeKeeper.timer);
        $("#timer-div").attr("style","display:none");
        $("#question-div").attr("style","display:none");
        $("#question-complete-div").attr("style","display:none");
        $("#start-div").attr("style","display:unset");
        $("#game-complete-div").attr("style","display:none");
    }

    function populateQuestion(quesNum){
        $("#question").html(eval(quesNum).q);
        $("#answer-1").html(eval(quesNum).a);
        $("#answer-2").html(eval(quesNum).b);
        $("#answer-3").html(eval(quesNum).c);
        $("#answer-4").html(eval(quesNum).d);
        $("#correctAnswer").html(eval(quesNum).answer);
    }

    function finalStats(){
        $("#question-div").attr("style","display:none");
        $("#question-complete-div").attr("style","display:none");
        $("#timer-div").attr("style","display:none");
        $("#game-complete-div").attr("style","display:unset");
        $("#total-correct").html("Total Correct: " + gameCorrect);
        $("#total-incorrect").html("Total Incorrect: " + gameIncorrect);
        $("#total-unanswered").html("Total Unanswered: " + gameUnanswered);
    }

    function questionBegin(questionNumber){
        $("#timer-div").attr("style","display:unset");
        $("#question-div").attr("style","diplay:unset");
        populateQuestion(questionNumber);
    }

    function questionEval(guessedLetter){
        var correctLetter = eval(questionNumberArray[currentQuestion]).correct;
        
        if(guessedLetter === correctLetter){
            gameCorrect++;
            $("#status").html("Good job! That's right!");
            questionEnd();
            return;
        }
        else{
            gameIncorrect++;
            $("#status").html("Nope! You are wrong.");
            questionEnd();
            return;
        }
    }

    function questionEnd(){
        timeKeeper.stopTimer();
        timeKeeper.timer =30;
        currentQuestion++;
        $("#timer").html("Time remaining: " + timeKeeper.timer);
        $("#question-div").attr("style","display:none");
        $("#question-complete-div").attr("style","display:unset");
        $("#timer-div").attr("style","display:none");
        setTimeout(playTrivia,3000);
    }

    function playTrivia(){
        if(currentQuestion < 3){
            nextQuestion();
        }
        else{
            finalStats();
        }
    }

    function nextQuestion(){
        timeKeeper.stopTimer();
        timeKeeper.timer=30;
        $("#question-complete-div").attr("style","display:none");
        timeKeeper.runTimer();
        questionBegin(questionNumberArray[currentQuestion]);
    }

    $(".answer").on("click", function(){
        timeKeeper.stopTimer();
        timeKeeper.timer = 30;
        var guessedLetter = $(this).attr("value");
        questionEval(guessedLetter);
    });

    $("#start-button").on("click", function(){
        $("#start-div").attr("style","display:none");
        playTrivia();
    });

    $("#restart-button").on("click", function(){
        resetGame();
    });

});

