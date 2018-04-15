
app.controller('LoginController', ['$scope', '$rootScope', 'Services', 'growl', '$log', function($scope, $rootScope, Services, growl, $log) {
    $scope.user = {
        name: '',
        password: ''
    };
    
    $scope.login = function(user) {
        if (user.name.length == 0) {
            growl.addInfoMessage('Please enter username');
            return;
        }
        if (user.password.length == 0) {
            growl.addInfoMessage('Please enter password');
            return;
        }
        location.href = '#/dashboard';
        $rootScope.isauthsuccess = true;
        // $rootScope.loading = true;
        // Services.login(user, $rootScope.hosturl).success(function(data) {
        //     if (data.result) {
        //         $rootScope.isauthsuccess = true;
        //         $rootScope.user = data.user;
        //         getNewMessagesCount();
        //         openManagementNavigationMenus();
        //         $rootScope.Authtoken = 'Bearer' + ' ' + data.token;
        //         location.href = '#/dashboard';
        //     } else {
        //         $rootScope.loading = false;
        //         growl.addErrorMessage('Invalid User');
        //         $scope.user = {
        //             pin: '',
        //             accessCode: ''
        //         };
        //     }
        // });
    };
}]);
