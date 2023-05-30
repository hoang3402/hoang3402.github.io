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
            // controller: 'AnimeDetailsController',
        })
        .when('/anime/:animeId/episode/:id', {
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