'use strict';

angular.module('myApp.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'states/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'ctrl'
        });
    }])

    .controller('HomeCtrl', ['$http', function ($http) {
        var self = this;
        var url = "people.json";
        // var url = "http://agl-developer-test.azurewebsites.net/people.json";

        this.owners = [];

        function fetch() {
            $http.get(url)
                .success(function (owners) {
                    owners = owners.filter(function (owner) {
                        return owner.pets !== null;
                    });
                    self.owners = owners || [];
                })
                .error(function (data, status, headers, config) {
                    console.log('ERROR', data, status, headers, config);
                });
        }

        fetch();
    }]);