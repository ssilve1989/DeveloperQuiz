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
            });
        $urlRouterProvider.otherwise('/form');
        
        $locationProvider.html5Mode(true);
    })

    //controller for the form
    .controller('formController', ['$scope', '$http', function($scope, $http){
        $scope.formData = {};
        $scope.quiz = {};
        $http.get('data/questions.json').success(function(data){
            $scope.quiz = data;
        });
        $scope.quiz.score = function(){
            return $scope.quiz.questions.correct / $scope.quiz.questions.totalQuestions;
        };
        $scope.checkAnswer = function(question, answer){
            var $radios = $('.radio');
            var $selected = $radios.find('input[type="radio"]:checked');
            if(answer === $scope.quiz.questions[question].answer){
                $selected.parents('.radio').addClass('well-green');
            }else{
                $selected.parents('.radio').addClass('well-red');
            }
        };
    }]);