
var app = angular.module('myApp', []);

app.controller('myCtrl', ['$scope', function($scope) {

  $scope.allItems = [];
  $scope.doneItems = [];
  $scope.waitingItems = [];

  $scope.addTask = function() {
    var item = {
        task: $scope.task,
        check: false
      };
    $scope.allItems.push(item);
    $scope.waitingItems.push(item);
    $scope.task = '';
  };

  $scope.updateLists = function(item) {
    if(item.check) {
      $scope.deleteFromWaitingList(item);
      $scope.doneItems.push(item);
    }else {
      $scope.deleteFromDoneList(item);
      $scope.waitingItems.push(item);
    }
  };

  $scope.deleteFromWaitingList = function(item) {
    $scope.waitingItems = $scope.waitingItems.filter(function(el) {
      return el.task !== item.task;
    });
  };

  $scope.deleteFromDoneList = function(item) {
    $scope.doneItems = $scope.doneItems.filter(function(el) {
      return el.task !== item.task;
    });
  };
 }]);

 app.directive('checkboxList', function() {
   return {
     scope: {
       items: '=itemsList',
       update: '=updateFct'
     },
     restrict: 'E',
     template: '<div ng-repeat="item in items">' +
               '<input type="checkbox" name="checkbox"' +
               'ng-model="item.check"' +
               'ng-click="update(item)">' +
               '<label> {{item.task}} </label></div>',
   };
 });
