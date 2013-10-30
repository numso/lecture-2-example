angular.module('cs3450').controller('editCtrl',
  function ($scope) {
    students.get(function (data) {
      $scope.students = data;
    });
  }
);
