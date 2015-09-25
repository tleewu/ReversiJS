// var Piece = require("./piece");

var dir = [[-1,0],[1,0],[0,-1],[0,1],[-1,1],[-1,-1],[1,-1],[1,1]];

var Board = function(size) {
  this.grid = Board.makeGrid(size);
};

Board.makeGrid = function(size) {
  var newGrid = new Array(size);
  for (var i=0; i<size; i++){
    newGrid[i] = new Array(size);
  }

  for (var j=0; j<size; j++){
    for (var k=0; k<size; k++){
      newGrid[j][k] = new Piece([j,k], "none");
    }
  }

  newGrid[1][1] = new Piece([1,1], "black");
  newGrid[1][2] = new Piece([1,2], "white");
  newGrid[1][3] = new Piece([1,3], "white");
  newGrid[2][1] = new Piece([2,1], "white");
  newGrid[2][2] = new Piece([2,2], "white");

  return newGrid;
};

Board.prototype.placePiece = function(pos,color){
  this.grid[pos[0]][pos[1]] = new Piece(pos, color);
};

Board.prototype.pieceAt = function(pos){
  return this.grid[pos[0]][pos[1]];
};

Board.prototype.validMoves = function(currentColor){
  var validMoves = [];

  this.allPieces(currentColor).forEach(function(piece){
    dir.forEach(function(direction){
      var resultPos = [piece.position[0]+direction[0],piece.position[1]+direction[1]];
      while (this.grid[resultPos[0]][resultPos[1]].color === piece.oppositeColor()) {
        resultPos = [resultPos[0] + direction[0],
                     resultPos[1] + direction[1]];
        var currentPiece = this.pieceAt(resultPos);

        if (currentPiece.color === "none") {
          validMoves.push(resultPos);
        }
      }
    });
  });
  return validMoves;
};

Board.prototype.allPieces = function(color){
  var allPieces = [];
  this.grid.forEach(function(row) {
    row.forEach (function (piece){
      if (piece.color === color){
        allPieces.push(piece);
      }
    });
  });
  return allPieces;
};


var a = new Board(5);
console.log(a.validMoves("black"));
