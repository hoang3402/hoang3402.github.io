const DOMAIN = 'https://hoang3409.alwaysdata.net/index.php';

export function CheckAuth($scope) {
	(() => {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				$scope.isLogin = true;
			} else {
				// Người dùng chưa đăng nhập
				console.log('User is logged out');
				$scope.isLogin = false;
			}
		});
	})();
}

export function GetListAnimeTrending($scope, $http) {
	$http({
		method: 'GET',
		url: `${DOMAIN}/Anime/GetListAnimeTrending/6`,
	}).then((res) => {
		$scope.list = res.data.slice(0, 6);
	});
}

export function GetListAnimePopular($scope, $http) {
	$http({
		method: 'GET',
		url: `${DOMAIN}/Anime/GetListAnimePopular`,
	}).then((res) => {
		$scope.list = res.data.slice(0, 6);
	});
}

export function GetGenres($scope, $http) {
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
}

export function BlogDetail($anchorScroll) {
	$anchorScroll();
}

export function AnimeDetailsController(
	$scope,
	$routeParams,
	$anchorScroll,
	$http,
	$rootScope,
) {
	$anchorScroll();
	$scope.id = $routeParams.animeId;
	$scope.showFullText = false;
	$scope.isFollow = false;

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

	$scope.checkFollow = function () {
		firebase.auth().onAuthStateChanged(function (user) {
			if (!user) {
				return;
			}
			$http({
				method: 'GET',
				url: `${DOMAIN}/Anime/IsFollowed/${user.uid}/${$routeParams.animeId}`,
			})
				.then(function (response) {
					if (response.data.mes === 'true') {
						$scope.isFollow = true;
					} else {
						$scope.isFollow = false;
					}
				})
				.catch(function (error) {
					console.log(error);
				});
		});
	};

	$scope.handleFollow = function () {
		const user = firebase.auth().currentUser;

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

		$http({
			method: 'POST',
			url: `${DOMAIN}/Anime/FollowAnime/${user.uid}/${$routeParams.animeId}`,
		})
			.then(function (response) {
				console.log(response.data);
				$scope.isFollow = true;
				$rootScope.Success();
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	$scope.handleUnFollow = function () {
		const user = firebase.auth().currentUser;
		$http({
			method: 'POST',
			url: `${DOMAIN}/Anime/UnFollowAnime/${user.uid}/${$routeParams.animeId}`,
		})
			.then(function (response) {
				console.log(response.data);
				$scope.isFollow = false;
				$rootScope.Success();
			})
			.catch(function (error) {
				console.error(error);
			});
	};
}

export function AnimeWatchingController(
	$scope,
	$routeParams,
	$anchorScroll,
	$http,
) {
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
}

export function CategoryController($scope, $routeParams, $anchorScroll, $http) {
	$anchorScroll();
	$http({
		method: 'GET',
		url: `${DOMAIN}/Anime/GetMoviesByCategory/${$routeParams.id}/18`,
	}).then((res) => {
		$scope.data = res.data;
		console.log(`$scope.data:`, $scope.data);
		$scope.categoryName = res.data[0].name;
	});
}

export function HeroSliderController($scope, $http) {
	$http({
		method: 'GET',
		url: `${DOMAIN}/Anime/GetListAnimeTrending/3`,
	}).then((res) => {
		$scope.data = res.data;
	});
}

export function login($scope, $location, $rootScope) {
	$scope.login = function () {
		var email = $scope.email;
		var password = $scope.password;

		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(function (userCredential) {
				var user = userCredential.user;
				localStorage.setItem('user', JSON.stringify(user.displayName));

				$rootScope.Success();

				$scope.$apply(() => {
					$location.path('/index');
				});
			})
			.catch(function (error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(`code: ${errorCode}, message: ${errorMessage}`);

				$rootScope.Failed();

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

				$rootScope.Success();

				$scope.$apply(() => {
					$location.path('/index');
				});
			})
			.catch(function (error) {
				$rootScope.Failed();
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

				$rootScope.Success();

				$scope.$apply(() => {
					$location.path('/index');
				});
			})
			.catch(function (error) {
				$rootScope.Failed();
				$scope.$apply(() => {
					$location.path('/login');
				});
			});
	};
}

export function register($scope, $location, $rootScope) {
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
						$rootScope.Success();
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
				console.log(error.message);
				var errorMessage = error.message;
				errorMessage = errorMessage.replace('Firebase: ', '');
				Swal.fire({
					title: 'Alert',
					text: errorMessage,
					icon: 'error',
					showConfirmButton: true,
				});
			});
	};
}

export function profile($scope, $location, $rootScope) {
	(() => {
		firebase.auth().onAuthStateChanged(function (user) {
			$scope.$apply(function () {
				$scope.user = user;
			});
			if (!user) return;
			var databaseRef = firebase.database().ref('users');

			databaseRef
				.child(user.uid)
				.child('role')
				.once('value', function (snapshot) {
					var role = snapshot.val();
					if (role === 'Admin') {
						$scope.$apply(function () {
							$scope.isAdmin = true;
						});
					}
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
					$rootScope.Success();

					$scope.$apply(() => {
						$location.path('/index');
					});
				},
				() => {
					$rootScope.Failed();

					$scope.$apply(() => {
						$location.path('/register');
					});
				},
			);
	};
}

export function comments($http, $scope, $routeParams) {
	$scope.id = $routeParams.animeId;
	console.log(`Running comments for ${$scope.id}`);

	$http({
		method: 'GET',
		url: `${DOMAIN}/Anime/GetCommentsByAnime/${$scope.id}`,
	}).then((res) => {
		$scope.data = res.data;
		console.log(`$scope.data:`, $scope.data);
	});

	$scope.handleCreateComment = function () {
		const user = firebase.auth().currentUser;

		if (!user) {
			console.log('User not logged in');
			Swal.fire({
				title: 'Alert',
				text: 'You must login to comment!',
				icon: 'error',
				showConfirmButton: true,
			});
			return;
		}
		var username = user.displayName;
		var comment = $('#comment_new').val();

		var data = {
			anime_id: $scope.id,
			comment_text: comment,
			user_name: username,
		};

		var urlEncodedData = $.param(data);

		$http({
			method: 'POST',
			url: `${DOMAIN}/Anime/CreateComments`,
			data: urlEncodedData,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
			.then(function (response) {
				console.log(response.data);
				$('#comment_new').val('');
				$scope.data.push(response.data);
			})
			.catch(function (error) {
				console.error(error);
			});
	};
}
