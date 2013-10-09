var example = {
  title: "untitled map",
  author: "dosmun",
  width: 15,
  height: 15,
  x: 4,
  y: 4,
  data: {
    bottom: [
      [22,22,22,22,22,22,22,22,22,22,22,22,22,22,22],
      [22, 0, 8,16,22,22,22,22,22,22,22,22,22,22,22],
      [22, 1, 9, 8,16,22,22,22,22,22,22,22,22,22,22],
      [22, 1, 9, 9,17,22,22,22,22,22,22,22,22,22,22],
      [22, 2, 0, 9, 8,16,22,22,22,22,22,22,22,22,22],
      [22,22, 1, 9, 9, 8, 8,16,22,22,22,22,22,22,22],
      [22,22, 2, 4, 9, 9, 9, 8,16,22,22,22,22,22,22],
      [22,22,22, 2,10, 4, 9, 9, 8,16,22,22,22,22,22],
      [22,22,22,22,22, 2, 4, 9, 9,17,22,22,22,22,22],
      [22,22,22,22,22,22, 2, 4, 9,17,22,22,22,22,22],
      [22,22,22,22,22,22,22, 2,10,18,22,22,22,22,22],
      [22,22,22,22,22,22,22,22,22,22,22,22,22,22,22],
      [22,22,22,22,22,22,22,22,22,22,22,22,22,22,22],
      [22,22,22,22,22,22,22,22,22,22,22,22,22,22,22],
      [22,22,22,22,22,22,22,22,22,22,22,22,22,22,22]
    ],
    middle:[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
    top:[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
  },
  events: [],
  env: "normal"
};

for (var key in example) {
  var val = example[key];
  if (key == 'data' || key == 'events') {
    val = JSON.stringify(val);
  }

  var div = $('<div>').attr('id', key);

  div.append('<span>' + key + ':</span>')
  div.append('<input>');

  div.find('input').val(val);

  $('#inputs').append(div);
}

$('#submit').click(function() {
  var map = createMap();

  $.post('/upload', map, function (data) {
    $('#results').html(data.report);
    $('#results').append('<div>You can play your game <a target="_blank" href="' + data.url + '">here</a>.</div>');
  });
});

function createMap() {
  var obj = {};
  for (var key in example) {
    obj[key] = $('#' + key).find('input').val();

    if (key == 'data' || key == 'events') {
      obj[key] = JSON.parse(obj[key]);
    }
  }
  return obj;
}
