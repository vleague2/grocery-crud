'use strict';

angular.module('app')
.config(function($stateProvider) {

    // first view is the groceries to buy
    let buyState = {
        name: 'buy',
        url: '/groceries',
        component: 'groceryNeeded'
    };
    
    // second view is the purchased groceries
    let purchasedState = {
        name: 'purchased',
        url: '/purchased',
        component: 'groceryPurchased'
    };
    
    $stateProvider.state(buyState);
    $stateProvider.state(purchasedState);
});