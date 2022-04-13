var GameOver = function() {};


GameOver.prototype = {


  init: function () {

  },
  create: function () {
    game.add.tileSprite(0, 0, 1568, 896, 'background');
    game.add.image(209,144,'gameover');
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    let buttonMenu = game.add.button(game.world.centerX - 120, 720, 'button', this.onclickplay,this, 2, 1, 0);
    let buttonfullscreen = game.add.button(game.world.centerX - 770, 10, 'buttonfullscreen', this.gofullscreen, this, 2, 1, 0);

    if(totaldechet==0){
      score+=5000;
    };

    game.add.text(game.world.centerX- 170, 150, 'Score total : ' + score, {fill: 'black',fontSize:50});
    game.add.text(game.world.centerX -475, 300, "Vous avez créé " + scoreDechet*0.5 + " KWh d'energie pour le camion", {fill: 'black',fontSize:40});
    game.add.text(game.world.centerX -275, 370, "grâce à "+ scoreDechet + " kg de déchets collectés", {fill: 'black',fontSize:40});
    game.add.text(game.world.centerX -555, 430, "Allez voir la page règles et  message, pour en savoir plus sur le jeu !", {fill: 'black',fontSize:34});
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
