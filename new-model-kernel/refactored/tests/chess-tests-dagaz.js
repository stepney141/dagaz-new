QUnit.test( "Initial Board", function( assert ) {
  var design = games.model.getDesign();
  var board = design.getInitBoard();
  assert.equal( board.player, 1, "White move");
  board.generate();
  assert.equal( board.moves.length , 20, "20 moves:");
  assert.equal( board.moves[0].toString(design) , "a2-a3", "a2-a3");
  assert.equal( board.moves[1].toString(design) , "a2-a4", "a2-a4");
  assert.equal( board.moves[2].toString(design) , "b2-b3", "b2-b3");
  assert.equal( board.moves[3].toString(design) , "b2-b4", "b2-b4");
  assert.equal( board.moves[4].toString(design) , "c2-c3", "c2-c3");
  assert.equal( board.moves[5].toString(design) , "c2-c4", "c2-c4");
  assert.equal( board.moves[6].toString(design) , "d2-d3", "d2-d3");
  assert.equal( board.moves[7].toString(design) , "d2-d4", "d2-d4");
  assert.equal( board.moves[8].toString(design) , "e2-e3", "e2-e3");
  assert.equal( board.moves[9].toString(design) , "e2-e4", "e2-e4");
  assert.equal( board.moves[10].toString(design) , "f2-f3", "f2-f3");
  assert.equal( board.moves[11].toString(design) , "f2-f4", "f2-f4");
  assert.equal( board.moves[12].toString(design) , "g2-g3", "g2-g3");
  assert.equal( board.moves[13].toString(design) , "g2-g4", "g2-g4");
  assert.equal( board.moves[14].toString(design) , "h2-h3", "h2-h3");
  assert.equal( board.moves[15].toString(design) , "h2-h4", "h2-h4");
  assert.equal( board.moves[16].toString(design) , "b1-a3", "b1-a3");
  assert.equal( board.moves[17].toString(design) , "b1-c3", "b1-c3");
  assert.equal( board.moves[18].toString(design) , "g1-f3", "g1-f3");
  assert.equal( board.moves[19].toString(design) , "g1-h3", "g1-h3");
});

QUnit.test( "En Passant", function( assert ) {
  var design = games.model.getDesign();
  var board = design.getInitBoard();
  board.clear();
  assert.equal( board.player, 1, "White move");
  var white = design.createPiece(0, 1);
  board.setPiece(design.stringToPos("c4"), white);
  board.setPiece(design.stringToPos("e2"), white);
  board.setPiece(design.stringToPos("g2"), white);
  var black = design.createPiece(0, 2);
  board.setPiece(design.stringToPos("d4"), black);
  board.setPiece(design.stringToPos("f4"), black);
  board.generate();
  assert.equal( board.moves.length , 5, "5 moves:");
  assert.equal( board.moves[0].toString(design) , "c4-c5", "c4-c5");
  assert.equal( board.moves[1].toString(design) , "e2-e3", "e2-e3");
  assert.equal( board.moves[2].toString(design) , "e2-e4", "e2-e4");
  assert.equal( board.moves[3].toString(design) , "g2-g3", "g2-g3");
  assert.equal( board.moves[4].toString(design) , "g2-g4", "g2-g4");
  board = board.apply(board.moves[2]);
  assert.equal( design.posToString(board.lastFrom) , "e2", "Last from position: e2");
  assert.equal( board.player, 2, "Black move");
  board.generate();
  assert.equal( board.moves.length , 4, "4 moves:");
  assert.equal( board.moves[0].toString(design) , "d4-d3", "d4-d3");
  assert.equal( board.moves[1].toString(design) , "d4-e3", "d4-e3");
  assert.equal( board.moves[2].toString(design) , "f4-f3", "f4-f3");
  assert.equal( board.moves[3].toString(design) , "f4-e3", "f4-e3");
  board = board.apply(board.moves[1]);
  assert.equal( board.player, 1, "White move");
  assert.ok( board.getPiece(design.stringToPos("d4")) === null, "d4 is empty");
  assert.ok( board.getPiece(design.stringToPos("e4")) === null, "e4 is empty");
  assert.ok( board.getPiece(design.stringToPos("e2")) === null, "e2 is empty");
  assert.equal( board.getPiece(design.stringToPos("e3")).toString(design) , "Black Pawn", "Black Pawn on e3");
  board.generate();
  assert.equal( board.moves.length , 3, "3 moves:");
  assert.equal( board.moves[0].toString(design) , "c4-c5", "c4-c5");
  assert.equal( board.moves[1].toString(design) , "g2-g3", "g2-g3");
  assert.equal( board.moves[2].toString(design) , "g2-g4", "g2-g4");
  board = board.apply(board.moves[1]);
  assert.equal( board.player, 2, "Black move");
  board.generate();
  assert.equal( board.moves.length , 3, "3 moves:");
  assert.equal( board.moves[0].toString(design) , "f4-f3", "f4-f3");
  assert.equal( board.moves[1].toString(design) , "f4-g3", "f4-g3");
  assert.equal( board.moves[2].toString(design) , "e3-e2", "e3-e2");
  board = board.apply(board.moves[1]);
  assert.equal( board.player, 1, "White move");
  assert.ok( board.getPiece(design.stringToPos("f4")) === null, "f4 is empty");
  assert.equal( board.getPiece(design.stringToPos("g3")).toString(design) , "Black Pawn", "Black Pawn on g3");
  board.generate();
  assert.equal( board.moves.length , 1, "1 move:");
  assert.equal( board.moves[0].toString(design) , "c4-c5", "c4-c5");
});

