angular.module('starter.controllers', [])

// Login
.controller('LoginCtrl', function($scope, $state, $ionicPopup, UserSrv) {
    $scope.loginData = {};
    $scope.token = UserSrv.token;

    $scope.doLogin = function() {
        if ($scope.loginData.username == null || $scope.loginData.password == null) {
            $ionicPopup.alert({ title: 'Information', template: 'Veuillez remplir toutes les informations !'});
        } else {
            UserSrv.doLogin($scope.loginData.username, $scope.loginData.password).then(function(data){
                    console.log('ok');
                    console.log(data);
                    $state.go('tab.home');
                },
                function(){
                    console.log('Erreur');
                }
            );
        }
    }
})

// Register
.controller('RegisterCtrl', function($scope, $ionicModal, $http) {

    //** Create modal
    $ionicModal.fromTemplateUrl('templates/register.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.closeRegister = function() {
        $scope.modal.hide();
    };
    $scope.openRegister = function() {
        $scope.modal.show();
    };
    //**//

    $scope.registerData = {};

    $scope.doRegister = function() {
        $http({
            method: 'POST',
            url: 'http://localhost:1337/auth/signup',
            data: { username: $scope.registerData.username,
                password: $scope.registerData.password,
                email: $scope.registerData.email,
                lastname: $scope.registerData.lastname,
                firstname: $scope.registerData.firstname }
        }).then(function successCallback(response) {(
            console.log(response),
            $scope.modal.hide())
        }, function () {
            console.log("rate");
        });
    };
})

// Controller tabs
.controller('HomeCtrl', function($scope) {})

.controller('CameraCtrl', function($scope) {})

.controller('SettingsCtrl', function($scope) {});
