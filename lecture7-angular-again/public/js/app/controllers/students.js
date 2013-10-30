angular.module('cs3450').controller('studentsCtrl',
  function ($scope, students) {
    students.get(function (data) {
      $scope.students = data;
    });

    $scope.predicates = [
      { name: 'A Number', value: 'aNumber' },
      { name: 'Name', value: 'name' },
      { name: 'Age', value: 'age' },
      { name: 'Gender', value: 'gender' },
      { name: 'Email', value: 'email' },
      { name: 'Phone', value: 'phone' }
    ];

    $scope.predicate = $scope.predicates[0];
  }
);