QUnit.test( "Castling", function( assert ) {
  var design = games.model.getDesign();
  var board = design.getInitBoard();
  board.clear();
  assert.equal( board.player, 1, "White move");
  var whitePawn = design.createPiece(0, 1);
  board.setPiece(design.stringToPos("a2"), whitePawn);
  board.setPiece(design.stringToPos("b2"), whitePawn);
  board.setPiece(design.stringToPos("c2"), whitePawn);
  board.setPiece(design.stringToPos("d2"), whitePawn);
  board.setPiece(design.stringToPos("e2"), whitePawn);
  board.setPiece(design.stringToPos("f2"), whitePawn);
  board.setPiece(design.stringToPos("g2"), whitePawn);
  board.setPiece(design.stringToPos("h2"), whitePawn);
  var whiteKing = design.createPiece(5, 1);
  board.setPiece(design.stringToPos("e1"), whiteKing);
  var whiteRook = design.createPiece(1, 1);
  board.setPiece(design.stringToPos("a1"), whiteRook);
  board.setPiece(design.stringToPos("h1"), whiteRook);
  var blackPawn = design.createPiece(0, 2);
  board.setPiece(design.stringToPos("a7"), blackPawn);
  board.setPiece(design.stringToPos("b7"), blackPawn);
  board.setPiece(design.stringToPos("c7"), blackPawn);
  board.setPiece(design.stringToPos("d7"), blackPawn);
  board.setPiece(design.stringToPos("e7"), blackPawn);
  board.setPiece(design.stringToPos("f7"), blackPawn);
  board.setPiece(design.stringToPos("g7"), blackPawn);
  board.setPiece(design.stringToPos("h7"), blackPawn);
  var blackKing = design.createPiece(5, 2);
  board.setPiece(design.stringToPos("e8"), blackKing);
  var blackRook = design.createPiece(1, 2);
  board.setPiece(design.stringToPos("a8"), blackRook);
  board.setPiece(design.stringToPos("h8"), blackRook);
  board.generate();
  assert.equal( board.moves.length , 25, "25 moves:");
  assert.equal( board.moves[0].toString(design) , "a2-a3", "a2-a3");
  assert.equal( board.moves[1].toString(design) , "a2-a4", "a2-a4");
  assert.equal( board.moves[2].toString(design) , "b2-b3", "b2-b3");
  assert.equal( board.moves[3].toString(design) , "b2-b4", "b2-b4");
  assert.equal( board.moves[4].toString(design) , "c2-c3", "c2-c3");
  assert.equal( board.moves[5].toString(design) , "c2-c4", "c2-c4");
  assert.equal( board.moves[6].toString(design) , "d2-d3", "d2-d3");
  assert.equal( board.moves[7].toString(design) , "d2-d4", "d2-d4");
  assert.equal( board.moves[8].toString(design) , "e2-e3", "e2-e3");
  assert.equal( board.moves[9].toString(design) , "e2-e4", "e2-e4");
  assert.equal( board.moves[10].toString(design) , "f2-f3", "f2-f3");
  assert.equal( board.moves[11].toString(design) , "f2-f4", "f2-f4");
  assert.equal( board.moves[12].toString(design) , "g2-g3", "g2-g3");
  assert.equal( board.moves[13].toString(design) , "g2-g4", "g2-g4");
  assert.equal( board.moves[14].toString(design) , "h2-h3", "h2-h3");
  assert.equal( board.moves[15].toString(design) , "h2-h4", "h2-h4");
  assert.equal( board.moves[16].toString(design) , "a1-b1", "a1-b1");
  assert.equal( board.moves[17].toString(design) , "a1-c1", "a1-c1");
  assert.equal( board.moves[18].toString(design) , "a1-d1", "a1-d1");
  assert.equal( board.moves[19].toString(design) , "e1-d1", "e1-d1");
  assert.equal( board.moves[20].toString(design) , "e1-f1", "e1-f1");
  assert.equal( board.moves[21].toString(design) , "e1-g1 h1-f1", "e1-g1 h1-f1");
  assert.equal( board.moves[22].toString(design) , "e1-c1 a1-d1", "e1-c1 a1-d1");
  assert.equal( board.moves[23].toString(design) , "h1-g1", "h1-g1");
  assert.equal( board.moves[24].toString(design) , "h1-f1", "h1-f1");
  board = board.apply(board.moves[21]);
  assert.equal( board.player, 2, "Black move");
  assert.ok( board.getPiece(design.stringToPos("e1")) === null, "e1 is empty");
  assert.ok( board.getPiece(design.stringToPos("h1")) === null, "h1 is empty");
  assert.equal( board.getPiece(design.stringToPos("g1")).toString(design) , "White King", "White King on g1");
  assert.equal( board.getPiece(design.stringToPos("f1")).toString(design) , "White Rook", "White Rook on f1");
  board.generate();
  assert.equal( board.moves.length , 25, "25 moves:");
  assert.equal( board.moves[0].toString(design) , "a8-b8", "a8-b8");
  assert.equal( board.moves[1].toString(design) , "a8-c8", "a8-c8");
  assert.equal( board.moves[2].toString(design) , "a8-d8", "a8-d8");
  assert.equal( board.moves[3].toString(design) , "e8-d8", "e8-d8");
  assert.equal( board.moves[4].toString(design) , "e8-f8", "e8-f8");
  assert.equal( board.moves[5].toString(design) , "e8-g8 h8-f8", "e8-g8 h8-f8");
  assert.equal( board.moves[6].toString(design) , "e8-c8 a8-d8", "e8-c8 a8-d8");
  assert.equal( board.moves[7].toString(design) , "h8-g8", "h8-g8");
  assert.equal( board.moves[8].toString(design) , "h8-f8", "h8-f8");
  assert.equal( board.moves[9].toString(design) , "a7-a6", "a7-a6");
  assert.equal( board.moves[10].toString(design) , "a7-a5", "a7-a5");
  assert.equal( board.moves[11].toString(design) , "b7-b6", "b7-b6");
  assert.equal( board.moves[12].toString(design) , "b7-b5", "b7-b5");
  assert.equal( board.moves[13].toString(design) , "c7-c6", "c7-c6");
  assert.equal( board.moves[14].toString(design) , "c7-c5", "c7-c5");
  assert.equal( board.moves[15].toString(design) , "d7-d6", "d7-d6");
  assert.equal( board.moves[16].toString(design) , "d7-d5", "d7-d5");
  assert.equal( board.moves[17].toString(design) , "e7-e6", "e7-e6");
  assert.equal( board.moves[18].toString(design) , "e7-e5", "e7-e5");
  assert.equal( board.moves[19].toString(design) , "f7-f6", "f7-f6");
  assert.equal( board.moves[20].toString(design) , "f7-f5", "f7-f5");
  assert.equal( board.moves[21].toString(design) , "g7-g6", "g7-g6");
  assert.equal( board.moves[22].toString(design) , "g7-g5", "g7-g5");
  assert.equal( board.moves[23].toString(design) , "h7-h6", "h7-h6");
  assert.equal( board.moves[24].toString(design) , "h7-h5", "h7-h5");
  board = board.apply(board.moves[6]);
  assert.equal( board.player, 1, "White move");
  assert.ok( board.getPiece(design.stringToPos("e8")) === null, "e8 is empty");
  assert.ok( board.getPiece(design.stringToPos("a8")) === null, "a8 is empty");
  assert.equal( board.getPiece(design.stringToPos("c8")).toString(design) , "Black King", "Black King on c8");
  assert.equal( board.getPiece(design.stringToPos("d8")).toString(design) , "Black Rook", "Black Rook on d8");
});

