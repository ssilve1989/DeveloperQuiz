/**
 * Created by steve on 7/18/15.
 */
//Create module and inject animate and ui-router
angular.module('formApp', ['ngAnimate', 'ui.router'])
//Configure routes
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            //route to show basic form
            .state('form', {
                url: '/form',
                templateUrl: 'form.html',
                controller: 'formController'
            })
            //nested states
            //each of these will have their own view
            //url will be nested (/form/part-one)
            .state('form.part-one', {
                url: '/part-one',
                templateUrl: 'form-part-one.html'
            })
            .state('form.part-two', {
                url : '/part-two',
                templateUrl : 'form-part-two.html'
            })
            .state('form.part-three', {
                url : '/part-three',
                templateUrl : 'form-part-three.html'
            })
            .state('form.part-four', {
                url : '/part-four',
                templateUrl : 'form-part-four.html'
            })
            .state('form.part-five', {
                url : '/part-five',
                templateUrl : 'form-part-five.html'
            })
	        .state('form.end', {
		        url : '/end',
		        templateUrl : 'form-end.html'
	        });
        $urlRouterProvider.otherwise('/form');
        
        $locationProvider.html5Mode(true).hashPrefix('!');
    })

    //controller for the form
    .controller('formController', ['$scope', '$http', function($scope, $http){
        $scope.quiz = {};
        $http.get('data/questions.json').success(function(data){
            $scope.quiz = data;
            $scope.quiz.score = function(){
                return Math.round(($scope.quiz.correct / $scope.quiz.totalQuestions) * 100);
            };
            $scope.checkAnswer = function($event, question, answer){
	            var q = $scope.quiz.questions[question];
	            if(q.answered) return;
                var $radios = $($event.currentTarget).parent().siblings('.radio');
                var $selected = $radios.find('input[type="radio"]:checked');
                if(answer === q.answer){
                    $selected.parents('.radio').addClass('well-green');
                    $scope.quiz.correct++;
                }else{
                    $selected.parents('.radio').addClass('well-red');
                }
	            q.answered = true;
            };
            $scope.reset = function(){
                $scope.quiz.correct = 0;
                window.location.href = '/';
            }
        });
    }]);