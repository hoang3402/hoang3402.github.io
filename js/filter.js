const API = 'https://jsonplaceholder.typicode.com/users';

var app = angular.module('app', []);
app.controller('myController', function ($scope, $http) {

    $scope.editingUser = false;

    $scope.editUser = function (id) {
        $scope.editingUser = id;
    }

    $http.get(API).
    then(function success(response) {
        $scope.data = response.data;
    }, function failed() {
        alert('Something went wrong!');
    });

    $scope.OrderBy = function (item) {
        $scope.order = item;
    }

    $scope.handleRepair = function (id) {
        if (id == $scope.editingUser) {
            return;
        }
        console.log(`Đang chỉnh sửa: ${id}`);
        $scope.editUser(id);
    }

    $scope.handleDelete = function (id) {
        console.log(`Đang xoá: ${id}`)

        // Xoá trên giao diện
        $scope.data.map((e, index) => {
            if (e.id == id) {
                $scope.data.splice(index, 1)
                console.log(`Đã xoá: ${id}`);
                return;
            }
        })
    }
});