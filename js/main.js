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
    var app = angular.module('myApp', ['ngRoute']);

    app.component('productItem', {
        templateUrl: '../components/product_section/product_item.html',
        bindings: {
            name: '@',
            url: '@',
            comment: '@',
            views: '@',
            genres: '@'
        },
    })
    app.component('headerCustoms', {
        templateUrl: '../components/header/header.html',
        bindings: {
            name: '@',
            url: '@',
        },
    })
    app.component('heroSlider', {
        templateUrl: '../components/hero_slider/hero_slider.html',
        bindings: {
            name: '@',
            url: '@',
        },
    })
    app.component('productSection', {
        templateUrl: '../components/product_section/product_section.html'
    })
    app.component('footerCustoms', {
        templateUrl: '../components/footer/footer.html'
    })
    app.component('search', {
        templateUrl: '../components/search/search.html'
    })
    app.component('breadcrumb', {
        templateUrl: '../components/breadcrumb/breadcrumb.html'
    })
    app.component('animeDetailsContent', {
        templateUrl: '../components/anime_details_content/anime_details_content.html'
    })
    app.component('heroItem', {
        templateUrl: '../components/hero_slider/hero_items.html',
        bindings: {
            idMovie: '@',
            name: '@',
            linkImage: '@',
            description: '@',
        }
    })
    app.config(function ($routeProvider) {
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