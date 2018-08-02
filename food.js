(function (w) {

  function Food( width,height,x,y,bgColor) {
    this.width = width || 20;
    this.height = height || 20;
    this.x = x || 0;
    this.y = y || 0;
    this.bgColor = bgColor || "green";
  }
  Food.prototype.render = function (map) {
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
  }
  w.Food = Food;
}(window))
