var App = angular.module('app', [
  'ngRoute',
  'ngResource',
  'ngAnimate',
  'homeModule',
  'detailModule',
  'listModule'
]);


App.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
		.when('/detail/:Id', {
			templateUrl: 'views/detail.html',
			controller: 'detailCtrl'
		})
		.when('/home', {
      templateUrl: 'views/home.html',
      controller: 'homeCtrl'
    })
    .when('/list/:Id', {
      templateUrl: 'views/list.html',
      controller: 'listCtrl'
    })
		.otherwise({
	    redirectTo: '/home'
		});
}]);

