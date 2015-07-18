/**
 * Created by steve on 7/18/15.
 */
var quiz = {
    questions : {
        totalQuestions : 4,
        q1 : {
            answer : 1
        },
        q2 : {
            answer : 3
        },
        q3 : {
            answer : 1
        }
    },
    correct : 0,
    score : function(){
        return this.correct / this.questions;
    },
    checkAnswer : function(question, indexOfAnswer){
        return indexOfAnswer === this.questions[question].answer;
    },
    showAnswer : function(question){
        return this.questions[question].answer;
    }
};

$(function(){
    var $body = $('body');
    //TODO refactor this piece of shit

    $body.on('click', '#q1', function(){
        var $radio = $("#q1-form").find("input[type='radio']:checked");
        var $container = $radio.parents('.radio');
        if(quiz.checkAnswer('q1', $container.index())){
            $radio.parents('.radio').addClass('well-green');
        }else {
            $radio.parents('.radio').addClass('well-red');
        }
    });
    $body.on('click', '#q2', function(){
        var $radio = $("#q2-form").find("input[type='radio']:checked");
        var $container = $radio.parents('.radio');
        if(quiz.checkAnswer('q2', $container.index())){
            $container.addClass('well-green');
        }else{
            $container.addClass('well-red');
        }
    });
    $body.on('click', '#q3', function(){
        var $radio = $("#q3-form").find('input[type="radio"]:checked');
        var $container = $radio.parents('.radio');
        if(quiz.checkAnswer('q3', $container.index())){
            $container.addClass('well-green');
        }else{
            $container.addClass('well-red');
        }
    });

    $body.on('click', '#check-score', function(){
        alert((quiz.score() * 100) + '%');
    });
});
