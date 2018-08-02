(function (w) {

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
    for(var i = 0 ; i < this.body.length ; i++){
      var unit = this.body[i];
      var div2 = document.createElement("div");
      div2.style.position = "absolute";
      div2.style.left = unit.x * this.width + "px";
      div2.style.top = unit.y * this.height + "px";
      div2.style.width = this.width + "px";
      div2.style.height = this.height + "px";
      div2.style.backgroundColor = unit.bgColor;
      map.appendChild(div2);
    }
  }

  Snake.prototype.move = function () {
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
  }
  w.Snake = Snake;
}(window))



