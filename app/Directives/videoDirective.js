var app = angular.module('myApp');

app.directive("videoInList", function ($location, $anchorScroll) {
    return {
        link: function (scope) {
            scope.setUrl = function(videoUrl) {
                scope.url =  videoUrl;
                $location.hash('recipes');
                $anchorScroll();
            };
        },
        templateUrl: 'Directives/videoInListTemplate.html'
    }
});
