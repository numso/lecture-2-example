angular.module('cs3450').controller('testCtrl',
  function ($scope) {
    $scope.name = "Bubba";

    $scope.changeName = function (name) {
      $scope.name = name + ' Jones';
    };

    $scope.user
  }
);
