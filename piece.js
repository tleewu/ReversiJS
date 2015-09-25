var Piece = function(position,color){
  this.position = position;
  this.color = color;
};

Piece.prototype.flip = function(){
  this.color = this.oppositeColor();
};

Piece.prototype.oppositeColor = function() {
  if (this.color === "black"){
    return "white";
  } else {
    return "black";
  }
};

// module.exports = Piece;
