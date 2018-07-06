'use strict';

angular.module('app')
.config(function($stateProvider, $urlRouterProvider) {

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

    // default view at home will be groceries
    $urlRouterProvider.when('/', '/groceries');
});