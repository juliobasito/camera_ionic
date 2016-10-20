angular.module('starter.services.userservice', [])

.service('UserSrv', function($http,$q){
    var token = null;
    var that = this;

    this.doLogin = function(username, password) {
        var q = $q.defer();

        $http({
            method: 'POST',
            url: 'http://localhost:1337/auth/signin',
            data: { password: password,
                identifier: username}
        }).then(function successCallback(response) {(
            console.log(response),
                that.token = "JWT "+response.data.token,
                that.user = response.data.user);
            q.resolve(response.data);
        }, function () {
            console.log("rate");
            q.reject()
        });
        return q.promise;
    };
});