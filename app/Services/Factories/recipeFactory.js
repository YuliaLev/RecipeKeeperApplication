var app = angular.module('myApp');

app.factory('recipeFactory',function () {
    function Recipe(title, id, category, preparationTime, cookingTime, time, personsAmount, description, favorite, ingredients, cookingMethods, file) {
        this.title = title;
        this.id = id;
        this.category = category;
        this.preparationTime = preparationTime;
        this.cookingTime = cookingTime;
        this.time = time;
        this.personsAmount = personsAmount;
        this.description = description;
        this.favorite = favorite;
        this.ingredients = ingredients;
        this.cookingMethods = cookingMethods;
        this.date = +new Date();
        this.photoFile = file || "noPhoto.jpg";
    }
    return {
        createNewRecipe: Recipe
    }
});

