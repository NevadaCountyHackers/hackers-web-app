'use strict';

//Setting HTML5 Location Mode
angular.module('main').config(['$locationProvider',
    function ($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);