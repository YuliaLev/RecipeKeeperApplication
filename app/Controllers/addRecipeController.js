var app = angular.module('myApp');

app.controller('addRecipeController', function ($scope, categoriesOfDishesValue, recipeFactory, recipesService) {
    $scope.categories = categoriesOfDishesValue;
    $scope.flagNextSection = false;
    $scope.flagFavorite = false;
    $scope.flagSavedRecipeSection = false;
    $scope.flagMessage = false;
    $scope.ingredientsArr = [];
    $scope.cookingMethodsArr = [];
    $scope.recipeKeeper = recipesService.recipesArr;

    $scope.next = function () {
        if( $scope.titleOfRecipe !== undefined && $scope.titleOfRecipe !== '' && $scope.categoryOfRecipe !== undefined && $scope.categoryOfRecipe !== '' && $scope.preparationTimeOfRecipe !== undefined && $scope.preparationTimeOfRecipe !== null && $scope.cookingTimeOfRecipe !== undefined && $scope.cookingTimeOfRecipe !== null &&  $scope.personsAmountOfRecipe !== undefined &&  $scope.personsAmountOfRecipe !== null && $scope.personsAmountOfRecipe >= 1) {
            $scope.flagNextSection = !$scope.flagNextSection;
            $scope.flagMessage = false;
        } else $scope.flagMessage = true;
    };

    $scope.favorite = function () {
        $scope.flagFavorite = !$scope.flagFavorite;
    };

    $scope.addIngredientOfRecipe = function () {
        if ($scope.ingredientOfRecipe) {
            $scope.ingredientsArr.push($scope.ingredientOfRecipe);
            $scope.ingredientOfRecipe = '';
        }
    };

    $scope.delIngredientOfRecipe = function (index) {
        $scope.ingredientsArr.splice(index, 1);
    };

    $scope.addCookingMethodOfRecipe = function () {
        if ($scope.cookingMethodOfRecipe) {
            $scope.cookingMethodsArr.push($scope.cookingMethodOfRecipe);
            $scope.cookingMethodOfRecipe = '';
        }
    };

    $scope.delCookingMethodOfRecipe = function (index) {
        $scope.cookingMethodsArr.splice(index, 1);
    };

    $scope.totalTimeCalc = function () {
        if ($scope.preparationTimeOfRecipe && $scope.cookingTimeOfRecipe) {
            $scope.totalTime = 0;
            $scope.totalTime = $scope.preparationTimeOfRecipe + $scope.cookingTimeOfRecipe;
            return $scope.totalTime;
        }
    };

    $scope.uploadFile = function(files) {
        var fd = new FormData();
        fd.append('file', files[0]);
        $scope.fileName = fd.get('file').name;
        recipesService.uploadPhoto(fd)
            .success(function () {
            console.log('photo is saved to backend');
        })
            .error(function () {
                console.log('Error in saving photo');
            });
    };

    $scope.save = function () {
        if ($scope.ingredientOfRecipe) {
            $scope.addIngredientOfRecipe($scope.ingredientOfRecipe);
        }
        if ($scope.cookingMethodOfRecipe) {
            $scope.addCookingMethodOfRecipe($scope.cookingMethodOfRecipe);
        }
        if($scope.ingredientsArr.length && $scope.cookingMethodsArr.length) {
            $scope.id = recipesService.countId();
            $scope.recipe = new recipeFactory.createNewRecipe($scope.titleOfRecipe, $scope.id, $scope.categoryOfRecipe, $scope.preparationTimeOfRecipe, $scope.cookingTimeOfRecipe, $scope.totalTime, $scope.personsAmountOfRecipe, $scope.descriptionOfRecipe, $scope.flagFavorite, $scope.ingredientsArr, $scope.cookingMethodsArr, $scope.fileName);
            recipesService.recipesArr.push($scope.recipe);
            $scope.flagSavedRecipeSection = true;
            $scope.flagMessage = false;
            recipesService.sendData($scope.recipeKeeper)
                .success(function () {
                    console.log('successfully saved to backend');
                })
                .error(function () {
                    console.log('Error');
                });
        } else $scope.flagMessage = true;
    };

    $scope.editRecipe = function (index) {
        recipesService.editRecipeNumber = index;
        document.location.replace("http://localhost:8000/#/edit_recipe");
    };

    $scope.reset = function () {
        $scope.titleOfRecipe = '';
        $scope.categoryOfRecipe = '';
        $scope.preparationTimeOfRecipe = '';
        $scope.cookingTimeOfRecipe = '';
        $scope.personsAmountOfRecipe = '';
        $scope.descriptionOfRecipe = '';
        $scope.flagFavorite = false;
        $scope.ingredientsArr = [];
        $scope.cookingMethodsArr = [];
        $scope.totalTime = 0;
        $scope.flagSavedRecipeSection = false;
        $scope.flagNextSection = false;
        $scope.flagMessage = false;
    };

    $scope.addNewRecipe = function () {
        $scope.reset();
    };
});