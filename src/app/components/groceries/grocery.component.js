'use strict';

angular.module('groceryNeeded')
.component('groceryNeeded', {
    template:
    `
        <h2>Today's Meal Ingredients</h2>
        <div>
            <p class="count" ng-if="remaining() > 0">You have {{remaining()}} item(s) left to purchase</p>
            <p class="count" ng-if="remaining() === 0">You bought everything!</p>
            <ul class="unstyled">
                <!--loop through grocery list and display if the grocery is not purchased -->
                <li ng-repeat="grocery in groceries" ng-if="grocery.done === false">
                    <label class="checkbox"></label>
                    <input type="checkbox" class="checkbox" ng-click="markComplete(grocery)"></input>
                    <!-- firebase function to update an item in the array as it's edited-->
                    <input type="text" class="grocery-item done-{{grocery.done}}" ng-model="grocery.text" ng-change="groceries.$save(grocery)"></input>
                    <!-- firebase function to remove the item from the array -->
                    <span ng-click="groceries.$remove(grocery)"><i class="fas fa-times-circle"></i></span>
                </li>
            </ul>
            <hr>
            <form ng-submit="addItem()">
                <input type="text" ng-model="newItemText" class="new-item-text"  size="30"
                        placeholder="add new item here">
                <input class="btn" type="submit" value="add">
            </form>
        </div>
    `
    ,

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
