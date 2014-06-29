'use strict';

angular.module('main.system').factory('Global', [

    function() {
        var obj = this;

        obj._data = {
            app : window.app || false
        };

        return obj._data;
    }

]);