QUnit.test( "Stalemate", function( assert ) {
  var design = games.model.getDesign();
  var board = design.getInitBoard();
  board.clear();
  assert.equal( board.player, 1, "White move");
  var whiteKing = design.createPiece(5, 1);
  board.setPiece(design.stringToPos("e1"), whiteKing);
  var whiteQueen = design.createPiece(4, 1);
  board.setPiece(design.stringToPos("d1"), whiteQueen);
  var blackKing = design.createPiece(5, 2);
  board.setPiece(design.stringToPos("b8"), blackKing);
  assert.ok( games.model.getGoal(board, board.player) === null, "No goal");
  board.generate();
  assert.equal( board.moves.length , 21, "21 moves:");
  assert.equal( board.moves[0].toString(design) , "d1-d2", "d1-d2");
  assert.equal( board.moves[1].toString(design) , "d1-d3", "d1-d3");
  assert.equal( board.moves[2].toString(design) , "d1-d4", "d1-d4");
  assert.equal( board.moves[3].toString(design) , "d1-d5", "d1-d5");
  assert.equal( board.moves[4].toString(design) , "d1-d6", "d1-d6");
  assert.equal( board.moves[5].toString(design) , "d1-d7", "d1-d7");
  assert.equal( board.moves[6].toString(design) , "d1-d8", "d1-d8");
  assert.equal( board.moves[7].toString(design) , "d1-c1", "d1-c1");
  assert.equal( board.moves[8].toString(design) , "d1-b1", "d1-b1");
  assert.equal( board.moves[9].toString(design) , "d1-a1", "d1-a1");
  assert.equal( board.moves[10].toString(design) , "d1-c2", "d1-c2");
  assert.equal( board.moves[11].toString(design) , "d1-b3", "d1-b3");
  assert.equal( board.moves[12].toString(design) , "d1-a4", "d1-a4");
  assert.equal( board.moves[13].toString(design) , "d1-e2", "d1-e2");
  assert.equal( board.moves[14].toString(design) , "d1-f3", "d1-f3");
  assert.equal( board.moves[15].toString(design) , "d1-g4", "d1-g4");
  assert.equal( board.moves[16].toString(design) , "d1-h5", "d1-h5");
  assert.equal( board.moves[17].toString(design) , "e1-e2", "e1-e2");
  assert.equal( board.moves[18].toString(design) , "e1-f1", "e1-f1");
  assert.equal( board.moves[19].toString(design) , "e1-d2", "e1-d2");
  assert.equal( board.moves[20].toString(design) , "e1-f2", "e1-f2");
  board = board.apply(board.moves[11]);
  assert.equal( board.player, 2, "Black move");
  assert.ok( games.model.getGoal(board, board.player) === null, "No goal");
  board.generate();
  assert.equal( board.moves.length , 4, "4 moves:");
  assert.equal( board.moves[0].toString(design) , "b8-a8", "b8-a8");
  assert.equal( board.moves[1].toString(design) , "b8-c8", "b8-c8");
  assert.equal( board.moves[2].toString(design) , "b8-a7", "b8-a7");
  assert.equal( board.moves[3].toString(design) , "b8-c7", "b8-c7");
  board = board.apply(board.moves[0]);
  assert.equal( board.player, 1, "White move");
  assert.ok( games.model.getGoal(board, board.player) === null, "No goal");
  board.generate();
  assert.equal( board.moves.length , 28, "28 moves:");
  assert.equal( board.moves[0].toString(design) , "b3-b4", "b3-b4");
  assert.equal( board.moves[1].toString(design) , "b3-b5", "b3-b5");
  assert.equal( board.moves[2].toString(design) , "b3-b6", "b3-b6");
  assert.equal( board.moves[3].toString(design) , "b3-b7", "b3-b7");
  assert.equal( board.moves[4].toString(design) , "b3-b8", "b3-b8");
  assert.equal( board.moves[5].toString(design) , "b3-b2", "b3-b2");
  assert.equal( board.moves[6].toString(design) , "b3-b1", "b3-b1");
  assert.equal( board.moves[7].toString(design) , "b3-a3", "b3-a3");
  assert.equal( board.moves[8].toString(design) , "b3-c3", "b3-c3");
  assert.equal( board.moves[9].toString(design) , "b3-d3", "b3-d3");
  assert.equal( board.moves[10].toString(design) , "b3-e3", "b3-e3");
  assert.equal( board.moves[11].toString(design) , "b3-f3", "b3-f3");
  assert.equal( board.moves[12].toString(design) , "b3-g3", "b3-g3");
  assert.equal( board.moves[13].toString(design) , "b3-h3", "b3-h3");
  assert.equal( board.moves[14].toString(design) , "b3-a4", "b3-a4");
  assert.equal( board.moves[15].toString(design) , "b3-a2", "b3-a2");
  assert.equal( board.moves[16].toString(design) , "b3-c4", "b3-c4");
  assert.equal( board.moves[17].toString(design) , "b3-d5", "b3-d5");
  assert.equal( board.moves[18].toString(design) , "b3-e6", "b3-e6");
  assert.equal( board.moves[19].toString(design) , "b3-f7", "b3-f7");
  assert.equal( board.moves[20].toString(design) , "b3-g8", "b3-g8");
  assert.equal( board.moves[21].toString(design) , "b3-c2", "b3-c2");
  assert.equal( board.moves[22].toString(design) , "b3-d1", "b3-d1");
  assert.equal( board.moves[23].toString(design) , "e1-e2", "e1-e2");
  assert.equal( board.moves[24].toString(design) , "e1-d1", "e1-d1");
  assert.equal( board.moves[25].toString(design) , "e1-f1", "e1-f1");
  assert.equal( board.moves[26].toString(design) , "e1-d2", "e1-d2");
  assert.equal( board.moves[27].toString(design) , "e1-f2", "e1-f2");
  board = board.apply(board.moves[2]);
  assert.equal( board.player, 2, "Black move");
  assert.equal( games.model.getGoal(board, 1) , 0, "Draw");
  board.generate();
  assert.equal( board.moves.length , 0, "0 moves:");
});

