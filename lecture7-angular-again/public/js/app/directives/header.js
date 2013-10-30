angular.module('cs3450').directive('header',
  function () {

    return {
      templateUrl: 'tmpl/header.html',
      controller: 'headerCtrl'
    };
  }
);
