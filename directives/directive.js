import {app} from '../js/main.js';

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
		link: function ($scope) {
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

			$('#search-input').on('keydown', function (event) {
				if (event.keyCode === 13) {
					// Check if Enter key is pressed (key code 13)
					var searchTerm = $(this).val();
					console.log('Search term:', searchTerm);
					$('.search-model').fadeOut(400);
					$scope.handleSearch();
				}
			});
		},
		controller: ($http, $scope, $location) => {
			$scope.handleSearch = () => {
				var input = $('#search-input').val();
				$location.path(`/search/${input}`);
			};
		},
	};
});

app.directive('searchResult', function () {
	return {
		restrict: 'E',
		templateUrl: '../views/categories.html',
		controller: function ($scope, $http, $routeParams) {
			$scope.categoryName = `Search for ${$routeParams.query}`;
			$http({
				method: 'GET',
				url: `https://hoang3409.alwaysdata.net/index.php/Anime/search/${$routeParams.query}`,
			}).then((res) => {
				$scope.data = res.data;
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

app.directive('comments', function () {
	return {
		restrict: 'E',
		templateUrl: '../components/comments/comment.html',
		scope: {
			animeId: '@',
		},
		controller: 'comments',
	};
});

app.directive('trending', function () {
	return {
		restrict: 'E',
		templateUrl: '../views/categories.html',
		controller: function ($scope, $http) {
			console.log('get all trending');
			$scope.categoryName = 'trending';
			$http({
				method: 'GET',
				url: `${DOMAIN}/Anime/GetListAnimeTrending/6`,
			}).then((res) => {
				$scope.data = res.data;
			});
		},
	};
});

app.directive('popular', function () {
	return {
		restrict: 'E',
		templateUrl: '../views/categories.html',
		controller: function ($scope, $http) {
			console.log('get all popular');
			$scope.categoryName = 'popular';
			$http({
				method: 'GET',
				url: `${DOMAIN}/Anime/GetListAnimePopular`,
			}).then((res) => {
				$scope.data = res.data;
			});
		},
	};
});

app.directive('timeAgo', function () {
	return {
		restrict: 'E',
		scope: {
			timestamp: '@',
		},
		template: '{{ timeAgo }}',
		link: function (scope, element, attrs) {
			function getTimeAgo(timestamp) {
				var currentTime = new Date().getTime();
				var localTimezoneOffset = new Date().getTimezoneOffset() / 60;
				var inputTime = new Date(timestamp);
				inputTime.setHours(inputTime.getHours() - localTimezoneOffset);
				var timeDiff = currentTime - inputTime;

				var secondsDiff = Math.floor(timeDiff / 1000);

				if (secondsDiff < 60) {
					return secondsDiff + ' giây trước';
				}

				var minutesDiff = Math.floor(secondsDiff / 60);

				if (minutesDiff < 60) {
					return minutesDiff + ' phút trước';
				}

				var hoursDiff = Math.floor(minutesDiff / 60);

				if (hoursDiff < 24) {
					return hoursDiff + ' giờ trước';
				}

				var daysDiff = Math.floor(hoursDiff / 24);

				if (daysDiff < 30) {
					return daysDiff + ' ngày trước';
				}

				var monthsDiff = Math.floor(daysDiff / 30);
				return monthsDiff + ' tháng trước';
			}

			scope.timeAgo = getTimeAgo(scope.timestamp);
		},
	};
});
