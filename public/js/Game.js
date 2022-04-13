var Game = function(game) {};

let height=1568;
let width=896;

let map = null;
let layer = null;
let layerRoute = null;
let layerCoin = null;
let layerMaison=null;
let car;

let safetile = -1;
let gridsize = 32;

let speed = 150;
let threshold = 5;
let turnSpeed = 70;

let marker = new Phaser.Point();
let turnPoint = new Phaser.Point();

let directions = [null, null, null, null, null];
let opposites = [Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP];

let current = Phaser.UP;
let turning = Phaser.NONE;

let cursors;

let coin;
let score=-10;
let scoreText;

let scoreTimer;
let time;

let compteur=0;
let blockTurn=10;

let KeyF;

let GroupEnnemies;
let speedEnn=100;

let battery=0;
let groupBattery;
let xBattery=[1,2,20,30,46,46];
let yBattery=[7,23,1,25,8,26];

let batterie_vide;
let dechets_sales_plein;
let dechets_propres_plein;
let recharge_batterie;

let scoreDechet;
let totaldechet=0;
let dechetpropre=0;
let dechetsale=0;
let ajoutennemie=0;
let life = 100;

let changementInit=1;

Game.prototype = {


  create: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    game.stage.backgroundColor = '#000000';
    game.scale.startFullScreen(true);
    KeyF = game.input.keyboard.addKey(Phaser.Keyboard.F);
    KeyF.onDown.add(this.gofullscreen, this);
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.F);


    map = game.add.tilemap('map');
    //On ajoute tout les tileset contenue dans la map
    map.addTilesetImage('Route','routes');
    map.addTilesetImage('Lac','lac');
    map.addTilesetImage('Gazon','gazon');
    map.addTilesetImage('tilesetbuildings','buildings');
    map.addTilesetImage('Stade','stade');
    map.addTilesetImage('beton','beton');
    map.addTilesetImage('arbre','arbre');
    map.addTilesetImage('objet1','objet1');
    map.addTilesetImage('mairie','mairie');
    map.addTilesetImage('parking','parking');
    map.addTilesetImage('usine','usine');
    map.addTilesetImage('Dechetterie','Dechetterie');


    //en parametre d'abord le nom du tileset dans tiled puis le nom de l'image composant le tileset qu'on a precharger dans la fonction preload

    //Layer contenant tout se qui bloque
    layer=map.createLayer('Ground');
    //Layer comprenant les routes
    layerRoute = map.createLayer('Route');
    //layer contenant les maisons
    layerMaison = map.createLayer('Maison');

    layer.resizeWorld();
    layerRoute.resizeWorld();

    map.setCollisionByExclusion([], true, layer) 

    car = game.add.sprite(48, 48, 'camion');
    car.anchor.set(0.5);

    game.physics.arcade.enable(car);

    //On cree le groupe contenant toutes les pieces
    coin=game.add.physicsGroup();
    coin.enableBody=true;

    //on cree le groupe contenant les batteries
    groupBattery=game.add.physicsGroup();
    groupBattery.enableBody=true;

    //On cree le groupe contenant les ennemies
    GroupEnnemies=game.add.physicsGroup();
    GroupEnnemies.enableBody=true;

    GroupeDechetterie=game.add.physicsGroup();
    GroupeDechetterie.enableBody=true;

    let buttonexit = game.add.button(game.world.centerX-90,840, 'button2', this.onclickexit);
    game.add.text(game.world.centerX-65,850, 'Exit', {fill: 'black',fontSize:25});
  

    jauge = game.add.image(1470,80, 'batterie');
    jauge.x = game.width /1.20;
    game.add.image(1290,70,'shield');
    

    jauge.height= 20
    jauge.width = 5;


    vie = game.add.image(1470,40, 'health');
    vie.x = game.width /1.20;
    game.add.image(1290,25,'coeur');


    vie.height= 20
    vie.width = 200;


    propre = game.add.image(1470,120, 'dechets-propres');
    propre.x = game.width /1.20;
    game.add.image(1290,110,'banane');
  

    propre.height= 20
    propre.width = 5;
    

    sale = game.add.image(1470,160, 'dechets-sales');
    sale.x = game.width /1.20;
    game.add.image(1290,150,'poubelle');
   

    sale.height= 20
    sale.width = 5;


    
    //On cree des pieces sur chaque case de route
    for(let x=0;x<height;x=x+32){
        for(let y=0;y<height;y=y+32){
            if(map.hasTile(x/32,y/32,layerRoute)){
                this.createcoin(x,y);
            }
        }
    }
    
  
    this.createEnnemie(736,544);
    this.createEnnemie(736,544);
    this.createEnnemie(736,544);
    this.createEnnemie(736,544);
    this.createEnnemie(736,544);
    this.createEnnemie(736,544);
    this.createEnnemie(736,544);
    this.createEnnemie(736,544);
    this.createEnnemie(736,544);
  
   

    //Cursors contenant les touches pressés
    cursors = game.input.keyboard.createCursorKeys();

    scoreText = game.add.text(game.world.centerX-140, game.world.centerY-60, 'score: 0', { fontSize: '35px', fill: '#FFF'}); // Gerer position et taille du score.
    
    //creation du timer 
    timer = game.time.create(false);
    timer.loop(300000,"GameOver"); // valeur du timer
    timer.start();


    //Initialisation quantité de dechet collecté
    scoreDechet=0;
  
  }, 

  setPercent:function(percent)
  {
    percent=percent/100;
    jauge.width=300*percent;

  },


  appartient:function(x,y){
    for(let i=0;i<xBattery.length;i++){
        if(xBattery[i]*32==x && yBattery[i]*32==y){
            return true;
        }
    }
    return false;
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
  createcoin:function(x,y) {
    let c = game.add.sprite(x,y, 'coin'+ Math.round((Math.random()*3)+1));
    coin.add(c);
    totaldechet+=1;
  
  },
  createDechetterie:function(x,y) {
    let d=game.add.sprite(x*32,y*32,'battery');
    GroupeDechetterie.add(d);      
  },

  createEnnemie:function(x,y) {
    let e = game.add.sprite(x,y,'ennemie');
    e.anchor.set(0.5,0.5);
    GroupEnnemies.add(e);
  },

  createBattery:function(){
    for(let i=0;i<xBattery.length;i++){
      let b=game.add.sprite(xBattery[i]*32, yBattery[i]*32,'battery');
        groupBattery.add(b);        
    }
  },
  
  

  catchCoin: function(camion, coin){
    scoreDechet+=1;
    totaldechet-=1;

    if(coin.key=="coin1" || coin.key=="coin4" && dechetpropre<=20){
        dechetpropre+=1;
        coin.kill();
        propre.width = propre.width + 5;
        score += 10; // a changer si besoin pour le score
        scoreText.setText('Score: ' + score);
    }else if(coin.key=="coin1" || coin.key=="coin4" && dechetpropre>20){
      for(let i=0;i<xBattery.length;i++){
        let b=game.add.sprite(xBattery[i]*32, yBattery[i]*32,'battery');
          groupBattery.add(b);        
      }
      dechetpropre=0;
      coin.kill();
      propre.width = 5;
      score += 10; // a changer si besoin pour le score
      scoreText.setText('Score: ' + score);
    }

    if(coin.key=="coin2" || coin.key=="coin3" && dechetsale<=30){
      dechetsale+=1;
      coin.kill();
      sale.width = sale.width + 5;
      score += 5; // a changer si besoin pour le score
      scoreText.setText('Score: ' + score);
    }else if(coin.key=="coin2" || coin.key=="coin3" && dechetsale>30){
      sale.width = 200;
      coin.kill();
      ajoutennemie+=1;
      score += -50; // a changer si besoin pour le score
      scoreText.setText('Score: ' + score);
      let d=game.add.sprite(12*32,9*32,'vide');
      GroupeDechetterie.add(d);  
    }
    if(ajoutennemie >= 2){
      let e = game.add.sprite(736,544,'ennemie');
      e.anchor.set(0.5,0.5);
      GroupEnnemies.add(e);
      ajoutennemie=0;
    }
    score += 10; // a changer si besoin pour le score
    scoreText.setText('Score: ' + score);
   
  },


  catchBattery:function(camion,b){
    b.kill();
    battery=100;
    jauge.width = 200 ;
  },
  catchDechetterie:function(camion,d){
    d.kill();
    dechetsale=0;
    sale.width = 5;
    
  },

  hitEnnemie:function(camion,e){
    if(battery<5){
      if(life>0){
        life+=-20;
        vie.width = vie.width - 40;
        e.kill();
        this.createEnnemie(736,544);
      }
      else {
        game.state.start("GameOver");
      }
    }
    else{
      e.kill();
      this.createEnnemie(736,544);
      score += 100; // a changer si besoin pour le score
      scoreText.setText('Score: ' + score);
    }
  },


  checkKeys:function() {

    if (cursors.left.isDown && current !== Phaser.LEFT)
    {
        this.checkDirection(Phaser.LEFT);
    }
    else if (cursors.right.isDown && current !== Phaser.RIGHT)
    {
        this.checkDirection(Phaser.RIGHT);
    }
    else if (cursors.up.isDown && current !== Phaser.UP)
    {
        this.checkDirection(Phaser.UP);
    }
    else if (cursors.down.isDown && current !== Phaser.DOWN)
    {
        this.checkDirection(Phaser.DOWN);
    }
    else
    {
        //  This forces them to hold the key down to turn the corner
        turning = Phaser.NONE;
    }

  },
  checkDirection:function(turnTo) {

    //jauge.setPercent(15);

    if (turning === turnTo || directions[turnTo] === null || directions[turnTo].index !== safetile)
    {
        //  Invalid direction if they're already set to turn that way
        //  Or there is no tile there, or the tile isn't index a floor tile
        return;
    }

    //  Check if they want to turn around and can
    if (current === opposites[turnTo])
    {
        this.move(turnTo);
    }
    else
    {
        turning = turnTo;

        turnPoint.x = (marker.x * gridsize) + (gridsize / 2);
        turnPoint.y = (marker.y * gridsize) + (gridsize / 2);
    }
  },
  
  turn:function() {

    let cx = Math.floor(car.position.x);
    let cy = Math.floor(car.position.y);

    //  This needs a threshold, because at high speeds you can't turn because the coordinates skip past
    if ((!game.math.fuzzyEqual(cx, turnPoint.x, threshold)) || (!game.math.fuzzyEqual(cy, turnPoint.y, threshold)))
    {   
        return false;
    }
    car.x = turnPoint.x;
    car.y = turnPoint.y;

    car.body.reset(turnPoint.x, turnPoint.y);

    this.move(turning);

    turning = Phaser.NONE;

    return true;

  },
  move:function(direction) {

    let speedtmp=speed;

    compteur=blockTurn;
    
    if (direction === Phaser.LEFT || direction === Phaser.UP)
    {
           speedtmp = -speedtmp;
       }
   
    if (direction === Phaser.LEFT || direction === Phaser.RIGHT)
    {
        car.body.velocity.x = speedtmp;
    }
    else
    {
        car.body.velocity.y = speedtmp;
    }

    game.add.tween(car).to( { angle: this.getAngle(direction) }, turnSpeed, "Linear", true);
  
    current = direction;
  },
  getAngle:function(to) {

    //  About-face?
    if (current === opposites[to])
    {
        return "180";
    }

    if ((current === Phaser.UP && to === Phaser.LEFT) ||
        (current === Phaser.DOWN && to === Phaser.RIGHT) ||
        (current === Phaser.LEFT && to === Phaser.DOWN) ||
        (current === Phaser.RIGHT && to === Phaser.UP))
    {
        return "-90";
    }

    return "90";

  },
  ennemiesMove:function(car){
    for(let i=0;i<GroupEnnemies.length;i++){
      let e=GroupEnnemies.children[i];

      if(i%2==0){
        if(e.x<car.x){
          e.body.velocity.x=speedEnn;
        }else if(e.x==car.x){
          e.body.velocity.x=0;
        }else{
          e.body.velocity.x=-speedEnn;
        }

        if(e.y<car.y){
          e.body.velocity.y=speedEnn;
        }else if(e.y==car.y){
          e.body.velocity.y=0;
        }else{
          e.body.velocity.y=-speedEnn;
        }
      }else{

        if(e.body.velocity.x!=speedEnn && e.body.velocity.x!=-speedEnn){
            e.body.velocity.x=speedEnn*changementInit;
            changementInit=-changementInit;
        }

        if(e.body.velocity.y!=speedEnn && e.body.velocity.y!=-speedEnn){
            e.body.velocity.y=speedEnn*changementInit;
        }
        
        if(game.rnd.integerInRange(0,1000)<=10){
            e.body.velocity.x=-e.body.velocity.x
        }

        if(game.rnd.integerInRange(0,1000)<=10){
            e.body.velocity.y=-e.body.velocity.y
        }
      }
    }
      
  },
  onclickexit:function(){
    game.state.start("GameOver");
  },  

  update: function(){
    console.log(totaldechet);

    scoreTimer=game.debug.text('Timer: ' + Math.round(timer.duration.toFixed(0)/1000),game.world.centerX-90,game.world.centerY);
    //on cree la collision entre le camion et la layer contenant le sol
    game.physics.arcade.collide(car, layer);

    //On appelle la fonction catchCoin quand le camion touche une piece
    game.physics.arcade.overlap(car,coin,this.catchCoin,null,game);

    //On cree la collision entre les ennemies et les murs
    game.physics.arcade.collide(GroupEnnemies, layer);

    //On appelle la fonction hitEnnemie quand le camion touche un ennemie
    game.physics.arcade.overlap(car,GroupEnnemies,(this.hitEnnemie).bind(this),null,game);

    //on appelle la fonction catchBattery quand on ramasse une batterie
    game.physics.arcade.overlap(car,groupBattery,this.catchBattery,null,game);

    game.physics.arcade.overlap(car,GroupeDechetterie,this.catchDechetterie,null,game);


    this.ennemiesMove(car);

    //compteur empechant le spam de touche et qui empeche la desorientation du sprite du camion
    //On empeche le camion de tourner si le compteur n'est pas inferieur a 0
    if(compteur<0){
        marker.x = game.math.snapToFloor(Math.floor(car.position.x), gridsize) / gridsize;
        marker.y = game.math.snapToFloor(Math.floor(car.position.y), gridsize) / gridsize;

        let i = layer.index;
        let x = marker.x;
        let y = marker.y;

        directions[1] = map.getTileLeft(i, x, y);
        directions[2] = map.getTileRight(i, x, y);
        directions[3] = map.getTileAbove(i, x, y);
        directions[4] = map.getTileBelow(i, x, y);

        this.checkKeys();

        if (turning !== Phaser.NONE)
        {   
            this.turn();
        }

    }
    //On decremente le compteur a chaque update
    compteur--;
    if(jauge.width >=5){
      battery+=-0.125;
      jauge.width = jauge.width-0.25;
    }

    if (game.input.activePointer.withinGame)
    {
        game.input.enabled = true;
    }
    else
    {
        game.input.enabled = false;
    }

    if(totaldechet==0){
      game.state.start("GameOver");
    }
  }
};