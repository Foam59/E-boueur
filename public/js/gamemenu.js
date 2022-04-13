var GameMenu = function() {};


GameMenu.prototype = {


  init: function () {

  },
  create: function () {
    game.add.tileSprite(0, 0, 1568, 896, 'background');
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    let buttonplay = game.add.button(game.world.centerX - 120, 230, 'button', this.onclickplay,this, 2, 1, 0);
    let buttonMessage = game.add.button(game.world.centerX - 120, 500, 'button', this.onclickMessage,this, 2, 1, 0);
    let buttonrègle = game.add.button(game.world.centerX - 120, 735, 'button', this.onclickrègle,this, 2, 1, 0);
    let buttonfullscreen = game.add.button(game.world.centerX - 770, 10, 'buttonfullscreen', this.gofullscreen, this, 2, 1, 0);
    game.add.text(game.world.centerX- 70, 250, 'Play', {fill: 'black',fontSize:50});
    game.add.text(game.world.centerX- 93, 525, 'Message', {fill: 'black',fontSize:40});
    game.add.text(game.world.centerX- 85, 755, 'Règles', {fill: 'black',fontSize:50});
    var KeyF = game.input.keyboard.addKey(Phaser.Keyboard.F);
    KeyF.onDown.add(this.gofullscreen, this);
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.F);
  },
  onclickplay:function(){
    game.state.start("Game");
    score =-10;
  },
  onclickMessage:function(){
    game.state.start("Message");
  },
  onclickrègle:function(){
    game.state.start("règle");
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

