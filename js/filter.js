const API = 'https://jsonplaceholder.typicode.com/users';

var app = angular.module('app', []);
app.controller('myController', function ($scope, $http) {
    $http.get(API).
    then(function success(response) {
        $scope.data = response.data;
    }, function failed() {
        alert('Something went wrong!');
    });

    $scope.OrderBy = function (item) {
        $scope.order = item;
    }
});