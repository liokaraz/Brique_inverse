class Brique extends ObjetGraphique {
  constructor(x, y, context, couleur, width, height) {
    super(x, y, context, couleur, 0, 0);
    this.width = width;
    this.height = height;
  }
  
  draw() {
    this.context.save();
    this.context.fillStyle = this.couleur;
    this.context.fillRect(this.x, this.y, this.width, this.height);
    this.context.fill();
    this.context.restore();
  }
}