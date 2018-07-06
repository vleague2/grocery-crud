'use strict';

angular.module('groceryPurchased')
.component('groceryPurchased', {
    template:
    `
        <h2>Ingredients Ready to Cook!</h2>
        <div>
            <p class="count" ng-if="completed() > 0">You have bought {{completed()}} item(s)</p>
            <p class="count" ng-if="completed() === 0">Go buy some groceries!</p>
            <ul class="unstyled">
                <!--loop through grocery list and display if the grocery is purchased -->
                <li ng-repeat="grocery in groceries" ng-if="grocery.done === true">
                    <label class="checkbox"></label>
                    <input type="checkbox" ng-model="grocery.done" ng-click="markIncomplete(grocery)">
                    <p class="done-{{grocery.done}}">
                        {{grocery.text}} 
                    </p>
                    <!-- firebase function to remove the item from the array -->
                    <span ng-click="groceries.$remove(grocery)"><i class="fas fa-times-circle"></i></span>
                </li>
            </ul>
        </div>
    `
    ,

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