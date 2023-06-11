/*  ---------------------------------------------------
    Theme Name: Anime
    Description: Anime video tamplate
    Author: Colorib
    Author URI: https://colorib.com/
    Version: 1.0
    Created: Colorib
---------------------------------------------------------  */

'use strict';

// https://firebase.google.com/docs/reference/js/v8
// Config Firebase
var firebaseConfig = {
	apiKey: 'AIzaSyCtt-OIOhdl-F0GxAWoaxne5rnVsYaPDSg',
	authDomain: 'anime-67796.firebaseapp.com',
	databaseURL:
		'https://anime-67796-default-rtdb.asia-southeast1.firebasedatabase.app',
	projectId: 'anime-67796',
};

// Khởi tạo ứng dụng Firebase
firebase.initializeApp(firebaseConfig);

/*------------------
    Angular
--------------------*/
var app = angular.module('myApp', ['ngRoute']);

app.run(($rootScope) => {
	$rootScope.Success = () => {
		Swal.fire({
			title: 'Alert',
			text: 'Success!',
			icon: 'success',
			showConfirmButton: true,
		});
	};
	$rootScope.Failed = () => {
		Swal.fire({
			title: 'Alert',
			text: 'Failed!',
			icon: 'error',
			showConfirmButton: true,
		});
	};
});
