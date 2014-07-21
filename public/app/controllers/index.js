'use strict';

angular.module('main.index')
    .controller('IndexCtrl', ['$scope', '$routeParams', '$http', '$location', 'Global', 'Event',
        function ($scope, $routeParams, $http, $location, Global, Event) {
            $scope.global = Global;

            $scope.getEvents = function(){
                Event.query(function(data){
                    $scope.events = data;
                });
            };

            $scope.init = function(){
                $scope.getEvents();
            };
        }
    ]);