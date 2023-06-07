app.config(function ($routeProvider) {
	$routeProvider.when('/table/:name', {
		template: '<js-gird></js-gird>',
	});
	$routeProvider.otherwise({
		template: '<h1>Hello</h1>',
	});
});
