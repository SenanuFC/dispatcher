'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$rootScope',function($scope, $rootScope) {
  $rootScope.dispatchers=[];

  $scope.save = function(obj){
    $rootScope.dispatchers.push(obj);
  }

}]);