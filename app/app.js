define([
    'angular',
    'jquery',
    'uiRouter'
], function(angular) {

    var session = { is_logged_in: false };
    var configuration = config['dev'];

    var app = angular.module('mckinley', ['ui.router'])
        .constant('ENV', configuration);

    app.init = function() {
        fetchUserInfo().then(bootstrapApplication);

        function fetchUserInfo() {
            var $injector = angular.injector(['ng']);
            var $http = $injector.get('$http');
            var $q = $injector.get('$q');
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: configuration['host'] + '/api/v1/user/info'
            }).success(function(response) {
                session = response.payload.data;
                deferred.resolve()
            }).error(function(response, status, headers, config) {
                window.user = { is_logged_in: false };
                deferred.resolve()
            });
            return deferred.promise;
        }

        function bootstrapApplication() {
            angular.bootstrap(document, ['mckinley']);
        }
    };

    app.config(function($stateProvider, $urlRouterProvider, $httpProvider, $controllerProvider, $locationProvider) {
        $controllerProvider.allowGlobals();

        //$urlRouterProvider.otherwise('/');

        $stateProvider
            .state('register', {
                url: "/user/register",
                views: {
                    mainView: {
                        templateUrl: "/app/views/user/register.html"
                    }
                }
            })
            .state('login', {
                url: "/user/login",
                views: {
                    mainView: {
                        templateUrl: "/app/views/user/login.html"
                    }
                }
            })
            .state('home', {
                url: "/",
                views: {
                    mainView: {
                        templateUrl: "/app/views/home.html"
                    }
                }
            })
    });

    app.run(function($rootScope, $location, $state) {
       $rootScope.user = session;
       if ($rootScope.user.is_logged_in) {
           $location.url("/");
       } else {
           $location.url("/user/login");
       }

        $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
            if (!$rootScope.user.is_logged_in) {
                $location.url("/user/login");
            }
        })
    });

    return app;
});