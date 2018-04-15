'use strict';
/*global app*/

app.factory('Services', ['$http', function($http) {

    var data = {
        table: '',
        orderData: {},
        orderQuantity: 0,
        bill: {}
    };

    var menu = {
        fnbCategories: null,
        fnbSubCategories: null,
        fnbItems: null,
        barCategories: null,
        barSubCategories: null,
        barItems: null
    };

    var billSearchFilterCache = {};


    return {


        /****************************** SERVICE CALLS START ***************************/

        /****** Login ******/
        login: function(user, url) {
            var loginUrl;
            if (user.accessCode === undefined || user.accessCode === '') {
                loginUrl = 'login/pinSignOn';
            } else {
                loginUrl = 'login/signOn';
            }
            return $http({
                method: 'POST',
                data: user,
                url: url + loginUrl,
                async: false
            });
        }

        /****************************** SERVICE CALLS END ***************************/
    };
}]);

app.factory('httpInterceptor', ['$rootScope', 'growl', '$location', function($rootScope, growl, $location) {

    function handleErrorResponse(response) {
        $rootScope.loading = false;
        growl.addErrorMessage('Sorry please try again after sometime');
        $rootScope.$broadcast('logout');
    }

    return {
        request: function(config) {
            return config;
        },

        requestError: function(config) {
            return config;
        },

        response: function(response) {
            if (/\b2\d\d/.test(response.status)) {
                return response;
            } else {
                handleErrorResponse(response);
            }
        },

        responseError: function(response) {
            handleErrorResponse(response);
            return response;
        }
    }
}]);
