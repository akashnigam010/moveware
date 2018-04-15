app.controller('DashboardController', ['$scope', '$location', '$rootScope', 'Services', '$mdToast', '$timeout', '$mdMedia', '$mdDialog', '$window', 'growl', function($scope, $location, $rootScope, Services, $mdToast, $timeout, $mdMedia, $mdDialog, $window, growl) {
    $rootScope.pageTitle = 'Dashboard';
    $scope.location = $location.path();
    
    var token = $rootScope.Authtoken;
    var headers = {
        'Accept': 'application/json',
        'Authorization': token
    };

}]);
