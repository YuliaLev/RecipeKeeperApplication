var app = angular.module('myApp');

app.controller('mainController', function ($scope, $sce, recipesService, categoriesOfDishesValue) {
    $scope.categories = categoriesOfDishesValue;
    $scope.recipeKeeper = recipesService.recipesArr;
    $scope.flagShowMain = true;
    $scope.flagShowShoppingListSection = false;

    recipesService.getData('data.json')
        .success(function (data) {
            $scope.dataFromFile = data;
            $scope.recipesFromFile =  $scope.dataFromFile.recipes;
        })
        .error(function () {
            console.log('error');
        });

    $scope.copyFromFile = function () {
        if(recipesService.recipesArr.length == 0 && $scope.recipesFromFile){
            $scope.recipesFromFile.forEach(function (item,i) {
                recipesService.recipesArr.push(item);
            });
        }
    };

    $scope.categoryCount = function (num) {
        if($scope.recipesFromFile) {
            var count = 0;
            $scope.recipesFromFile.forEach(function (item) {
                if(item.category == num) {count += 1;} });
            return count;
        }
    };

    $scope.countAll = function () {
        if($scope.recipesFromFile) {
            return $scope.recipesFromFile.length;
        }
    };

    $scope.searchFavorite = function () {
        if(!$scope.flagShowMain){ $scope.flagShowMain = true;}
        if(!$scope.flagSearchFavorite){
            $scope.flagSearchFavorite = true;
        } else if ($scope.flagSearchFavorite) {
            $scope.flagSearchFavorite = undefined;
        }
        return $scope.flagSearchFavorite;
    };

    $scope.editRecipe = function (index) {
        $scope.copyFromFile();
        recipesService.editRecipeNumber = index;
    };

    $scope.showRecipe = function (index) {
        $scope.copyFromFile();
        recipesService.editRecipeNumber = index;
        recipesService.showRecipe = true;
    };

    $scope.saveInFile = function () {
        recipesService.sendData($scope.recipeKeeper)
            .success(function () {
                console.log('successfully saved to backend');
            })
            .error(function () {
                console.log('Error');
            });
    };

    $scope.sortField= function () {
        if($scope.sortfield == 'date'){
            $scope.reverse = true;
        } else if($scope.sortfield === undefined){
            $scope.reverse = true;
            $scope.sortfield = 'date';
        } else if($scope.sortfield == 'dateNotReverse'){
            $scope.reverse = false;
            return 'date';
        } else {
            $scope.reverse = false;
        }
        return $scope.sortfield;
    };

    $scope.searchYoutube = function () {
        $scope.flagShowMain = !$scope.flagShowMain;
    };

    recipesService.getData('https://www.googleapis.com/youtube/v3/search?key=AIzaSyA9Khl7n50jL7AAqOGaVx9pgUnwOPitnYw&part=snippet&type=video&order=rating&maxResults=20&channelId=UC0K_CP437favZ3maGV06vaw')
        .success(function (data) {
            $scope.videoList = data;
        })
        .error(function () {
            console.log('error');
        });

    $scope.playVideoUrl = function() {
        var playUrl = "http://www.youtube.com/embed/" + $scope.url;
        return $sce.trustAsResourceUrl(playUrl);
    };


    $scope.searchVideo = function (value) {
        var searchURL = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyA9Khl7n50jL7AAqOGaVx9pgUnwOPitnYw&part=snippet&type=video&order=rating&maxResults=20&order=date&channelId=UC0K_CP437favZ3maGV06vaw&q='+ value;
        recipesService.getData(searchURL)
            .success(function (data) {
                $scope.videoList = data;
            })
            .error(function () {
                console.log('error');
            });
    };

    $scope.showShoppingList = function () {
        $scope.copyFromFile();
        $scope.flagShowShoppingListSection = !$scope.flagShowShoppingListSection;
        if(!$scope.flagShowMain){ $scope.flagShowMain = true;}
        if(!$scope.shoppingList.length){$scope.flagCreateShoppingList = false;}
    };

    $scope.createNewShoppingList = function () {
        $scope.flagCreateShoppingList = true;
    };

    $scope.shoppingList = [];
    $scope.addToShoppingList = function () {
        if($scope.newProduct){
            var item = {};
            item.name = $scope.newProduct;
            item.isDone = false;
            $scope.shoppingList.push(item);
            $scope.newProduct = '';
        }
    };

    $scope.delProduct = function (index) {
        $scope.shoppingList.splice(index,1);
    };

    $scope.createShoppingListForRecipe = function () {
        if($scope.recipeForShoppingList !== null && $scope.recipeForShoppingList !== undefined) {
            $scope.flagCreateShoppingList = true;
            $scope.recipeKeeper[$scope.recipeForShoppingList].ingredients.forEach(function (item,i) {
                var product = {};
                product.name = item;
                product.isDone = false;
                $scope.shoppingList.push(product);
            })
        }
    };
    
    $scope.createNewList = function () {
        $scope.flagCreateShoppingList = false;
        $scope.shoppingList.length = 0;
        $scope.newProduct = '';
    }

});