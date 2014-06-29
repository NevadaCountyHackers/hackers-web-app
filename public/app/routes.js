'use strict';

angular.module('main').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/views/index.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);