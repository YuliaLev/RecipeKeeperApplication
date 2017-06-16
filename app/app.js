'use strict';


var app = angular.module('myApp', [
    'ngRoute'
]);


app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/main',{
            templateUrl: "Views/main.html",
            controller: "mainController"
        })
        .when('/add_recipe',{
            templateUrl: "Views/add_recipe.html",
            controller: "addRecipeController"
        })
        .when('/edit_recipe',{
            templateUrl: "Views/edit_recipe.html",
            controller: "editRecipeController"
        })
        .otherwise({redirectTo: '/main'});
}]);

