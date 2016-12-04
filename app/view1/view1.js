'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$rootScope','$scope', function($rootScope, $scope) {
    console.log("View 1 controller activated")
    // $rootScope.products=[];

    $scope.save= function(obj){
      $rootScope.products.push(obj);
  }

}]);