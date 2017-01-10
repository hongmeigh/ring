var HomeModule = angular.module('homeModule', []);

HomeModule.controller('homeCtrl', function ($scope, $rootScope, homeService) {
	$('[data-toggle="offcanvas"]').click(function () {
		$('.row-offcanvas').toggleClass('active');
	});
	
});