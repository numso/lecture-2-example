var SIZE = 40;
var NUM_TILES = 44;
var COLS = 8;
var SRC = 'img/bottom.png';

var selected = 0;
var selected2 = 0;

for (var i = 0; i < NUM_TILES; ++i) {
  addTile(i);
}

function addTile(i) {
  var tiles = $('#tiles');

  var tile = $('<div>');
  tile.attr('id', i);
  tile.addClass('tile');

  if (i === selected) {
    tile.addClass('selected');
  }

  var xOffset = -i % COLS * SIZE;
  var yOffset = -Math.floor(i / COLS) * SIZE;

  tile.css({
    width: SIZE + 'px',
    height: SIZE + 'px',
    background: 'url(' + SRC + ') ' + xOffset + ' ' + yOffset
  });

  tiles.append(tile);
}

$('.tile').mousedown(function (e) {
  if (e.which == 1)
    selected = +$(this).attr('id');
  if (e.which == 3)
    selected2 = +$(this).attr('id');

  $('.selected').removeClass('selected');
  $('#' + selected).addClass('selected');
  $('#' + selected2).addClass('selected');
});

$('.tile').contextmenu(function () {
  return false;
});

$('#grid').contextmenu(function () {
  return false;
});


var grid = $('#grid')[0].getContext('2d');
for (var i = 0; i < 8; ++i) {
  for (var j = 0; j < 8; ++j) {
    grid.strokeRect(i*SIZE, j*SIZE, SIZE, SIZE);
  }
}

var clicked = false;
var clicked2 = false;

var img = new Image();
img.onload = function () {
  $(document).mousedown(function (e) {
    if (e.which === 1) clicked = true;
    if (e.which === 3) clicked2 = true;
  });
  $(document).mouseup(function (e) {
    if (e.which === 1) clicked = false;
    if (e.which === 3) clicked2 = false;
  });
  $('#grid').mousemove(function (e) {
    var x = Math.floor(e.offsetX / SIZE);
    var y = Math.floor(e.offsetY / SIZE);

    if (clicked)
      drawPiece(selected, x, y);
    if (clicked2)
      drawPiece(selected2, x, y);
  });
};
img.src = SRC;

function drawPiece(id, x, y) {
  var ctx = $('#map')[0].getContext('2d');

  var xOffset = id % COLS * SIZE;
  var yOffset = Math.floor(id / COLS) * SIZE;

  ctx.drawImage(img, xOffset, yOffset, SIZE, SIZE, x * SIZE, y * SIZE, SIZE, SIZE);
}

var showGrid = true;
$('#toggle').click(function () {
  showGrid = !showGrid;

  var func = showGrid ? 'removeClass' : 'addClass';

  $('#grid')[func]('hidden');
});
