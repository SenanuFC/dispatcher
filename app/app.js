'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.view3',
    'myApp.view4',
    'myApp.view5',
    'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/view1'});
}])
// .factory('ProductService', [function(){
//     var products=[];
//
//    factory.getProducts = function(){
//         return products;
//     }
//
//     function saveProducts(p){
//         products.push(p);
//     }
// }])

    .controller('appCtrl', function($rootScope, $scope, $location){
        console.log("App Ctrl Activated");
        $scope.selectedDispatcher={};
        $scope.selectedAssignments=[];
        //Local Storage
        $scope.save = function(key, value){
            localStorage.setItem(key, JSON.stringify(value));
        }

        $scope.load = function(key){
            // console.log(JSON.parse(localStorage.getItem(key)));
            return JSON.parse(localStorage.getItem(key));
        }

        //For emergencies
        $scope.clearMemory =function(){
            localStorage.clear();
        }

        //Load all data
        //Local Memory method though
        if($scope.load('products')!=null){
            $rootScope.products=$scope.load('products');
        }
        else {
            $rootScope.products = [];
        }

        if($scope.load('dispatchers')!=null){
            $rootScope.dispatchers=$scope.load('dispatchers');
        }
        else {
            $rootScope.dispatchers = [];
        }

        if($scope.load('assignedDispatches')!=null){
            $rootScope.assignedDispatches=$scope.load('assignedDispatches');
        }
        else {
            $rootScope.assignedDispatches = [];
        }


        //View Functions
        $scope.saveProduct= function(obj){
            var newObj = obj

            //Validation
            if(obj==undefined||obj.package==""||obj.date==null||obj.requester==""||obj.destination==""||obj.package==undefined||obj.date==undefined||obj.requester==undefined||obj.destination==undefined){
                alert("Please fill all fields");
            }
            else {
                //Time assigned
                newObj.time = Date.now();
                $rootScope.products.push(newObj);
                $scope.save('products', $rootScope.products);
                $rootScope.products = $scope.load('products');
                alert("Submitted Package");
                console.log("Save Product activated");
                // $location.path("/view3")
            }
        }

        $scope.saveDispatchers = function(obj){
            //Validation
            if(obj==undefined||obj.firstname==undefined||obj.lastname==undefined||obj.username==undefined||obj.password==undefined||obj.firstname==""||obj.lastname==""||obj.username==""||obj.password==""){
                console.log("Complete all fields");
                alert("Fill all fields");
            }
            else{
                if($scope.checkDuplicateDispatcher(obj.username)) {
                    $rootScope.dispatchers.push(obj);
                    $scope.save('dispatchers', $rootScope.dispatchers);
                    $rootScope.dispatchers = $scope.load('dispatchers');
                    alert("Dispatcher " + obj.firstname + " " + obj.lastname + " registered");
                }
                else{
                    alert("Username already exists");
                }
            }
        }

        $scope.assignDispatcher= function(product, dispatcher){
            //Assign to dispatcher
            console.log(dispatcher)
            var obj= {};
            obj.time= Date.now();
            obj.product= product;
            obj.dispatcher = JSON.parse(dispatcher);
            obj.status= "Assigned to " + obj.dispatcher.username;
            $rootScope.assignedDispatches.push(obj);
            $scope.save('assignedDispatches', $rootScope.assignedDispatches);
            $scope.deleteProduct(product);
            alert("Assigned to "+ obj.dispatcher.username);

        }

        $scope.deleteProduct = function(product){
            console.log("Trying to delete")
            for(var i=0; i < $rootScope.products.length; i++){
                if($rootScope.products[i].package==product.package){
                    $rootScope.products.splice(i, 1);
                    i = $rootScope.products.length-1;
                    $scope.save('products', $rootScope.products);
                }
            }
        }

        $scope.updateAssignment = function(a, status){
            console.log("Updating assignment");
            for(var i = 0; i < $rootScope.assignedDispatches.length; i++){
                if($rootScope.assignedDispatches[i].time == a.time){
                    $rootScope.assignedDispatches[i].status = status;
                    i = $rootScope.assignedDispatches.length-1;
                    $scope.save('assignedDispatches', $rootScope.assignedDispatches);
                    alert("Status Updated")
                }
            }


        }

        $scope.getDispatches =function(username, pwd) {

            var dispatcher = $scope.getDispatcher(username, pwd);
            console.log(dispatcher);
            if(dispatcher) {
                $scope.selectedDispatcher = dispatcher;
                $scope.selectedAssignments = [];
                console.log('Looking up' + dispatcher);
                for (var i = 0; i < $rootScope.assignedDispatches.length; i++) {
                    console.log($rootScope.assignedDispatches[i].dispatcher.username + " VS " + dispatcher.username)
                    if ($rootScope.assignedDispatches[i].dispatcher.username == dispatcher.username && $rootScope.assignedDispatches[i].status != "Delivered") {
                        $scope.selectedAssignments.push($rootScope.assignedDispatches[i]);
                        console.log("found one");
                    }
                }
                return $scope.selectedAssignments;
            }
            else{
                alert("incorrect credentials")
            }
        }

        $scope.getDispatcher = function(u, p){
            $scope.dispatcher={};
            var arr= $rootScope.dispatchers;
            for (var i = 0; i < $rootScope.dispatchers.length; i++){
                if(arr[i].username==u && arr[i].password==p ){
                    i= arr.length-1;
                    console.log("found user");
                    return arr[i];
                }
            }
            console.log("found nothing");
            return {};
        }

        $scope.checkDuplicateDispatcher = function(username){
            for (var i = 0; i < $rootScope.dispatchers.length; i++){
                if(arr[i].username==u ){
                    i= arr.length-1;
                    console.log("found user");
                    return true;
                }
            }
            return false;
        }

    });
