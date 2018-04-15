'use strict';

var app = angular.module('moveware', ['ngRoute', 'ngSanitize', 'angular-growl', 'ngAnimate', 'ngMaterial', 'ngMessages', 'ngMdIcons', 'chart.js']).
config(['$routeProvider', '$httpProvider', 'growlProvider', '$mdThemingProvider', '$mdDateLocaleProvider', function($routeProvider, $httpProvider, growlProvider, $mdThemingProvider, $mdDateLocaleProvider) {

    growlProvider.globalTimeToLive(3000);
    growlProvider.globalEnableHtml(true);

    var movewareBlueMap = $mdThemingProvider.extendPalette('blue', {
        '500': '#0270C1'
    });

    $mdThemingProvider.definePalette('movewareBlue', movewareBlueMap);

    $mdThemingProvider.theme('default').primaryPalette('movewareBlue').accentPalette('blue');
    
    $httpProvider.interceptors.push('httpInterceptor');
    
    $mdDateLocaleProvider.formatDate = function(date) {
        return moment(date).format('DD-MM-YYYY');
    };

    $routeProvider.
    when('/', {
        templateUrl: function(route) {
            return 'views/login.html';
        },
        controller: 'LoginController'
    }).

    when('/dashboard', {
        templateUrl: function(route) {
            return 'views/dashboard.html';
        },
        controller: 'DashboardController'
    }).

    when('/entityType', {
        templateUrl: function(route) {
            return 'views/entityType.html';
        },
        controller: 'EntityTypeController'
    }).

    when('/attribute', {
        templateUrl: function(route) {
            return 'views/attribute.html';
        },
        controller: 'AttributeController'
    }).

    when('/userSettings', {
        templateUrl: function(route) {
            return 'views/userSettings.html';
        },
        controller: 'UserSettingsController'
    }).

    otherwise({
        redirectTo: '/'
    });
}]);

app.run(function($rootScope, $location, $http) {
    $rootScope.$on('$locationChangeSuccess', function() {
        if (!$rootScope.isauthsuccess) {
            $location.path('/');
        }
        if ($location.path() == '/') {
            $rootScope.isauthsuccess = false;
        }
    });

    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        if (/^\/menu(?:.*)/.test($location.path())) {
            $rootScope.showSearchIcon = true;
        } else {
            $rootScope.showSearchIcon = false;
            $rootScope.showSearch = false;
        }
    });
});
