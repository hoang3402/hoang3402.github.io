const DOMAIN = 'https://hoang3409.alwaysdata.net/index.php';

app.controller('CheckAuth', ($scope) => {
	(() => {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				// Người dùng đã đăng nhập
				// console.log('User is logged in:', user);
				$scope.isLogin = true;
			} else {
				// Người dùng chưa đăng nhập
				console.log('User is logged out');
				$scope.isLogin = false;
			}
		});
	})();
});

app.controller('GetListAnimeTrending', function ($scope, $http) {
	$http({
		method: 'GET',
		url: `${DOMAIN}/Anime/GetListAnimeTrending/6`,
	}).then((res) => {
		$scope.list = res.data.slice(0, 6);
	});
});

app.controller('GetListAnimePopular', function ($scope, $http) {
	$http({
		method: 'GET',
		url: `${DOMAIN}/Anime/GetListAnimePopular`,
	}).then((res) => {
		$scope.list = res.data.slice(0, 6);
	});
});

app.controller('GetGenres', function ($scope, $http) {
	$http({
		method: 'GET',
		url: `${DOMAIN}/Anime/GetGenres`,
	}).then(
		(res) => {
			$scope.genres = res.data;
		},
		(res) => {
			console.log('Failed: ', res.data);
		},
	);
});

app.controller('BlogDetail', function ($anchorScroll) {
	$anchorScroll();
});

app.controller(
	'AnimeDetailsController',
	function ($scope, $routeParams, $anchorScroll, $http) {
		$anchorScroll();
		$scope.id = $routeParams.id;
		$scope.showFullText = false;

		$scope.toggleShowFullText = function (event) {
			event.preventDefault();
			$scope.showFullText = !$scope.showFullText;
		};

		$http({
			method: 'GET',
			url: `${DOMAIN}/Anime/GetAnimeById/${$scope.id}`,
		}).then((res) => {
			var data = res.data;
			$scope.title = data.title;
			$scope.linkImage = data.cover_image_url;
			$scope.descriptionShort = data.description.substring(0, 250);
			$scope.description = data.description;
			$scope.views = data.views;
			$scope.genres = data.genres.map((item) => item.name).join(', ');
			$scope.vote = data.vote;
		});
	},
);

app.controller(
	'AnimeWatchingController',
	function ($scope, $routeParams, $anchorScroll, $http) {
		$anchorScroll();
		$scope.animeId = $routeParams.animeId;
		$scope.Id = $routeParams.id;

		$http({
			method: 'GET',
			url: `${DOMAIN}/Anime/GetMovies/${$scope.animeId}`,
		}).then((res) => {
			$scope.data = res.data;
			$scope.url = $scope.data[0].URLs[0].url;
		});

		$scope.isManyQuality = function (id) {
			if (typeof id == 'undefined' || typeof $scope.data == 'undefined') {
				return;
			}
			return $scope.data[id - 1].URLs.length > 1;
		};

		$scope.handleChangeQuality = function (url) {
			$scope.url = url;
		};
	},
);

app.controller(
	'CategoryController',
	function ($scope, $routeParams, $anchorScroll, $http) {
		$anchorScroll();
		$http({
			method: 'GET',
			url: `${DOMAIN}/Anime/GetMoviesByCategory/${$routeParams.id}/18`,
		}).then((res) => {
			$scope.data = res.data;
			console.log(`$scope.data:`, $scope.data);
			$scope.categoryName = res.data[0].name;
		});
	},
);

app.controller('HeroSliderController', function ($scope, $http) {
	$http({
		method: 'GET',
		url: `${DOMAIN}/Anime/GetListAnimeTrending/3`,
	}).then((res) => {
		$scope.data = res.data;
	});
});

app.controller('login', function ($scope, $location) {
	$scope.alertSuccess = function () {
		Swal.fire({
			title: 'Alert',
			text: 'Login success!',
			icon: 'success',
			showConfirmButton: false,
			timer: 1500,
		});
	};

	$scope.alertFailed = function () {
		Swal.fire({
			title: 'Alert',
			text: 'Failed!',
			icon: 'error',
			showConfirmButton: false,
			timer: 1500,
		});
	};

	$scope.login = function () {
		var email = $scope.email;
		var password = $scope.password;

		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(function (userCredential) {
				var user = userCredential.user;
				localStorage.setItem('user', JSON.stringify(user.displayName));

				$scope.alertSuccess();

				$scope.$apply(() => {
					$location.path('/index');
				});
			})
			.catch(function (error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(`code: ${errorCode}, message: ${errorMessage}`);

				$scope.alertFailed();

				$scope.$apply(() => {
					$location.path('/login');
				});
			});
	};

	$scope.loginWithGoogle = function () {
		var provider = new firebase.auth.GoogleAuthProvider();
		firebase
			.auth()
			.signInWithPopup(provider)
			.then(function (result) {
				var user = result.user;
				localStorage.setItem('user', JSON.stringify(user.displayName));

				$scope.alertSuccess();

				$scope.$apply(() => {
					$location.path('/index');
				});
			})
			.catch(function (error) {
				$scope.alertFailed();
				$scope.$apply(() => {
					$location.path('/login');
				});
			});
	};

	$scope.loginWithTwitter = function () {
		var provider = new firebase.auth.TwitterAuthProvider();

		firebase
			.auth()
			.signInWithPopup(provider)
			.then(function (result) {
				var user = result.user;
				localStorage.setItem('user', JSON.stringify(user.displayName));

				$scope.alertSuccess();

				$scope.$apply(() => {
					$location.path('/index');
				});
			})
			.catch(function (error) {
				$scope.alertFailed();
				$scope.$apply(() => {
					$location.path('/login');
				});
			});
	};
});

app.controller('register', function ($scope, $location) {
	$scope.register = function () {
		var email = $scope.email;
		var password = $scope.password;
		var username = $scope.username;

		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(function (userCredential) {
				var user = userCredential.user;

				return user
					.updateProfile({
						displayName: username,
					})
					.then(function () {
						localStorage.setItem('user', JSON.stringify(user.displayName));
						$scope.$apply(() => {
							$location.path('/index');
						});
					})
					.catch(function (error) {
						console.log('Cập nhật Username thất bại: ', error);
						$scope.$apply(() => {
							$location.path('/register');
						});
					});
			})
			.catch(function (error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log('Đăng ký thất bại: ', errorMessage);
				Swal.fire({
					title: 'Alert',
					text: 'Failed!',
					icon: 'error',
					showConfirmButton: false,
					timer: 1500,
				});
			});
	};
});

app.controller('profile', function ($scope, $location) {
	(() => {
		firebase.auth().onAuthStateChanged(function (user) {
			$scope.$apply(function () {
				$scope.user = user;
			});
		});
	})();

	$scope.logout = function () {
		firebase
			.auth()
			.signOut()
			.then(
				() => {
					console.log('User logged out successfully.');
					Swal.fire({
						title: 'Alert',
						text: 'Logout success!',
						icon: 'success',
						showConfirmButton: false,
						timer: 1500,
					});

					setTimeout(function () {
						swal.close();
					}, 1000);

					$scope.$apply(() => {
						$location.path('/index');
					});
				},
				() => {
					swal({
						title: 'Alert',
						text: 'Error!',
						icon: 'error',
						button: false,
					});

					$scope.$apply(() => {
						$location.path('/register');
					});
				},
			);
	};
});
