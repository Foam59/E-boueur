var règle = function() {};


règle.prototype = {


  init: function () {

  },
  create: function () {
    game.add.tileSprite(0, 0, 1568, 896, 'background');
    game.add.image(209,144,'gameover');
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    let buttonMenu = game.add.button(game.world.centerX - 120, 720, 'button', this.onclickplay,this, 2, 1, 0);
    let buttonfullscreen = game.add.button(game.world.centerX - 770, 10, 'buttonfullscreen', this.gofullscreen, this, 2, 1, 0);

    game.add.text(game.world.centerX -530, 150, "Bienvenue dans E-boueur, le CIRious-Game / Smart-City" , {fill: 'black',fontSize:40});
    game.add.text(game.world.centerX -548, 260, "Dans ce jeu vous incarnez un super Camion qui nettoie sa ville de ses déchets" , {fill: 'black',fontSize:30});
    game.add.text(game.world.centerX -530, 300, "et de sa pollution. Votre but est de faire le meilleur score et ainsi faire " , {fill: 'black',fontSize:30});
    game.add.text(game.world.centerX -520, 340, "la meilleure Smart-City. Il faut tout d’abord rester en vie, faites attention " , {fill: 'black',fontSize:30});
    game.add.text(game.world.centerX -530, 380, "aux nuages de pollution qui seront vos ennemis. Pour les éliminer, il vous " , {fill: 'black',fontSize:30});
    game.add.text(game.world.centerX -535, 420, "faudra ramasser les cellules d’énergie qui permettent au camion de tuer les " , {fill: 'black',fontSize:30});
    game.add.text(game.world.centerX -540, 460, "nuages pendant un lapse de temps. Ces cellules d’énergie arrivent sur le jeu " , {fill: 'black',fontSize:30});
    game.add.text(game.world.centerX -530, 500, "seulement après avoir ramassé suffisamment de déchets propres (peaux de " , {fill: 'black',fontSize:30});
    game.add.text(game.world.centerX -530, 540, "bananes, trônions de pommes). Mais attention, le camion ramasse aussi des " , {fill: 'black',fontSize:30});
    game.add.text(game.world.centerX -530, 580, "déchets non propres (poubelles, cannettes), lorsque sa benne est pleine " , {fill: 'black',fontSize:30});
    game.add.text(game.world.centerX -530, 620, "il vous faut immédiatement aller recycler vos déchets à la déchetterie, sous " , {fill: 'black',fontSize:30});
    game.add.text(game.world.centerX -480, 660, "peine de voir d’autres nuages apparaitre et perdre des points." , {fill: 'black',fontSize:30});
    game.add.text(game.world.centerX- 75, 743, 'Menu', {fill: 'black',fontSize:50});
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
