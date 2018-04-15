app.controller('EntityTypeController', ['$scope', '$location', '$rootScope', 'Services', '$mdToast', '$timeout', '$mdMedia', '$mdDialog', '$window', 'growl', function($scope, $location, $rootScope, Services, $mdToast, $timeout, $mdMedia, $mdDialog, $window, growl) {
    $rootScope.pageTitle = 'Entity Type';
    $scope.location = $location.path();
    
    var token = $rootScope.Authtoken;
    var headers = {
        'Accept': 'application/json',
        'Authorization': token
    };

    var addEntityTypeModalObj = {};
    $scope.loadEntityTypes = function() {
        $window.scrollTo(0, 0);
        addEntityTypeModalObj.attributes = [
            {
                id : 1,
                name : 'Attribute 1'
            },
            {
                id : 2,
                name : 'Attribute 2'
            },
            {
                id : 3,
                name : 'Attribute 3'
            },
            {
                id : 4,
                name : 'Attribute 4'
            },
            {
                id : 5,
                name : 'Attribute 5'
            },
        ];
        // $rootScope.loading = true;
        // Services.loadDashboard($rootScope.hosturl, headers).success(function(data) {
        //     if (data.result) {
        //         $scope.seatingAreas = data.seatingAreas;
        //         $rootScope.loading = false;
        //     } else {
        //         growl.addErrorMessage(data.statusCodes.statusCode[0].description);
        //         $rootScope.loading = false;
        //     }
        // });
    }

    
    $scope.addEntityType = function(ev) {
        addEntityTypeModalObj.name = '';
        addEntityTypeModalObj.actionType = 'Add new entity type';
        var userAction = $scope.showAddEntityTypeModal(ev);
        userAction.then(function(answer) {
            if (answer) {
                debugger;
                $window.scrollTo(0, 0);
                var request = {
                    name : addEntityTypeModalObj.name,
                    attributeTypes : getAttributeIds(addEntityTypeModalObj.selected)
                };
                $rootScope.loading = true;
                Services.openTable($rootScope.hosturl, addEntityTypeModalObj, headers).success(function(data) {
                    if (data.result) {
                        $location.path(location);
                        growl.addSuccessMessage("Table "+ table.tableNumber +" open");
                        $rootScope.loading = false;
                    } else {
                        growl.addErrorMessage(data.statusCodes.statusCode[0].description);
                        $rootScope.loading = false;
                    }
                });
            }
        });
    };

    function getAttributeIds(list) {
        var ids = [];
        for (var i=0; i < list.length; i++) {
            ids.push({
                attributeTypeId : list[i].id
            });
        }
        return ids;
    }

    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    $scope.showAddEntityTypeModal = function(ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        var dataObject = addEntityTypeModalObj;
        return $mdDialog.show({
            locals: { dataToPass: dataObject },
            controller: ['$scope', 'dataToPass', function($scope, dataToPass) {
                $scope.addEntityTypeModalObj = dataToPass;

                $scope.selected = [];
                $scope.toggle = function (item, list) {
                    var idx = list.indexOf(item);
                    if (idx > -1) {
                      list.splice(idx, 1);
                    }
                    else {
                      list.push(item);
                    }
                };
                $scope.exists = function (item, list) {
                    return list.indexOf(item) > -1;
                };

                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.answer = function(answer) {
                    addEntityTypeModalObj.name = $scope.addEntityTypeModalObj.name;
                    addEntityTypeModalObj.selected = $scope.selected;
                    $mdDialog.hide(answer);
                };
            }],
            templateUrl: 'views/modals/addEntityType.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            fullscreen: useFullScreen
        });
        $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
    };

}]);
