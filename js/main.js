/*  ---------------------------------------------------
    Theme Name: Anime
    Description: Anime video tamplate
    Author: Colorib
    Author URI: https://colorib.com/
    Version: 1.0
    Created: Colorib
---------------------------------------------------------  */

'use strict';

const DOMAIN = 'https://hoang3409.alwaysdata.net/index.php';

/*------------------
    Angular
--------------------*/
var app = angular.module('myApp', ['ngRoute']);

app.directive("preLoader", function () {
    return {
        link: () => {
            /*------------------
                Preloader
            --------------------*/
            $(window).on('load', function () {
                $(".loader").fadeOut();
                $("#preloder").delay(200).fadeOut("slow");
            });
        }
    }
})

app.directive('setBg', function () {
    return {
        link: function () {
            /*------------------
                Background Set
            --------------------*/
            $('.set-bg').each(function () {
                var bg = $(this).data('setbg');
                $(this).css('background-image', 'url(' + bg + ')');
            });
        }
    };
});

app.directive("searchModel", function () {
    return {
        link: function () {
            /*------------------
                Search model
            --------------------*/
            $('.search-switch').on('click', function () {
                $('.search-model').fadeIn(400);
            });

            $('.search-close-switch').on('click', function () {
                $('.search-model').fadeOut(400, function () {
                    $('#search-input').val('');
                });
            });
        }
    }
})

app.directive("niceSelect", function () {
    return {
        link: () => {
            /*------------------
                Niceselect
            --------------------*/
            $('select').niceSelect();
        }
    }
})

app.directive("scrollToTop", function () {
    return {
        link: () => {
            /*------------------
                Scroll To Top
            --------------------*/
            $('#scrollToTopButton').click(function () {
                $('html, body').animate({
                        scrollTop: 0,
                    },
                    'slow'
                );
                return false;
            });
        }
    }
})

app.directive("filter", function () {
    return {
        link: () => {
            /*------------------
                    Filter
            --------------------*/
            $('.filter__controls li').on('click', function () {
                $('.filter__controls li').removeClass('active');
                $(this).addClass('active');
            });
            if ($('.filter__gallery').length > 0) {
                var containerEl = document.querySelector('.filter__gallery');
                var mixer = mixitup(containerEl);
            }
        }
    }
})

app.directive("navigation", function () {
    return {
        link: () => {
            /*------------------
                Navigation
            --------------------*/
            $('.mobile-menu').slicknav({
                prependTo: '#mobile-menu-wrap',
                allowParentLinks: true,
            });

            $('.header__menu li').click(function () {
                $('.header__menu li').removeClass('active');
                $(this).addClass('active');
            });

            $('.header__logo a').click(function () {
                $('.header__menu li').removeClass('active');
                $('.header__menu li').first().addClass('active');
            });
        }
    }
})

app.directive("heroSlider", function () {
    return {
        link: () => {
            /*------------------
                Hero Slider
            --------------------*/
            var hero_s = $('.hero__slider');
            hero_s.owlCarousel({
                loop: true,
                margin: 0,
                items: 1,
                dots: true,
                nav: true,
                navText: [
                    "<span class='arrow_carrot-left'></span>",
                    "<span class='arrow_carrot-right'></span>",
                ],
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                smartSpeed: 1200,
                autoHeight: false,
                autoplay: true,
                mouseDrag: false,
            });
        }
    }
})

app.controller("GetListAnime", function ($scope, $http) {
    $http({
            method: "GET",
            url: `${DOMAIN}/Anime/GetList/6`,
        })
        .then((res) => {
            $scope.list = res.data;
            console.log(`.then ~ res.data:`, res.data)
        }, () => {
            alert("Server bị gì rồi á");
        })
})

app.controller("GetGenres", function ($scope, $http) {
    $http({
            method: "GET",
            url: `${DOMAIN}/Anime/GetGenres`
        })
        .then((res) => {
            $scope.genres = res.data;
        }, (res) => {
            console.log("Failed: ", res.data)
        })
})

app.controller("BlogDetail", function ($anchorScroll) {
    $anchorScroll();
})

app.controller("AnimeDetailsController", function ($scope, $routeParams, $anchorScroll, $http) {
    $anchorScroll();
    $scope.id = $routeParams.id;

    $http({
            method: "GET",
            url: `${DOMAIN}/Anime/GetAnimeById/${$scope.id}`
        })
        .then((res) => {
            var data = res.data[0];
            $scope.title = data.title
            $scope.linkImage = data.cover_image_url
            $scope.description = data.description
            $scope.views = data.views
        })

    console.log($scope);
})

app.component('productItem', {
    templateUrl: '../components/product_section/product_item.html',
    bindings: {
        id: '@',
        name: '@',
        url: '@',
        comment: '@',
        views: '@',
        genres: '@'
    },
})
app.component('headerCustoms', {
    templateUrl: '../components/header/header.html',
    controller: "GetGenres",
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
    templateUrl: '../components/product_section/product_section.html',
    controller: "GetListAnime",
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
app.component('animeTopViews', {
    templateUrl: '../components/anime_top_views/anime_top_views.html'
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
app.config(function ($routeProvider, $locationProvider) {
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
        .when('/anime-details/:id', {
            templateUrl: '../views/anime-details.html',
            controller: 'AnimeDetailsController',
        })
        .when('/anime-watching', {
            templateUrl: '../views/anime-watching.html'
        })
        .when('/blog-details', {
            templateUrl: '../views/blog-details.html',
            controller: 'BlogDetail'
        })
        .otherwise({
            template: '<hero-slider></hero-slider> <product-section></product-section>',
        });
});