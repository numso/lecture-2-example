angular.module('cs3450', []);

angular.module('cs3450').config(
  function ($routeProvider) {

    for (var i = 0; i < nav.length; ++i) {
      $routeProvider.when(nav[i].url, {
        controller: nav[i].ctrl,
        templateUrl: nav[i].tmpl
      });
    }
  }
);
