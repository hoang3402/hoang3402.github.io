app.directive('preLoader', function () {
	return {
		link: () => {
			/*------------------
                Preloader
            --------------------*/
			$(window).ready(function () {
				$('.loader').fadeOut();
				$('#preloder').delay(200).fadeOut('slow');
			});
		},
	};
});

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
		},
	};
});

app.directive('searchModel', function () {
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
		},
	};
});

app.directive('niceSelect', function () {
	return {
		link: () => {
			/*------------------
                Niceselect
            --------------------*/
			$('select').niceSelect();
		},
	};
});

app.directive('scrollToTop', function () {
	return {
		link: () => {
			/*------------------
                Scroll To Top
            --------------------*/
			$('#scrollToTopButton').click(function () {
				$('html, body').animate(
					{
						scrollTop: 0,
					},
					'slow',
				);
				return false;
			});
		},
	};
});

app.directive('filter', function () {
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
		},
	};
});

app.directive('navigation', function () {
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
		},
	};
});

app.directive('heroSlider', function () {
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
		},
	};
});

app.directive('videoPlayer', function () {
	return {
		link: () => {
			/*------------------
                Video Player
            --------------------*/
			const player = new Plyr('#player', {
				controls: [
					'play-large',
					'play',
					'progress',
					'current-time',
					'mute',
					'captions',
					'settings',
					'fullscreen',
				],
				seekTime: 25,
			});
		},
	};
});

app.directive('redirect', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			element.on('click', function () {
				window.location.href = attrs.redirect;
			});
		},
	};
});

app.directive('profile', function () {
	return {
		restrict: 'E',
		templateUrl: '../components/profile/profile.html',
		controller: 'profile',
	};
});
