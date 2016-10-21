angular.module('starter.controllers', [])

// Login
.controller('LoginCtrl', function($scope, $state, $ionicPopup, UserSrv) {
    $scope.loginData = {};
    $scope.token = UserSrv.token;

    console.log("LOGIN TOKEN :", UserSrv.token);
    if(UserSrv.token != null || UserSrv.token != "") {
        $state.go('tab.home');
    }

    $scope.doLogin = function() {
        if ($scope.loginData.username == null || $scope.loginData.password == null) {
            $ionicPopup.alert({ title: 'Information', template: 'Veuillez remplir toutes les informations !'});
        } else {
            UserSrv.doLogin($scope.loginData.username, $scope.loginData.password).then(function(data){
                    console.log('ok');
                    console.log(data);
                    if (data != null) {
                        $state.go('tab.home');
                    }
                },
                function(){
                    $ionicPopup.alert({ title: 'Erreur', template: 'Erreur lors de la récuperation de données !'});
                }
            );
        }
    }
})

// Register
.controller('RegisterCtrl', function($scope, $ionicModal, $ionicPopup, $http) {

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
        }).then(function successCallback(response) {
            console.log(response);
            $scope.modal.hide();
        }, function () {
            $ionicPopup.alert({ title: 'Erreur', template: 'Erreur lors de la récuperation de données !'});
        });
    };
})

// Controller tabs
.controller('HomeCtrl', function($scope) {})

//** PARTIE CAMERA **//
.controller('CameraCtrl', function($scope) {})

.controller('AddCameraCtrl', function($scope, $ionicModal, $http) {

    //** Create modal
    $ionicModal.fromTemplateUrl('templates/camera/addCamera.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.closeAddCamera = function() {
        $scope.modal.hide();
    };
    $scope.openAddCamera = function() {
        $scope.modal.show();
    };
    //**//
})
//****//


.controller('SettingsCtrl', function($scope, $state, $localStorage) {
    $scope.deco = function() {
        $localStorage.$reset();

        // VOIR AVEC LE PROF POUR DIRE QUE SUR LA PAGE DE LOGIN LES INFORMATIONS SONT TJR AFFICHER.
        /*
         UserSrv ???
         */
        $state.go('login');
    };
});
