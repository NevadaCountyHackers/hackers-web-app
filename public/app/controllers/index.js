'use strict';

angular.module('main.index')
    .controller('IndexCtrl', ['$scope', '$routeParams', '$http', '$location', 'Global',
        function ($scope, $routeParams, $http, $location, Global) {
            $scope.global = Global;
        }
    ]);