QUnit.test( "Checkmate", function( assert ) {
  var design = games.model.getDesign();
  var board = design.getInitBoard();
  board.clear();
  assert.equal( board.player, 1, "White move");
  var whiteKing = design.createPiece(5, 1);
  board.setPiece(design.stringToPos("e1"), whiteKing);
  var whiteRook = design.createPiece(1, 1);
  board.setPiece(design.stringToPos("a1"), whiteRook);
  board.setPiece(design.stringToPos("h1"), whiteRook);
  var blackKing = design.createPiece(5, 2);
  board.setPiece(design.stringToPos("e8"), blackKing);
  assert.ok( games.model.getGoal(board, board.player) === null, "No goal");
  board.generate();
  assert.equal( board.moves.length , 26, "26 moves:");
  assert.equal( board.moves[0].toString(design) , "a1-a2", "a1-a2");
  assert.equal( board.moves[1].toString(design) , "a1-a3", "a1-a3");
  assert.equal( board.moves[2].toString(design) , "a1-a4", "a1-a4");
  assert.equal( board.moves[3].toString(design) , "a1-a5", "a1-a5");
  assert.equal( board.moves[4].toString(design) , "a1-a6", "a1-a6");
  assert.equal( board.moves[5].toString(design) , "a1-a7", "a1-a7");
  assert.equal( board.moves[6].toString(design) , "a1-a8", "a1-a8");
  assert.equal( board.moves[7].toString(design) , "a1-b1", "a1-b1");
  assert.equal( board.moves[8].toString(design) , "a1-c1", "a1-c1");
  assert.equal( board.moves[9].toString(design) , "a1-d1", "a1-d1");
  assert.equal( board.moves[10].toString(design) , "e1-e2", "e1-e2");
  assert.equal( board.moves[11].toString(design) , "e1-d1", "e1-d1");
  assert.equal( board.moves[12].toString(design) , "e1-f1", "e1-f1");
  assert.equal( board.moves[13].toString(design) , "e1-d2", "e1-d2");
  assert.equal( board.moves[14].toString(design) , "e1-f2", "e1-f2");
  assert.equal( board.moves[15].toString(design) , "e1-g1 h1-f1", "e1-g1 h1-f1");
  assert.equal( board.moves[16].toString(design) , "e1-c1 a1-d1", "e1-c1 a1-d1");
  assert.equal( board.moves[17].toString(design) , "h1-h2", "h1-h2");
  assert.equal( board.moves[18].toString(design) , "h1-h3", "h1-h3");
  assert.equal( board.moves[19].toString(design) , "h1-h4", "h1-h4");
  assert.equal( board.moves[20].toString(design) , "h1-h5", "h1-h5");
  assert.equal( board.moves[21].toString(design) , "h1-h6", "h1-h6");
  assert.equal( board.moves[22].toString(design) , "h1-h7", "h1-h7");
  assert.equal( board.moves[23].toString(design) , "h1-h8", "h1-h8");
  assert.equal( board.moves[24].toString(design) , "h1-g1", "h1-g1");
  assert.equal( board.moves[25].toString(design) , "h1-f1", "h1-f1");
  board = board.apply(board.moves[5]);
  assert.equal( board.player, 2, "Black move");
  assert.ok( games.model.getGoal(board, board.player) === null, "No goal");
  board.generate();
  assert.equal( board.moves.length , 2, "2 moves:");
  assert.equal( board.moves[0].toString(design) , "e8-d8", "e8-d8");
  assert.equal( board.moves[1].toString(design) , "e8-f8", "e8-f8");
  board = board.apply(board.moves[1]);
  assert.equal( board.player, 1, "White move");
  assert.ok( games.model.getGoal(board, board.player) === null, "No goal");
  board.generate();
  assert.equal( board.moves.length , 29, "29 moves:");
  assert.equal( board.moves[0].toString(design) , "a7-a8", "a7-a8");
  assert.equal( board.moves[1].toString(design) , "a7-a6", "a7-a6");
  assert.equal( board.moves[2].toString(design) , "a7-a5", "a7-a5");
  assert.equal( board.moves[3].toString(design) , "a7-a4", "a7-a4");
  assert.equal( board.moves[4].toString(design) , "a7-a3", "a7-a3");
  assert.equal( board.moves[5].toString(design) , "a7-a2", "a7-a2");
  assert.equal( board.moves[6].toString(design) , "a7-a1", "a7-a1");
  assert.equal( board.moves[7].toString(design) , "a7-b7", "a7-b7");
  assert.equal( board.moves[8].toString(design) , "a7-c7", "a7-c7");
  assert.equal( board.moves[9].toString(design) , "a7-d7", "a7-d7");
  assert.equal( board.moves[10].toString(design) , "a7-e7", "a7-e7");
  assert.equal( board.moves[11].toString(design) , "a7-f7", "a7-f7");
  assert.equal( board.moves[12].toString(design) , "a7-g7", "a7-g7");
  assert.equal( board.moves[13].toString(design) , "a7-h7", "a7-h7");
  assert.equal( board.moves[14].toString(design) , "e1-e2", "e1-e2");
  assert.equal( board.moves[15].toString(design) , "e1-d1", "e1-d1");
  assert.equal( board.moves[16].toString(design) , "e1-f1", "e1-f1");
  assert.equal( board.moves[17].toString(design) , "e1-d2", "e1-d2");
  assert.equal( board.moves[18].toString(design) , "e1-f2", "e1-f2");
  assert.equal( board.moves[19].toString(design) , "e1-g1 h1-f1", "e1-g1 h1-f1");
  assert.equal( board.moves[20].toString(design) , "h1-h2", "h1-h2");
  assert.equal( board.moves[21].toString(design) , "h1-h3", "h1-h3");
  assert.equal( board.moves[22].toString(design) , "h1-h4", "h1-h4");
  assert.equal( board.moves[23].toString(design) , "h1-h5", "h1-h5");
  assert.equal( board.moves[24].toString(design) , "h1-h6", "h1-h6");
  assert.equal( board.moves[25].toString(design) , "h1-h7", "h1-h7");
  assert.equal( board.moves[26].toString(design) , "h1-h8", "h1-h8");
  assert.equal( board.moves[27].toString(design) , "h1-g1", "h1-g1");
  assert.equal( board.moves[28].toString(design) , "h1-f1", "h1-f1");
  board = board.apply(board.moves[26]);
  assert.equal( board.player, 2, "Black move");
  assert.equal( games.model.getGoal(board, 1) , 1, "White won");
  assert.equal( games.model.getGoal(board, 2) , -1, "Black lose");
  board.generate();
  assert.equal( board.moves.length , 0, "0 moves:");
});
