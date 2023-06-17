/*  ---------------------------------------------------
	Theme Name: Anime
	Description: Anime video tamplate
	Author: Colorib
	Author URI: https://colorib.com/
	Version: 1.0
	Created: Colorib
---------------------------------------------------------  */

'use strict';
import 'angular';
import 'angular-route';
import * as component from '../components/components';
import * as directive from '../directives/directive';
import * as controller from '../controllers/controller';

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

app.component('productItem', component.productItem);
app.component('viewItem', component.viewItem);
app.component('headerCustoms', component.headerCustoms);
app.component('footerCustoms', component.footerCustoms);
app.component('heroSlider', component.heroSlider);
app.component('heroItem', component.heroItem);
app.component('productSection', component.productSection);
app.component('trendingProduct', component.trendingProduct);
app.component('breadcrumb', component.breadcrumb);
app.component('animeDetailsEpisode', component.animeDetailsEpisode);
app.component('search', component.search);
app.component('animeDetailsContent', component.animeDetailsContent);
app.component('animeTopViews', component.animeTopViews);
app.component('productSidebar', component.productSidebar);
app.component('productSidebarComment', component.productSidebarComment);
app.component('popularProduct', component.popularProduct);
app.component('liveProduct', component.liveProduct);
app.component('recentProduct', component.recentProduct);

app.directive('searchResult', directive.searchResult);
app.directive('preLoader', directive.preLoader);
app.directive('setBg', directive.setBg);
app.directive('searchModel', directive.searchModel);
app.directive('niceSelect', directive.niceSelect);
app.directive('scrollToTop', directive.scrollToTop);
app.directive('filter', directive.filter);
app.directive('navigation', directive.navigation);
app.directive('heroSlider', directive.heroSlider);
app.directive('profile', directive.profile);
app.directive('popular', directive.popular);
app.directive('trending', directive.trending);
app.directive('timeAgo', directive.timeAgo);
app.directive('redirect', directive.redirect);
app.directive('videoPlayer', directive.videoPlayer);
app.directive('comments', directive.comments);
app.directive('vote', directive.vote);

app.controller('CheckAuth', controller.CheckAuth);
app.controller('HeroSliderController', controller.HeroSliderController);
app.controller('login', controller.login);
app.controller('register', controller.register);
app.controller('GetListAnimeTrending', controller.GetListAnimeTrending);
app.controller('GetGenres', controller.GetGenres);
app.controller('GetListAnimePopular', controller.GetListAnimePopular);
app.controller('AnimeDetailsController', controller.AnimeDetailsController);
app.controller('BlogDetail', controller.BlogDetail);
app.controller('AnimeWatchingController', controller.AnimeWatchingController);
app.controller('CategoryController', controller.CategoryController);
app.controller('profile', controller.profile);
app.controller('comments', controller.comments);

app.config(function ($routeProvider) {
	$routeProvider.when('/login', {
		templateUrl: '../views/login.html',
	});

	$routeProvider.when('/signup', {
		templateUrl: '../views/signup.html',
	});

	$routeProvider.when('/blog', {
		templateUrl: '../views/blog.html',
	});

	$routeProvider.when('/categories/:id', {
		templateUrl: '../views/categories.html',
		controller: 'CategoryController',
	});

	$routeProvider.when('/anime-details/:animeId', {
		templateUrl: '../views/anime-details.html',
	});

	$routeProvider.when('/anime/:animeId/episode/:id', {
		templateUrl: '../views/anime-watching.html',
	});

	$routeProvider.when('/blog-details', {
		templateUrl: '../views/blog-details.html',
		controller: 'BlogDetail',
	});

	$routeProvider.when('/profile', {
		template: '<profile></profile>',
	});

	$routeProvider.when('/trending', {
		template: '<trending></trending>',
	});

	$routeProvider.when('/popular', {
		template: '<popular></popular>',
	});

	$routeProvider.when('/search/:query', {
		template: `<search-result></search-result>`,
	});

	$routeProvider.otherwise({
		template: '<hero-slider></hero-slider> <product-section></product-section>',
	});
});

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
