var Message = function() {};


Message.prototype = {


  init: function () {

  },
  create: function () {
    game.add.tileSprite(0, 0, 1568, 896, 'background');
    game.add.image(209,144,'gameover');
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    let buttonMenu = game.add.button(game.world.centerX - 120, 720, 'button', this.onclickplay,this, 2, 1, 0);
    let buttonfullscreen = game.add.button(game.world.centerX - 770, 10, 'buttonfullscreen', this.gofullscreen, this, 2, 1, 0);

    game.add.text(game.world.centerX -530, 150, "Bienvenue dans E-boueur, le CIRious-Game / Smart-City" , {fill: 'black',fontSize:40});
    game.add.text(game.world.centerX -520, 260, "Le jeu a pour objectif de donner les codes des smart city de demain" , {fill: 'black',fontSize:30});
    game.add.text(game.world.centerX -520, 300, "L’idée d’une ville intelligente et avant tout éco-responsable. Ce jeu peut  " , {fill: 'black',fontSize:30});
    game.add.text(game.world.centerX -520, 340, "permettre de sensibiliser chacun à devenir un citoyen responsable, ayant  " , {fill: 'black',fontSize:30});
    game.add.text(game.world.centerX -530, 380, "la possibilité d’agir dans son quotidien pour faire évoluer sa ville." , {fill: 'black',fontSize:30});
    game.add.text(game.world.centerX -520, 420, "Devenez en jouant à ce jeu acteur des transformations de nos villes !" , {fill: 'black',fontSize:30});
    game.add.text(game.world.centerX -510, 460, " Plus d'information sur les principes d'une Smart-City ici : " , {fill: 'black',fontSize:30});
    game.add.text(game.world.centerX -540, 500, "https://smart-city.cerema.fr/comprendre-smart-city/definition-smart-city " , {fill: 'black',fontSize:30});
    game.add.text(game.world.centerX- 75, 740, 'Menu', {fill: 'black',fontSize:50});
    var KeyF = game.input.keyboard.addKey(Phaser.Keyboard.F);
    KeyF.onDown.add(this.gofullscreen, this);
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.F);
  },
  onclickplay:function(){
    game.state.start("GameMenu");
  },  
  gofullscreen:function() {

    if (game.scale.isFullScreen)
    {
        game.scale.stopFullScreen();
    }
    else
    {
        game.scale.startFullScreen(true);
    }

  },

  update: function(){

    if (game.input.activePointer.withinGame)
    {
        game.input.enabled = true;
    }
    else
    {
        game.input.enabled = false;
    }

  }
};
