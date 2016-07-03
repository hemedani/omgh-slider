(function () {
	'use strict';
	angular.module('barname.omghSlider', [])
		.directive('omghSlider', function ($interval, $log) {
			return {
				restrict: 'AE',
				replace: true,
				scope: {
					images: '='
				},
				link: function (scope, elem, attrs) {
					/*jshint validthis: true */
					var mn = this;

					scope.currentIndex = 0;
					var timer = $interval(function () {
						scope.changeImage();
					}, 8000);
					scope.next = function () {
						$interval.cancel(timer);
						scope.changeImage();
						timer = $interval(function () {
							scope.changeImage();
						}, 8000);
					};
					scope.changeImage = function () {
						// $log.debug('tick');
						// scope.currentIndex < scope.images.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
						if (scope.currentIndex < scope.images.length - 1) {
							scope.currentIndex++;
						} else {
							scope.currentIndex = 0;
						}
					};

					scope.prev = function () {
						// scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.images.length - 1;
						if (scope.currentIndex > 0) {
							scope.currentIndex--;
						} else {
							scope.currentIndex = scope.images.length - 1;
						}
					};

					scope.$watch('currentIndex', function () {
						scope.images.forEach(function (image) {
							image.visible = false; // make every image invisible
						});

						scope.images[scope.currentIndex].visible = true; // make the current image visible
					});

					scope.$on('$destroy', function () {
						$interval.cancel(timer); // when the scope is getting destroyed, cancel the timer
					});

				},
				templateUrl: 'barname/ghalebha/omghSlider.html'
			};
		});
}());
