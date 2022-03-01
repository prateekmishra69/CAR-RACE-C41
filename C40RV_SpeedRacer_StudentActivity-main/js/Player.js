class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.rank = 0;
    this.fuel = 185;
    this.coins = 0;
    this.score = 0;
  }

  getCarsAtEnd(){
    database.ref("CarsAtEnd").on("value",(data)=>{
      this.rank = data.val();

    })
  }
 
  static updateCarsAtEnd(rank){
    database.ref("/").update({
     CarsAtEnd : rank,
    })
    
  }

  addSprites(spriteGroup,numberOfSprites,spriteImage,scale,positions = {}) {
     for(var i = 0;i<numberOfSprites;i++) {
     var x,y
     if(this.positions.length>0){
      x = positions[i].x
      y = positions[i].y
      spriteImage = positions[i].image
     }
     else{
      x = random(width/2 + 150,width/2 - 150)
      y = random(-height*4.5,height-400)
      var sprite = createSprite(x,y);
      sprite.addImage(spriteImage);
      sprite.scale = scale;
      spriteGroup.add(sprite);
     }
     }
  }

  addPlayer() {
    var playerIndex = "players/player" + this.index;

    if (this.index === 1) {
      this.positionX = width / 2 - 100;
    } else {
      this.positionX = width / 2 + 100;
    }

    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
      rank: this.rank,
      score: this.score
    });
  }

  getDistance() {
    var playerDistanceRef = database.ref("players/player" + this.index);
    playerDistanceRef.on("value", data => {
      var data = data.val();
      this.positionX = data.positionX;
      this.positionY = data.positionY;
    });
  }

  getCount() {
    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", data => {
      playerCount = data.val();
    });
  }

  updateCount(count) {
    database.ref("/").update({
      playerCount: count
    });
  }

  update() {
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).update({
      positionX: this.positionX,
      positionY: this.positionY,
      rank: this.rank,
      score: this.score
    });
  }

  static getPlayersInfo() {
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value", data => {
      allPlayers = data.val();
    });
  }
}
