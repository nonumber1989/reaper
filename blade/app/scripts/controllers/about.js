'use strict';

/**
 * @ngdoc function
 * @name bladeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the bladeApp
 */
angular.module('bladeApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
