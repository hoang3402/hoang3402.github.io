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
        Niceselect
    --------------------*/
    $('select').niceSelect();

    /*------------------
        Angular
    --------------------*/

    angular.module('myApp', ['ngRoute'])
        .component('productItem', {
            templateUrl: '../components/product_section/product_item.html',
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
        }).component('breadcrumb', {
            templateUrl: '../components/breadcrumb/breadcrumb.html'
        }).component('heroItem', {
            templateUrl: '../components/hero_slider/hero_items.html',
            bindings: {
                idMovie: '@',
                name: '@',
                linkImage: '@',
                description: '@',
            }
        }).config(function ($routeProvider) {
            $routeProvider
                .when('/login', {
                    templateUrl: '../views/login.html',
                    controller: '',
                })
                .when('/signup', {
                    templateUrl: '../views/signup.html',
                    controller: '',
                })
                .when('/blog', {
                    templateUrl: '../views/blog.html'
                })
                .when('/categories', {
                    templateUrl: '../views/categories.html'
                })
                .when('/anime-details', {
                    templateUrl: '../views/anime-details.html'
                })
                .when('/anime-watching', {
                    templateUrl: '../views/anime-watching.html'
                })
                .when('/blog-details', {
                    templateUrl: '../views/blog-details.html'
                })
                .otherwise({
                    template: '<hero-slider></hero-slider> <product-section></product-section>',
                });
        });
})(jQuery);