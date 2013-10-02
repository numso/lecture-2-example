/* global $ */
'use strict';

function checkPage() {
  $.ajax('/user', {
    error: function () {
      window.location = '/login.html';
    },
    success: function (data) {
      if (data.success && data.user.isTeacher) {
        window.location = '/teacher.html';
      }
      else {
        $('.uname').text(data.user.user);
      }
    }
  });
}

function bindLogout() {
  $('.logout').click(function () {
    $.post('/logout', {}, function () {
      window.location = '/login.html';
    });
  });
}

function getHomeworks(cb) {
  $.get('/hw', function (data) {
    if (data.success) {
      for (var i = 0; i < data.hw.length; ++i) {
        addItem(data.hw[i]);
      }
      cb();
    }
  });
}

function addItem(hw) {
  $('.none').hide();

  var d = new Date(+hw.dueDate);
  d = d.toDateString();

  var hwString = '<div class="assignment no">';
  hwString += '<div class="cell">' + hw.name + '</div>';
  hwString += '<div class="cell">' + d + '</div>';
  hwString += '<div class="cell"><button id="mark' + hw.id + '"class="btn">Mark Finished</button></div>';
  hwString += '</div>';

  $('#assignments').append(hwString);

  $('#mark' + hw.id).click(function () {
    var completed = $(this).text() == 'Mark Finished';
    if (completed) {
      $(this).text('Mark Unfinished');
      $(this).closest('.assignment').removeClass('no').addClass('yes');
    }
    else {
      $(this).text('Mark Finished');
      $(this).closest('.assignment').removeClass('yes').addClass('no');
    }

    $.post('/grade', {
      id: hw.id,
      complete: completed
    });
  });
}

function getGrades() {
  $.get('/grades', function (data) {
    if (data.success) {
      console.log(data);
      for (var key in data.grades) {
        if (data.grades[key]) {
          $('#mark' + key).text('Mark Unfinished');
          $('#mark' + key).closest('.assignment').removeClass('no').addClass('yes');
        }
      }
    }
  });
}



$(function () {
  checkPage();
  bindLogout();
  getHomeworks(getGrades);
});
