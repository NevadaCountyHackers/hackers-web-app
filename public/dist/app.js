'use strict';

angular.module('main', ['ngRoute', 'ngResource', 'ui.route', 'main.system', 'main.index', 'main.events']);

angular.module('main.system', []);
angular.module('main.index', []);
angular.module('main.events', []);
'use strict';

//Setting HTML5 Location Mode
angular.module('main').config(['$locationProvider',
    function ($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);
'use strict';

angular.module('main.system')
    .factory('Global', [

        function () {
            var obj = this;

            obj._data = {
                app: window.app || false
            };

            return obj._data;
        }

    ]);
'use strict';

angular.element(document).ready(function() {
    //Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') window.location.hash = '#!';

    //Then init the app
    angular.bootstrap(document, ['main']);
});
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
'use strict';

angular.module('main.index')
    .controller('IndexCtrl', ['$scope', '$routeParams', '$http', '$location', 'Global', 'Event',
        function ($scope, $routeParams, $http, $location, Global, Event) {
            $scope.global = Global;

            $scope.getEvents = function(){
                Event.query(function(data){
                    console.log(data);
                    data.then(function(data){
                        $scope.events = data;
                    });
                });
            };

            $scope.init = function(){
                $scope.getEvents();
            };
        }
    ]);
'use strict';

angular.module('main.events')
    .factory('Event', [
        '$resource',
        function ($resource) {
            return $resource("/api/events/:id");
        }
     ]);