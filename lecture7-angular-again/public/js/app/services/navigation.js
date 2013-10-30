var nav = [
  {
    name: 'All Students',
    url: '/',
    ctrl: 'studentsCtrl',
    tmpl: 'tmpl/students.html'
  },
  {
    name: 'Edit Student',
    url: '/edit',
    ctrl: 'editCtrl',
    tmpl: 'tmpl/edit.html'
  },
  {
    name: 'Test',
    url: '/test',
    ctrl: 'testCtrl',
    tmpl: 'tmpl/test.html'
  }
];

angular.module('cs3450').factory('nav',
  function () {
    return nav;
  }
);
