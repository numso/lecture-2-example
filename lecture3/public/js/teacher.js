/* global $ */
'use strict';

function checkPage() {
  $.ajax('/user', {
    error: function () {
      window.location = '/login.html';
    },
    success: function (data) {
      if (data.success && !data.user.isTeacher) {
        window.location = '/';
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

function getHomeworks() {
  $.get('/hw', function (data) {
    if (data.success) {
      for (var i = 0; i < data.hw.length; ++i) {
        addItem(data.hw[i]);
      }
    }
  });
}

function addItem(hw) {
  $('.none').hide();

  var d = new Date(+hw.dueDate);
  d = d.toDateString();

  var hwString = '<div id="hw' + hw.id + '" class="assignment">';
  hwString += '<div class="cell">' + hw.name + '</div>';
  hwString += '<div class="cell">' + d + '</div>';
  hwString += '<div class="cell"><button id="delete' + hw.id + '"class="btn">Delete</button></div>';
  hwString += '</div>';

  $('#assignments').append(hwString);

  $('#delete' + hw.id).click(function () {
    $.ajax('/hw',{
      data: { id: hw.id },
      success: function (data) {
        if (data.success) {
          $('#hw' + hw.id).remove();
        }
      },
      type: 'DELETE'
    });
  });
}

function bindButton() {
  $('#add').click(function () {

    var date = $('#date').prop('valueAsNumber') + 86400000;

    var hw = {
      name: $('#name').val(),
      dueDate: date
    };

    $.post('/hw', hw, function (data) {
      if (data.success) {
        hw.id = data.id;
        addItem(hw);
      }
    });
    return false;
  });
}

$(function () {
  checkPage();
  bindLogout();
  getHomeworks();
  bindButton();
});
