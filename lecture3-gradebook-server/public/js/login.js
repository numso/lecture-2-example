/* global $ */
'use strict';

function redirectUser(user) {
  if (user.isTeacher) {
    window.location = '/teacher.html';
  }
  else {
    window.location = '/';
  }
}

function checkPage() {
  $.get('/user', function (data) {
    if (data.success) {
      redirectUser(data.user);
    }
  });
}

function bindClickHandlers() {
  $('#submit').click(function () {

    var user = {
      user: $('#user').val(),
      pass: $('#pass').val()
    };

    $.post('/login', user, function (data) {
      if (!data.success) {
        $('.error').text(data.err);
      }
      else {
        redirectUser(data.user);
      }
    });

    return false;
  });
}

$(function () {
  checkPage();
  bindClickHandlers();
});
