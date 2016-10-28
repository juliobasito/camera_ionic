/**
 * Created by jules-basse on 21/10/2016.
 */
angular.module('starter.services.cameraservice', [])

    .service('CameraSrv', function ($http, $q, $localStorage) {
        this.getcamera = function () {
            var q = $q.defer();

            $http({
                method: 'GET',
                url: 'http://localhost:1337/user/getcamera',
                headers: {
                    Authorization: 'JWT ' + $localStorage.token
                }
            }).then(function successCallback(response) {
                console.log(response);
                q.resolve(response.data);
            }, function () {
                console.log("rate");
                q.reject()
            });
            return q.promise;
        };

        this.getcamerabyid = function ($id) {
            var q = $q.defer();

            $http({
                method: 'GET',
                url: 'http://localhost:1337/camera',
                params: {id: $id},
                headers: {
                    Authorization: 'JWT ' + $localStorage.token
                }
            }).then(function successCallback(response) {
                console.log(response);
                q.resolve(response.data);
            }, function () {
                console.log("rate");
                q.reject()
            });
            return q.promise;
        };
    });