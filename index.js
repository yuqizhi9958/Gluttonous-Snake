

//=======================================食物区=========================================================================

;(function (w) {
  var list = [];
  function Food( width,height,x,y,bgColor) {
    this.width = width || 20;
    this.height = height || 20;
    this.x = x || 0;
    this.y = y || 0;
    this.bgColor = bgColor || "green";
  }
  Food.prototype.render = function (map) {
    reMove(map);
    this.x = Math.floor(Math.random() * map.offsetWidth / this.width) * this.width;
    this.y = Math.floor(Math.random() * map.offsetHeight / this.height) * this.height;
    var div1 = document.createElement("div");
    div1.style.position = "absolute";
    div1.style.left = this.x + "px";
    div1.style.top = this.y + "px";
    div1.style.backgroundColor = this.bgColor;
    div1.style.width = this.width + "px";
    div1.style.height = this.height + "px";
    map.appendChild(div1);
    list.push(div1);
  }

  function reMove(map) {
    for(var i = 0 ; i < list.length ; i++){
    	map.removeChild(list[i])
    }
    list = [];
  }
  w.Food = Food;
}(window));


//======================================蛇身区=====================================================================

;(function (w) {
  var list = [];
  function Snake(width,height,direction) {
    this.width = width || 20;
    this.height = height || 20;
    this.direction = direction || "right";
    this.body = [
      {x:3,y:1,bgColor:"yellow"},
      {x:2,y:1,bgColor:"blue"},
      {x:1,y:1,bgColor:"skyblue"}
    ]
  }
  Snake.prototype.render = function (map) {
    remove(map);
    for(var i = 0 ; i < this.body.length ; i++){
      var unit = this.body[i];
      var div1 = document.createElement("div");
      div1.style.position = "absolute";
      div1.style.left = unit.x * this.width + "px";
      div1.style.top = unit.y * this.height + "px";
      div1.style.width = this.width + "px";
      div1.style.height = this.height + "px";
      div1.style.backgroundColor = unit.bgColor;
      map.appendChild(div1);
      list.push(div1);
    }
  }

  function remove(map) {
    for(var i = 0 ; i < list.length; i++){
      map.removeChild(list[i]);
    }
    list = [];
  }

  Snake.prototype.move = function (Food,map) {
    for(var i = this.body.length-1 ; i > 0 ; i--){
      this.body[i].x = this.body[i-1].x;
      this.body[i].y = this.body[i-1].y;
    }
    switch (this.direction) {
      case "left":
        this.body[0].x--;
        break;
      case "right":
        this.body[0].x++;
        break;
      case "bottom":
        this.body[0].y++;
        break;
      case "top":
        this.body[0].y--;
        break;
    }
    var snakeHeadX = this.body[0].x * this.width;
    var snakeHeadY = this.body[0].y * this.height;
    var foodX = Food.x;
    var foodY = Food.y;
    var lastUnit = this.body[this.body.length-1];
    if(snakeHeadX == foodX && snakeHeadY == foodY){
      this.body.push({
        x:lastUnit.x,
        y:lastUnit.y,
        bgColor:"green"
      });
      Food.render(map);
    }
  }


  w.Snake = Snake;
}(window))

//=============================================游戏控制区=====================================================================

;(function (w) {

  var that = null;

  function Game(map) {
    this.Food = new Food();
    this.Snake = new Snake();
    this.map = map;
    that = this;
  }
  Game.prototype.Start = function () {
    this.Food.render(this.map);
    this.Snake.render(this.map);
    autoMove();
    bindKey();
  }
  
  function autoMove() {
    var timerId = setInterval(function () {
      this.Snake.move(this.Food,this.map);

      var snakeheadX = this.Snake.body[0].x * this.Snake.width;
      var snakeheadY= this.Snake.body[0].y * this.Snake.height;

      switch (Snake.direction){
        case "left":
          snakeheadX--;
          break;
        case "right":
          snakeheadX++;
          break;
        case "bottom":
          snakeheadY++;
          break;
        case "top":
          snakeheadY--;
          break;
      }
      if(snakeheadX >= this.map.offsetWidth || snakeheadX < -1 || snakeheadY >= this.map.offsetHeight || snakeheadX < -1){
      alert("Game over!");
      clearInterval(timerId);
      timerId = null;
      }
      if(timerId != null){
        this.Snake.render(this.map);
      }

    }.bind(that),200)
  }

  function bindKey() {
    window.onkeydown = function (e) {
      console.log(e.keyCode);
      e = e || event;
      switch (e.keyCode) {
        case 65:
          if(this.Snake.direction != "right"){
            this.Snake.direction = "left";
          }
          break;
        case 87:
          if(this.Snake.direction != "bottom"){
            this.Snake.direction = "top";
          }
          break;
        case 68:
          if(this.Snake.direction != "left"){
            this.Snake.direction = "right";
          }
          break;
        case 83:
          if(this.Snake.direction != "top"){
            this.Snake.direction = "bottom";
          }
          break;
      }
    }.bind(that);
  }

  w.Game = Game;
}(window))


