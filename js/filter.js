const API = 'https://hoang3409.alwaysdata.net/codeigniter/index.php/Welcome/GetListUser';

var app = angular.module('app', []);
app.controller('myController', function ($scope, $http) {

    $scope.editingUser = false;

    $scope.editUser = function (id) {
        $scope.editingUser = id;
    }

    $http.get(API).
    then(function success(response) {
        $scope.data = response.data;
    }, function failed(e) {
        console.log(e);
    });

    $scope.OrderBy = function (item) {
        $scope.order = item;
    }

    $scope.handleEdit = function (user) {
        if (user.Id == $scope.editingUser) {
            return;
        }
        console.log(`Đang chỉnh sửa: ${user.Id}`);
        $scope.editUser(user.Id);
        $scope.editItem = user;
    }

    $scope.handleEditDone = function (user) {
        console.log(`Hoàn thành nhập dữ liệu cho ${user.Id}`);
        $scope.editUser(false);
        resetInput();
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

    $scope.handleAddNewUser = function () {
        var id = $scope.userIdNew
        var name = $scope.userNameNew
        var username = $scope.userBirthdayNew
        var email = $scope.userEmailNew

        if (name == '' || name == undefined ||
            username == '' || username == undefined ||
            email == '' || email == undefined
        ) {
            alert('Không được để trống')
            return;
        }

        for (let i = 0; i < $scope.data.length; i++) {
            if ($scope.data[i].Id == id) {
                alert(`ID: ${id} đã có người khác sử dụng!`)
                return;
            }
        }

        $scope.data.push({
            Id: id,
            Name: name,
            Birthday: Birthday,
            Email: email,
        })

        alert("Thêm thành công!")

        resetInput();
    }

    function resetInput() {
        $scope.userIdNew = '';
        $scope.userNameNew = '';
        $scope.userUsernameNew = '';
        $scope.userEmailNew = '';
    }

});