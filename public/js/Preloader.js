var Preloader = function () {};
Preloader.prototype = {

  loadScripts: function () {
    game.load.script('gamemenu','js/gamemenu.js');
    game.load.script('Game', 'js/Game.js');
    game.load.script('gameover','js/gameover.js');
    game.load.script('Message','js/Message.js');
    game.load.script('règle','js/règle.js');
  },
  loadImages: function () {
    game.load.tilemap('map', "/assets/city.json", null, Phaser.Tilemap.TILED_JSON);

    //Prechargement des tileset qui composent la map
    game.load.image('routes','assets/tilesetRoute.png');
    game.load.image('lac','assets/tilesetlac.png');
    game.load.image('gazon','assets/gazon.png');
    game.load.image('buildings','assets/tilesetbuildings.png');
    game.load.image('stade','assets/stade.png');
    game.load.image('beton','assets/beton.png');
    game.load.image('arbre','assets/arbre.png');
    game.load.image('objet1','assets/objet1.png');
    game.load.image('mairie','assets/mairie.png');
    game.load.image('parking','assets/parking.png');
    game.load.image('usine','assets/usine.png');
    game.load.image('Dechetterie','assets/Dechetterie.png');

    //Prechargement image
    game.load.image('camion','assets/camion.png');
    game.load.image('coin1','assets/Déchet1.png');
    game.load.image('coin2','assets/Déchet2.png');
    game.load.image('coin3','assets/Déchet3.png');
    game.load.image('coin4','assets/Déchet4.png');
    game.load.image('ennemie','assets/ennemie.png');
    game.load.image('background', 'assets/bg.png');
    game.load.image('battery','assets/battery.png');
    game.load.image('vide','assets/vide.png');
    game.load.image('batterie','assets/barre-shield.png');
    game.load.image('health', 'assets/barre-vie.png');
    game.load.image('dechets-propres', 'assets/barre-dechets-propres.png');
    game.load.image('dechets-sales', 'assets/barre-dechets-sales.png');
    game.load.image('gameover','assets/gameover.png');
    game.load.image('coeur','assets/coeur.png');
    game.load.image('shield','assets/shield.png');
    game.load.image('banane','assets/banane.png');
    game.load.image('poubelle','assets/poubelle.png');
    game.load.spritesheet('buttonfullscreen', 'assets/fullscreen.png', 60, 60);
    game.load.spritesheet('button', 'assets/button.png', 200, 150);
    game.load.spritesheet('button2', 'assets/button2.png', 100, 51);
  },


  init: function () {
    this.loadingBar = game.make.sprite(game.world.centerX-(387/2), 400, "loading");
    this.status     = game.make.text(game.world.centerX-35, 360, 'Loading...', {fill: 'white'});
  },

  preload: function () {
    game.add.existing(this.loadingBar);
    game.add.existing(this.status);
    this.load.setPreloadSprite(this.loadingBar);

    this.loadScripts();
    this.loadImages();

  },

  addGameStates: function () {

    game.state.add("GameMenu",GameMenu);
    game.state.add("Game",Game);
    game.state.add("GameOver",GameOver);
    game.state.add("Message",Message);
    game.state.add("règle",règle);
  },

  create: function() {
    this.status.setText('Ready!');
    this.addGameStates();
    setTimeout(function () {
      game.state.start("GameMenu");
    }, 1000);
  }
};
