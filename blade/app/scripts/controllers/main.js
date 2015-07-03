'use strict';

/**
 * @ngdoc function
 * @name bladeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bladeApp
 */
angular.module('bladeApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
