const DOMAIN = 'https://hoang3409.alwaysdata.net/index.php';

export function preLoader() {
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
}

export function setBg() {
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
}

export function searchModel() {
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
}

export function searchResult() {
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
}

export function niceSelect() {
	return {
		link: () => {
			/*------------------
				Niceselect
			--------------------*/
			$('select').niceSelect();
		},
	};
}

export function scrollToTop() {
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
}

export function filter() {
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
}

export function navigation() {
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
}

export function heroSlider() {
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
}

export function videoPlayer() {
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
}

export function redirect() {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			element.on('click', function () {
				window.location.href = attrs.redirect;
			});
		},
	};
}

export function profile() {
	return {
		restrict: 'E',
		templateUrl: '../components/profile/profile.html',
		controller: 'profile',
	};
}

export function comments() {
	return {
		restrict: 'E',
		templateUrl: '../components/comments/comment.html',
		scope: {
			animeId: '@',
		},
		controller: 'comments',
	};
}

export function trending() {
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
}

export function popular() {
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
}

export function vote() {
	return {
		restrict: 'E',
		scope: {
			currentvote: '=',
		},
		templateUrl: '../components/vote/vote.html',
		controller: ($scope, $rootScope, $routeParams, $http) => {
			var animeId = $routeParams.animeId;

			$scope.upvote = (score) => {
				firebase.auth().onAuthStateChanged(function (user) {
					if (!user) {
						console.log('User not logged in');
						Swal.fire({
							title: 'Alert',
							text: 'You must login to follow!',
							icon: 'error',
							showConfirmButton: true,
						});
						return;
					}
					console.log(`score ${score} for ${animeId}`);
					var data = {
						animeId: animeId,
						uid: user.uid,
						vote: score,
					};
					$http({
						method: 'POST',
						url: `${DOMAIN}/Anime/UpVoteAnime`,
						data: $.param(data),
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
						},
					}).then(
						(res) => {
							console.log(res.data);
							if (res.data.action === 'new_follow') {
								$scope.currentvote++;
							}
							$rootScope.Success();
						},
						(res) => {
							$rootScope.Failed();
						},
					);
				});
			};
		},
	};
}

export function timeAgo() {
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
}

