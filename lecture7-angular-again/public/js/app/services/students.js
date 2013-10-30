angular.module('cs3450').factory('students',
  function ($http) {

    function get(cb) {
      $http.get('/students').then(function (resp) {
        cb(resp.data);
      });
    }

    function set(students) {
      $http.post('/students', students);
    }

    return {
      get: get,
      set: set
    };
  }
);
