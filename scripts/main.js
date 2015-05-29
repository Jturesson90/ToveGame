window.addEventListener("load",function() {

var Q = window.Q = Quintus()
        .include("Sprites, Scenes, Input, 2D, Touch, Anim, UI")
		.include("GameScenes, GamePlayer, GameBackgrounds, InteractiveItems,GameUserInterface")
        .setup({ maximize: true })
        .controls().touch();
	var touching = false;
	var SPRITE_BOX = 1;
	

	Q.input.keyboardControls({
		SPACE: "jump"
	});

var gameSpeed = -500;
var firstGameSpeed = gameSpeed;
Q.Sprite.extend("Box",{
  init: function() {

    var levels = [ 565, 540, 500, 450 ];

    var player = Q("Player").first();
    this._super({
      x: player.p.x + Q.width + 50,
      y: levels[Math.floor(Math.random() * 3)],
      frame: Math.random() < 0.5 ? 1 : 0,
      scale: 2,
      type: SPRITE_BOX,
      sheet: "crates",
      vx: -600 + 200 * Math.random(),
      vy: 0,
      ay: 0,
      theta: (300 * Math.random() + 200) * (Math.random() < 0.5 ? 1 : -1)
    });


    this.on("hit");
  },

  step: function(dt) {
    this.p.x += this.p.vx * dt;


    this.p.vy += this.p.ay * dt;
    this.p.y += this.p.vy * dt;
    if(this.p.y != 565) {
      this.p.angle += this.p.theta * dt;
    }

    if(this.p.y > 800) { this.destroy(); }

  },

  hit: function() {
    this.p.type = 0;
    this.p.collisionMask = Q.SPRITE_NONE;
    this.p.vx = 200;
    this.p.ay = 400;
    this.p.vy = -300;
    this.p.opacity = 0.5;
  }
  

});

Q.GameObject.extend("BoxThrower",{
  init: function() {
    this.p = {
      launchDelay: 0.75,
      launchRandom: 1,
      launch: 2
    }
  },

  update: function(dt) {
    this.p.launch -= dt;

    if(this.p.launch < 0) {
      this.stage.insert(new Q.Box());
      this.p.launch = this.p.launchDelay + this.p.launchRandom * Math.random();
    }
  }

});

Parse.initialize("Ey61uM5w7LgMBbMuZxyHmbZJAowvgELIb1OW68YU", "V7Si7JS1Z52cQHXm8i4fWH3gWaVvH9KhfeBvpQiR");

Q.load("spotify.png, background.png, backgroundMiddle.png, backgroundFront.png, crate.png, stars.png,stars.json, player.png, player.json, bg1.png, bg1_old.png, fg1.png, fg2.png", function() {
    Q.compileSheets("player.png","player.json");
	Q.compileSheets("stars.png","stars.json");
	//Q.compileSheets("background.png, background.json,");
	 Q.animations("stars", {
      blink: { frames: [0,1], rate: 1/3, flip: false, loop: true }
    });
   
    Q.animations("player", {
      walk_right: { frames: [0,1,2,3], rate: 0.30, flip: false, loop: true },
	  waiting : { frames: [0], rate: 1, flip: false, loop: true },
      jump_right: { frames: [3], rate: 1/10, flip: false },
    });
    Q.stageScene("level1");
	Q.stageScene("spotify",2);
  
});


Q.el.addEventListener('touchstart',function(e) {
		if(!Q.isRunning()){
				Q.stageScene("gameHUD",1);
			}
		Q.setRunning(true);
		touching = true;
});
Q.el.addEventListener('touchend',function(e) {
		touching = false;
		
});
 Q.getTouching = function() {
    return touching;
  }
  
  var running = false;
 Q.setRunning = function(arg){
	running = arg;
 }
 Q.isRunning = function() {
	 return running;
 }
 Q.getGameSpeed = function(){
	/* if(Q.touchDevice){
		return gameSpeed/3; 
	 }else{
		return gameSpeed;
	 }*/
	 return gameSpeed/3;
 }
 Q.setGameSpeed = function(arg){
	 gameSpeed = arg;
 }
 Q.setDefaultGameSpeed = function(){
	 gameSpeed = firstGameSpeed;
 }
 Q.slowDownEffect = function(){
	console.log('before');
	Q.setGameSpeed(gameSpeed/3);
	setTimeout(function(){
		console.log('after');
		Q.setGameSpeed(firstGameSpeed);
	},500);
 }
  
});
