angular.module('cs3450').controller('studentsCtrl',
  function ($scope, students) {
    students.get(function (data) {
      $scope.students = data;
    });

    $scope.predicate='aNumber';
  }
);
