class Jeu {

  constructor(selecteur, width, height) {
    this.selecteur = selecteur;
    this.briques = [];
    this.balles = [];
    this.taquet;
    this.fps;
    this.ecouteur;
    this.plateau;
    this.collision;
    this.score;
    this.audio = {};
  }

  creerBriques() {

    for(let nombre = 1; nombre<7; nombre++){
		for(let i = 0; i < 8; i++) {
			let width = 67;
			let height = 30;
			let x = i * (width+7) +7;
			let y = 30 + (height+7)*(nombre-1);
			let couleur = "rgb(245,124,145)";
			let vx = 0;
	    	let vy = 0;
			let listeBrique = new Brique(x, y, this.context, couleur, width, height);
      listeBrique.draw();
			this.briques.push(listeBrique);
		}
	}
  }

  creerTaquet() {
    const taquet = new Taquet((this.canvas.width - 50) / 2, this.canvas.height - 100, this.context, 'black', 100, 8);
    taquet.draw();
    this.taquet = taquet;
  }

  deplacerBalles() {
    const object = this;
    this.balles.map(function(balle, index, tableau) {
      balle.draw();
      balle.move();
      object.collision.testeCollisionBalleAvecMurs(balle, index, tableau);
      object.collision.testerCollisionPlateauAvecBalles(balle, object.plateau, object.taquet);
      object.collision.testerCollisionBriqueAvecBalles(object.balles, index, balle, object.briques);
    });
  }

  creerPlateau() {
    const plateau = new Plateau(0, this.canvas.height - 100, this.context, 'white', this.canvas.width, 8);
    plateau.draw();
    this.plateau = plateau;
  }

  creerBalles() {
    let nbBalles = 3;
    for(let i = 0; i < nbBalles; i++) {
      let x = Math.random() * this.canvas.width;
      let y = Math.floor(Math.random() * (this.plateau.y - (this.briques[this.briques.length - 1].y + 30) + 1)  + (this.briques[this.briques.length - 1].y + 30));
      let rayon = 8;
      let R = Math.round(255 * Math.random());
      let G = Math.round(255 * Math.random());
      let B = Math.round(255 * Math.random());
      let couleur = "rgb(" + R + "," + G + "," + B +")";
      let vx = 1 + Math.random() * 3;
      let vy = 1 + Math.random() * 3;
      const balle = new Balle(x, y, rayon, this.context, couleur, vx, vy);
      balle.draw();
      /* On le mets dans le tableaux de balles */
      this.balles.push(balle);
    }
  }

  partieTerminer() {
    if(this.briques.length === 0) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.save();
      this.context.beginPath();
      this.context.translate(this.canvas.width / 2 - 70, this.canvas.height / 2);
      this.context.fillStyle = 'white';
      this.context.font = '30px Arial bold';
      this.context.fillText('GAME OVER', 0, 0);
      this.context.restore();
      this.animation(time);
    }
  }



  init() {
    const fps = new Fps();
    fps.initFPS();
    this.canvas = document.querySelector(this.selecteur);
    this.context = this.canvas.getContext('2d');
    this.score = new Score(this.context, 1);
    this.creerPlateau();
    this.creerBriques();
    this.creerBalles();
    this.creerTaquet();
    this.increment = 0;
    this.score.draw();
    this.fps = fps;
    const collision = new Collision(this);
    this.collision = collision;
    const ecouteur = new Ecouteur(this);
    ecouteur.ecouter();
    this.ecouteur = ecouteur;
    console.log(this);
    requestAnimationFrame((time) => this.animation(time));
  }

  animation(time) {
    this.fps.measureFPS(time);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.briques.map(brique => {
      brique.draw();
    });
    this.plateau.draw();
    this.taquet.draw();
    this.score.draw();
    this.deplacerBalles();
    if(this.increment === 200) {
      let x = Math.random() * this.canvas.width;
      let y = Math.floor(Math.random() * (this.plateau.y - (this.briques[this.briques.length - 1].y + 30) + 1)  + (this.briques[this.briques.length - 1].y + 30));
      let rayon = 8;
      let R = Math.round(255 * Math.random());
      let G = Math.round(255 * Math.random());
      let B = Math.round(255 * Math.random());
      let couleur = "rgb(" + R + "," + G + "," + B +")";
      let vx = 1 + Math.random() * 3;
      let vy = 1 + Math.random() * 3;
      const balle = new Balle(x, y, rayon, this.context, couleur, vx, vy);
      /* On le mets dans le tableaux de balles */
      this.balles.push(balle);
      this.increment = 0;
    };
    // tester si la partie est terminer
    this.partieTerminer();
    this.increment++;
    requestAnimationFrame((time) => this.animation(time));
  }

}