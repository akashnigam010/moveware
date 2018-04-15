
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

    function openManagementNavigationMenus() {
        // display only for admin(1), owner(2) and manager(3)
        if (($rootScope.user.roleId == 1 || $rootScope.user.roleId == 2 || $rootScope.user.roleId == 3) 
            && $rootScope.user.authorizedToManage) {
            var manageNavMenuItems = [{
                title: 'Menu',
                icon: 'restaurant_menu',
                href: '/manageMenu'
            }, {
                title: 'Personnels',
                icon: 'group',
                href: '/personnel'
            }, {
                title: 'Tables',
                icon: 'bookmark',
                href: '/tables'
            }, {
                title: 'Tax Details',
                icon: 'account_balance',
                href: '/taxDetails'
            }, {
                title: 'Reports',
                icon: 'insert_chart',
                href: '/report'
            }, {
                title: 'Restaurant Info',
                icon: 'info_outline',
                href: '/restaurantInfo'
            }, {
                title: 'Support Center',
                icon: 'contacts',
                href: '/supportCenter'
            }];

            var settingsNavMenuItems = [{
                title: 'Cloud Settings',
                icon: 'settings',
                href: '/cloudSettings'
            }];

            $.merge($scope.$parent.manageNavMenu, manageNavMenuItems);
            $.merge($scope.$parent.settingsNavMenu, settingsNavMenuItems);
        }
    }
}]);
