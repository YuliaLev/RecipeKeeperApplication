var app = angular.module('myApp');

app.service('recipesService',function ($http) {
    this.recipesArr = [];
    this.editRecipeNumber ='';
    this.showRecipe = false;
    this.countId = function () {
        if(this.recipesArr.length){
            return this.recipesArr[this.recipesArr.length -1].id + 1;
        } else return 0;
    };
    this.getData = function (url) {
        return $http.get(url);
    };
    this.sendData = function (data) {
        return $http.post('http://localhost:8001/addData', data)
    };
    this.uploadPhoto = function (photo) {
        return $http.post('http://localhost:8001/photo', photo, {
            headers: {'Content-Type': undefined },
            transformRequest: angular.identity
        })
    };
});