/*  ---------------------------------------------------
    Theme Name: Anime
    Description: Anime video tamplate
    Author: Colorib
    Author URI: https://colorib.com/
    Version: 1.0
    Created: Colorib
---------------------------------------------------------  */

'use strict';

// Cấu hình Firebase
var firebaseConfig = {
	apiKey: 'AIzaSyCtt-OIOhdl-F0GxAWoaxne5rnVsYaPDSg',
	authDomain: 'anime-67796.firebaseapp.com',
	projectId: 'anime-67796',
};

// Khởi tạo ứng dụng Firebase
firebase.initializeApp(firebaseConfig);

/*------------------
    Angular
--------------------*/
var app = angular.module('myApp', ['ngRoute']);
