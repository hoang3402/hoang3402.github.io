app.config(function ($routeProvider) {
	$routeProvider.when('/login', {
		templateUrl: '../views/login.html',
		controller: '',
	});

	$routeProvider.when('/signup', {
		templateUrl: '../views/signup.html',
		controller: '',
	});

	$routeProvider.when('/blog', {
		templateUrl: '../views/blog.html',
	});

	$routeProvider.when('/categories', {
		templateUrl: '../views/categories.html',
	});

	$routeProvider.when('/anime-details/:id', {
		templateUrl: '../views/anime-details.html',
	});

	$routeProvider.when('/anime/:animeId/episode/:id', {
		templateUrl: '../views/anime-watching.html',
	});

	$routeProvider.when('/blog-details', {
		templateUrl: '../views/blog-details.html',
		controller: 'BlogDetail',
	});

	$routeProvider.otherwise({
		template: '<hero-slider></hero-slider> <product-section></product-section>',
	});
});
