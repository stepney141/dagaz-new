QUnit.test( "King Moves", function( assert ) {
  var design = games.model.getDesign();
  var board = design.getInitBoard().copy();
  assert.equal( board.player , 1, "White move");
  board.clear();
  var white = design.createPiece(1, 1);
  board.setPiece(design.stringToPos("h2"), white);
  board.generate();
  assert.equal( board.moves.length, 7, "7 moves:");
  assert.equal( board.moves[0].toString(design) , "h2-g3", "h2-g3");
  assert.equal( board.moves[1].toString(design) , "h2-f4", "h2-f4");
  assert.equal( board.moves[2].toString(design) , "h2-e5", "h2-e5");
  assert.equal( board.moves[3].toString(design) , "h2-d6", "h2-d6");
  assert.equal( board.moves[4].toString(design) , "h2-c7", "h2-c7");
  assert.equal( board.moves[5].toString(design) , "h2-b8", "h2-b8");
  assert.equal( board.moves[6].toString(design) , "h2-g1", "h2-g1");
  board = board.apply(board.moves[3]);
  assert.equal( board.player , 2, "Black move");
  assert.ok( board.getPiece(design.stringToPos("h2")) === null, "h2 is empty");
  assert.ok( board.getPiece(design.stringToPos("f4")) === null, "f4 is empty");
  assert.ok( board.getPiece(design.stringToPos("e5")) === null, "e5 is empty");
  assert.equal( board.getPiece(design.stringToPos("d6")).toString(design) , "White King", "White King on d6");
});

QUnit.test( "King Capturing", function( assert ) {
  var design = games.model.getDesign();
  var board = design.getInitBoard().copy();
  assert.equal( board.player , 1, "White move");
  board.clear();
  var white = design.createPiece(1, 1);
  board.setPiece(design.stringToPos("h2"), white);
  var black = design.createPiece(0, 2);
  board.setPiece(design.stringToPos("f4"), black);
  board.generate();
  assert.equal( board.moves.length, 4, "4 moves:");
  assert.equal( board.moves[0].toString(design) , "h2-e5", "h2-e5");
  assert.equal( board.moves[1].toString(design) , "h2-d6", "h2-d6");
  assert.equal( board.moves[2].toString(design) , "h2-c7", "h2-c7");
  assert.equal( board.moves[3].toString(design) , "h2-b8", "h2-b8");
  board = board.apply(board.moves[2]);
  assert.equal( board.player , 2, "Black move");
  assert.ok( board.getPiece(design.stringToPos("h2")) === null, "h2 is empty");
  assert.ok( board.getPiece(design.stringToPos("g3")) === null, "g3 is empty");
  assert.ok( board.getPiece(design.stringToPos("f4")) === null, "f4 is empty");
  assert.ok( board.getPiece(design.stringToPos("e5")) === null, "e5 is empty");
  assert.ok( board.getPiece(design.stringToPos("d6")) === null, "d6 is empty");
  assert.equal( board.getPiece(design.stringToPos("c7")).toString(design) , "White King", "White King on c7");
});

QUnit.test( "Man Capturing", function( assert ) {
  var design = games.model.getDesign();
  var board = design.getInitBoard().copy();
  assert.equal( board.player , 1, "White move");
  board.clear();
  var white = design.createPiece(0, 1);
  board.setPiece(design.stringToPos("h2"), white);
  var black = design.createPiece(0, 2);
  board.setPiece(design.stringToPos("a7"), black);
  board.setPiece(design.stringToPos("b4"), black);
  board.setPiece(design.stringToPos("e5"), black);
  board.setPiece(design.stringToPos("e7"), black);
  board.setPiece(design.stringToPos("g3"), black);
  board.setPiece(design.stringToPos("g5"), black);
  board.setPiece(design.stringToPos("g7"), black);
  board.generate();
  assert.equal( board.moves.length, 7, "7 moves:");
  assert.equal( board.moves[0].toString(design) , "h2-f4-d6-f8-h6-f4", "h2-f4-d6-f8-h6-f4");
  assert.equal( board.moves[1].toString(design) , "h2-f4-d6-f8-h6-e3", "h2-f4-d6-f8-h6-e3");
  assert.equal( board.moves[2].toString(design) , "h2-f4-d6-f8-h6-c1", "h2-f4-d6-f8-h6-c1");
  assert.equal( board.moves[3].toString(design) , "h2-f4-h6-f8-d6-a3", "h2-f4-h6-f8-d6-a3");
  assert.equal( board.moves[4].toString(design) , "h2-f4-h6-f8-d6-f4", "h2-f4-h6-f8-d6-f4");
  assert.equal( board.moves[5].toString(design) , "h2-f4-h6-f8-c5-a3", "h2-f4-h6-f8-c5-a3");
  assert.equal( board.moves[6].toString(design) , "h2-f4-d6-f8-h6-d2-a5", "h2-f4-d6-f8-h6-d2-a5");
  board = board.apply(board.moves[6]);
  assert.equal( board.player , 2, "Black move");
  assert.ok( board.getPiece(design.stringToPos("h2")) === null, "h2 is empty");
  assert.ok( board.getPiece(design.stringToPos("g3")) === null, "g3 is empty");
  assert.ok( board.getPiece(design.stringToPos("f4")) === null, "f4 is empty");
  assert.ok( board.getPiece(design.stringToPos("e5")) === null, "e5 is empty");
  assert.ok( board.getPiece(design.stringToPos("d6")) === null, "d6 is empty");
  assert.ok( board.getPiece(design.stringToPos("e7")) === null, "e7 is empty");
  assert.ok( board.getPiece(design.stringToPos("f8")) === null, "f8 is empty");
  assert.ok( board.getPiece(design.stringToPos("g7")) === null, "g7 is empty");
  assert.ok( board.getPiece(design.stringToPos("h6")) === null, "h6 is empty");
  assert.ok( board.getPiece(design.stringToPos("g5")) === null, "g5 is empty");
  assert.ok( board.getPiece(design.stringToPos("e3")) === null, "e3 is empty");
  assert.ok( board.getPiece(design.stringToPos("d2")) === null, "d2 is empty");
  assert.ok( board.getPiece(design.stringToPos("c3")) === null, "c3 is empty");
  assert.ok( board.getPiece(design.stringToPos("b4")) === null, "b4 is empty");
  assert.equal( board.getPiece(design.stringToPos("a5")).toString(design) , "White King", "White King on a5");
  assert.equal( board.getPiece(design.stringToPos("a7")).toString(design) , "Black Man", "Black Man on a7");
});
