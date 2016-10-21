angular.module('starter.services.userservice', [])

    .service('UserSrv', function ($http, $q, $localStorage) {
        this.token = null;
        this.user = {};

        $localStorage = $localStorage.$default({
            user: null,
            token: null
        });

        var that = this;

        this.init = function () {
            //todo récupérer les datas du localStorage
            //todo si il y en a les mettre dans this.user et this.token
            this.token = $localStorage.token;
            this.user = $localStorage.user;
            console.log("TOKEN INIT : ", this.token);
            console.log("DO INIT");
        };

        this.doLogin = function (username, password) {
            var q = $q.defer();

            $http({
                method: 'POST',
                url: 'http://localhost:1337/auth/signin',
                data: {
                    password: password,
                    identifier: username
                }
            }).then(function successCallback(response) {
                console.log(response);
                if (response.data != null) {
                    that.token = "JWT " + response.data.token;
                    that.user = response.data.user;
                    $localStorage.token = (response.data.token);
                    $localStorage.user = (response.data.user);
                }

                q.resolve(response.data);
            }, function () {
                console.log("rate");
                q.reject()
            });
            return q.promise;
        };
    });