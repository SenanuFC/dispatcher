'use strict';

angular.module('myApp.view0', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view0', {
    templateUrl: 'view0/view0.html',
    controller: 'view0Ctrl'
  });
}])

.controller('view0Ctrl', ['$rootScope','$scope', function($rootScope, $scope) {


}]);