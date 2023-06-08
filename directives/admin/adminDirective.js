var app = angular.module('myApp', ['ngRoute']);

app.directive('navbar', () => {
	return {
		restrict: 'E',
		templateUrl: './navbar/navbar.html',
		controller: () => {
			console.log('load navbar');
		},
	};
});

app.directive('sideBar', () => {
	return {
		restrict: 'E',
		templateUrl: './sidebar/sidebar.html',
		controller: () => {
			console.log('load sideBar');
		},
	};
});

app.directive('datatable', function () {
	return {
		restrict: 'E',
		templateUrl: './table/table.html',
		controller: () => {
			console.log('load dataTable');
		},
	};
});
