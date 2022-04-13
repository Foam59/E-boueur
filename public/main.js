// Global Variables


var game = new Phaser.Game(1568, 896, Phaser.AUTO, 'game'),
Main = function () {};


Main.prototype = {

  preload: function () {
    game.load.image('loading',  'assets/loading.png');
    game.load.script('Preloader',  'js/Preloader.js');
  },

  create: function () {
    game.state.add('Preloader',Preloader);
    game.state.start('Preloader');
  },

};
game.state.add('Main',Main);
game.state.start("Main");

