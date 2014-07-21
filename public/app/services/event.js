'use strict';

angular.module('main.events')
    .factory('Event', [
        '$resource',
        function ($resource) {
            return $resource("/api/events/:id");
        }
     ]);