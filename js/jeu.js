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
    this.listeCouleur = [];
    this.niveauDeJeu =1;
    this.timer =0;
    this.valTimer = 1000;
  }

  creerCouleur(){
     
      
      for(let nombre = 0; nombre<7; nombre++){
         let R = Math.round(255 * Math.random());
      let G = Math.round(255 * Math.random());
      let B = Math.round(255 * Math.random());
        let couleur = "rgb(" + R + "," + G + "," + B +")";
        //console.log(couleur);
        this.listeCouleur.push("rgb(" + R + "," + G + "," + B +")");
        
      }
   
  }
  creerBriques() {

    for(let nombre = 0; nombre<7; nombre++){
		for(let i = 0; i < 7; i++) {
			let width = 45;
			let height = 20;
			let x = i * (width+6) +6;
			let y = 60 + (height+6)*(nombre-1);
			
			let vx = 0;
	    	let vy = 0;
        
			let listeBrique = new Brique(x, y, this.context, this.listeCouleur[nombre], width, height);
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
  checkNiveau(time)
  {
    if(this.timer == this.valTimer){
      this.niveauDeJeu++;
      this.valTimer += 1000; 
    }
    this.canvas = document.querySelector(this.selecteur);
    this.context = this.canvas.getContext('2d');
    this.context.save();
    this.context.beginPath();
    this.context.translate(20, 25);
    this.context.fillStyle = "white";
    this.context.font = "20px Arial";
    this.context.fillText("NIVEAU : "+this.niveauDeJeu, 0, 0);
    this.context.restore();
    
    console.log("checkNiveau" + this.niveauDeJeu);
  }
  creerBalles(nbBalles,niveau) {
    nbBalles =3;
    if(this.niveauDeJeu != 1) nbBalles =nbBalles + this.niveauDeJeu - (this.niveauDeJeu-1);
    for(let i = 0; i < nbBalles; i++) {
    let x = Math.random() * this.canvas.width; 
    let y = Math.floor(Math.random() * (this.plateau.y - (this.briques[this.briques.length - 1].y + 30) + 1)  + (this.briques[this.briques.length - 1].y + 30));;
    let rayon = 8; 
    let R = Math.round(255 * Math.random());
      let G = Math.round(255 * Math.random());
      let B = Math.round(255 * Math.random());
      let couleur = "rgb(" + R + "," + G + "," + B +")";
    let vx = 1+ Math.random() *5; 
    let vy = 1+ Math.random() *5;
    
    let balle = new Balle(x, y, rayon, this.context, couleur, vx, vy);
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
      this.context.fillText('Vous avez perdu', 0, 0);
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
  
    this.creerCouleur();
    this.creerPlateau();
    this.creerBriques();
    this.creerBalles(3);
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
    this.timer++;
    this.fps.measureFPS(time);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.briques.map(brique => {
      brique.draw();
    });
    this.plateau.draw();
    this.taquet.draw();
    this.score.draw();
    console.log(this.valTimer + "this.valTimer");
    
    this.deplacerBalles();
    if(this.balles.length < 2 && this.briques.length != 0) {
     this.creerBalles(3);
    };
    // tester si la partie est terminer
    this.partieTerminer();
    this.checkNiveau(this.valTimer);
    this.increment++;
   
    requestAnimationFrame((time) => this.animation(time));  
  }

}