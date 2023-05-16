const API = 'https://hoang3409.alwaysdata.net/codeigniter/index.php/Welcome';

var app = angular.module('app', []);
app.controller('myController', function ($scope, $http) {

    $scope.editingUser = false;

    $scope.editUser = function (id) {
        $scope.editingUser = id;
    }

    $scope.getListUser = function () {
        $http.get(`${API}/GetListUser`).
        then(function success(response) {
            $scope.data = response.data;
        }, function failed(e) {
            console.log(e);
        });
    }

    $scope.getListUser();

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

        // Call API
        $http.get(`${API}/Delete/${id}`)
            .then(function success(response) {
                console.log('Success');
                $scope.getListUser();
            }, function failed(response) {
                console.log("Failed: ", response);
            })
    }

    $scope.handleAddNewUser = function () {
        var id = $scope.userIdNew
        var name = $scope.userNameNew
        var birthday = $scope.userBirthdayNew
        var email = $scope.userEmailNew
        var facebook = $scope.userFacebookNew
        var phoneNumber = $scope.userPhoneNumberNew

        if (name == '' || name == undefined ||
            birthday == '' || birthday == undefined ||
            facebook == '' || facebook == undefined ||
            phoneNumber == '' || phoneNumber == undefined ||
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

        $http({
                url: `${API}/AddNewUser`,
                method: 'POST',
                data: {
                    "Name": name,
                    "Birthday": birthday,
                    "Email": email,
                    "Facebook": facebook,
                    "PhoneNumber": phoneNumber,
                }
            })
            .then(function success() {
                console.log("Thêm thành công!")

                $scope.getListUser();

                resetInput();
            }, function failed(response) {
                console.log("Failed: ", response)
            })
    }

    function resetInput() {
        $scope.userIdNew = '';
        $scope.userNameNew = '';
        $scope.userBirthdayNew = '';
        $scope.userEmailNew = '';
        $scope.userFacebookNew = '';
        $scope.userPhoneNumberNew = '';
    }

});