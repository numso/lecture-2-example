angular.module('cs3450', []);

angular.module('cs3450').config(
  function ($routeProvider) {

    $routeProvider.when('/', {
      controller: 'studentsCtrl',
      templateUrl: 'tmpl/students.html'
    });

    $routeProvider.when('/test', {
      controller: 'testCtrl',
      templateUrl: 'tmpl/test.html'
    });

  }
);
