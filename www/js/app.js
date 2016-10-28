// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services.userservice', 'ngStorage', 'starter.services.cameraservice'])

.run(function($ionicPlatform, $rootScope, $state, UserSrv, CameraSrv, $stateParams) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }

    UserSrv.init();

    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    // Partie pour check le token a chaque changement de page
    $rootScope.$on('$stateChangeStart',function(event,toState,toParams,fromState,fromParams){
      console.log(toState.authenticate);
      console.log(UserSrv.token);
      if(toState.authenticate === true && UserSrv.token == null){
        $state.transitionTo('login');
        event.preventDefault();
      }
    })

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl',
    authenticate: false
  })

  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl'
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Pour les tabs
  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    },
    authenticate: true
  })

  .state('tab.camera', {
    url: '/camera',
    views: {
      'tab-camera': {
        templateUrl: 'templates/tab-camera.html',
        controller: 'CameraCtrl'
      }
    },
    authenticate: true
  })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingsCtrl'
      }
    },
    authenticate: true
  })

  //**** PARTIE CAMERA ******//
  .state('addCamera', {
    url: '/camera/addcamera',
    templateUrl: 'templates/camera/addCamera.html',
    controller: 'AddCameraCtrl',
    authenticate: true
  })

  .state('modifcamera', {
    url: '/camera/modifcamera',
    templateUrl: 'templates/modifcamera.html',
    controller: 'ModifCameraCtrl',
    authenticate: true,
    params: {id: ""}
  });
  //*******//

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
