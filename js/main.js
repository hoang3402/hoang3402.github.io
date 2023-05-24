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

        /*------------------
            FIlter
        --------------------*/
        $('.filter__controls li').on('click', function () {
            $('.filter__controls li').removeClass('active');
            $(this).addClass('active');
        });
        if ($('.filter__gallery').length > 0) {
            var containerEl = document.querySelector('.filter__gallery');
            var mixer = mixitup(containerEl);
        }
    });

    /*------------------
		Navigation
	--------------------*/
    $('.mobile-menu').slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true,
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
        Scroll To Top
    --------------------*/
    $("#scrollToTopButton").click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
        return false;
    });
})(jQuery);

angular.module('myApp', [])
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
    });