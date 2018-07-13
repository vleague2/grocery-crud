'use strict';

angular.module('groceryPurchased')
.component('groceryPurchased', {
    templateUrl: './src/app/templates/purchased.html',

    controller: function($scope, $firebaseArray) {

        // pull out firebase reference to groceries
        let ref = firebase.database().ref().child("groceries");

        // create a variable for the reference as an array
        $scope.groceries = $firebaseArray(ref);

        // count how many items have been purchased in the array
        $scope.completed = function() {

            let count = 0;
            
            angular.forEach($scope.groceries, function(item) {
                count += item.done ? 1 : 0;
            })
            
            return count;
        }

        // update a firebase item to mark it as not purchased
        $scope.markIncomplete = function(grocery) {
            grocery.done = false;
            $scope.groceries.$save(grocery);
        }        
    }
});