/*  ---------------------------------------------------
    Theme Name: Anime
    Description: Anime video tamplate
    Author: Colorib
    Author URI: https://colorib.com/
    Version: 1.0
    Created: Colorib
---------------------------------------------------------  */

'use strict';

(function ($) {
    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });

    /*------------------
        Video Player
    --------------------*/
    const player = new Plyr('#player', {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'captions', 'settings', 'fullscreen'],
        seekTime: 25
    });

    /*------------------
        Niceselect
    --------------------*/
    $('select').niceSelect();

    /*------------------
        Angular
    --------------------*/

    angular.module('myApp', ['ngRoute'])
        .component('productItem', {
            templateUrl: '../components/product_item/product_item.html',
            bindings: {
                name: '@',
                url: '@',
                comment: '@',
                views: '@',
                genres: '@'
            },
        }).component('headerCustoms', {
            templateUrl: '../components/header/header.html',
            bindings: {
                name: '@',
                url: '@',
            },
        }).component('heroSlider', {
            templateUrl: '../components/hero_slider/hero_slider.html',
            bindings: {
                name: '@',
                url: '@',
            },
        }).component('productSection', {
            templateUrl: '../components/product_section/product_section.html'
        }).component('footerCustoms', {
            templateUrl: '../components/footer/fotter.html'
        }).component('search', {
            templateUrl: '../components/search/search.html'
        }).config(function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/login', {
                    templateUrl: '../views/login.html',
                    controller: '',
                }).when('/signup', {
                    templateUrl: '../views/signup.html',
                    controller: '',
                }).when('/blog', {
                    templateUrl: '../views/blog.html'
                })
                .otherwise({
                    template: '<hero-slider></hero-slider> <product-section></product-section>'
                });
        });
})(jQuery);