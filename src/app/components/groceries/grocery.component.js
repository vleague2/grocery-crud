'use strict';

angular.module('groceryNeeded')
.component('groceryNeeded', {
    templateUrl: './src/app/templates/grocery.html',

    controller: function($scope, $firebaseArray, $sanitize) {

        // pull out firebase reference to groceries
        let ref = firebase.database().ref().child("groceries");

        // create a variable for the reference as an array
        $scope.groceries = $firebaseArray(ref);
        
        // when the user adds an item
        $scope.addItem = function() {

            // make sure the user entered text
            if ($scope.newItemText.length > 0) {
                // sanitize the input
                let sanitized = $sanitize($scope.newItemText);

                // add to firebase
                $scope.groceries.$add({
                    text: sanitized,
                    done: false
                })

                $scope.newItemText = '';
            }
        }

        // calculate the number of items that need to be purchased in the firebase array
        $scope.remaining = function() {

            let count = 0;

            angular.forEach($scope.groceries, function(item) {
                count += item.done ? 0 : 1;
            })

            return count;
        }
    
        // update a firebase item to mark it as purchased
        $scope.markComplete = function(grocery) {

            grocery.done = true;

            $scope.groceries.$save(grocery);
        }
    }
});
