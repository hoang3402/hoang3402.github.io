app.config(function ($routeProvider) {
	$routeProvider.when('/table/:name/:id', {
		template: '<edittable></edittable>',
	});
	$routeProvider.when('/table/:name', {
		template: '<datatable></datatable>',
	});
	$routeProvider.when('/create/:name', {
		template: '<create></create>',
	});
	$routeProvider.otherwise({
		template: '<h1>Hello</h1>',
	});
});
