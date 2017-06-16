var app = angular.module('myApp');

app.controller('editRecipeController', function ($scope, recipesService, categoriesOfDishesValue) {
    $scope.flagNextSection = false;
    $scope.flagMessage = false;
    $scope.flagSavedRecipeSection = false;
    $scope.flagNewIngredient = false;
    $scope.flagNewCookingMethod = false;
    $scope.categories = categoriesOfDishesValue;
    $scope.recipeKeeper = recipesService.recipesArr;

    $scope.recipeKeeper.forEach(function (item,i) {
        if(item.id == recipesService.editRecipeNumber)
        {
            $scope.editRecipeNum = i;
            $scope.editRecipe = $scope.recipeKeeper[$scope.editRecipeNum];
        }
    });

    if(recipesService.showRecipe) {
        $scope.flagNextSection = true;
        $scope.flagSavedRecipeSection = true;
        recipesService.showRecipe = false;
    }

    $scope.totalTimeCalc = function () {
        if ($scope.editRecipe.preparationTime && $scope.editRecipe.cookingTime) {
            $scope.editRecipe.time = $scope.editRecipe.preparationTime + $scope.editRecipe.cookingTime;
            return $scope.editRecipe.time;
        }
    };

    $scope.favorite = function () {
        $scope.editRecipe.favorite = !$scope.editRecipe.favorite;
    };

    $scope.delIngredient = function (index) {
        $scope.editRecipe.ingredients.splice(index,1);
    };

    $scope.addIngredientForm = function () {
        $scope.flagNewIngredient = true;
    };

    $scope.addIngredient = function () {
        if ($scope.newIngredient !== undefined && $scope.newIngredient !== '') {
            $scope.editRecipe.ingredients.push($scope.newIngredient);
            $scope.flagNewIngredient = false;
            $scope.newIngredient = '';
        }
    };

    $scope.delCookingMethod = function (index) {
        $scope.editRecipe.cookingMethods.splice(index,1);
    };

    $scope.addCookingMethodForm = function () {
        $scope.flagNewCookingMethod = true;
    };

    $scope.addCookingMethod = function () {
        if ($scope.newCookingMethod !== undefined && $scope.newCookingMethod !== '') {
            $scope.editRecipe.cookingMethods.push($scope.newCookingMethod);
            $scope.flagNewCookingMethod = false;
            $scope.newCookingMethod = '';
        }
    };

    $scope.delete = function () {
        $scope.recipeKeeper.splice($scope.editRecipeNum,1);
        $scope.saveInFile();
        document.location.replace("http://localhost:8000/");
    };

    $scope.edit = function () {
        $scope.flagNextSection = false;
        $scope.flagSavedRecipeSection = false;
    };

    $scope.save = function () {
        if ($scope.editRecipe.ingredients.length){
            $scope.editRecipe.ingredients.forEach(function (item, i) {
                if(item == ''){
                    $scope.editRecipe.ingredients.splice(i,1);
                }
            })
        }
        if ($scope.editRecipe.cookingMethods.length){
            $scope.editRecipe.cookingMethods.forEach(function (item, i) {
                if(item == ''){
                    $scope.editRecipe.cookingMethods.splice(i,1);
                }
            })
        }
        if ($scope.editRecipe.ingredients.length && $scope.editRecipe.cookingMethods.length){
            $scope.saveInFile();
            $scope.flagSavedRecipeSection = true;
            $scope.flagMessage = false;
        } else $scope.flagMessage = true;
    };

    $scope.saveInFile = function () {
        recipesService.sendData($scope.recipeKeeper) // сохраняет данные в файл
            .success(function () {
                console.log('successfully saved to backend');
            })
            .error(function () {
                console.log('Error');
            });
    };

    $scope.uploadFile = function(files) {
        var fd = new FormData();
        fd.append('file', files[0]);
        $scope.editRecipe.photoFile = fd.get('file').name.toString();
        recipesService.uploadPhoto(fd)
            .success(function () {
                console.log('photo is saved to backend');
            })
            .error(function () {
                console.log('Error in saving photo');
            });
    };

    $scope.next = function () {
        if( $scope.editRecipe.title !== undefined && $scope.editRecipe.title !== '' && $scope.editRecipe.category !== undefined && $scope.editRecipe.category !== '' && $scope.editRecipe.preparationTime !== undefined && $scope.editRecipe.preparationTime !== null && $scope.editRecipe.cookingTime !== undefined && $scope.editRecipe.cookingTime !== null &&  $scope.editRecipe.personsAmount !== undefined &&  $scope.editRecipe.personsAmount !== null && $scope.editRecipe.personsAmount >= 1) {
            $scope.flagNextSection = !$scope.flagNextSection;
            $scope.flagMessage = false;
        } else $scope.flagMessage = true;
    };

});
