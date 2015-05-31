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

/*
*Define world height. The height of the backgrounds. Defined for easier scaling
*/
Q.worldHeight = Q.touchDevice ? 1000 : 1000;
Q.worldWidth = Q.touchDevice ? 15200*3 : 15200*3;


Parse.initialize("Ey61uM5w7LgMBbMuZxyHmbZJAowvgELIb1OW68YU", "V7Si7JS1Z52cQHXm8i4fWH3gWaVvH9KhfeBvpQiR");
var backgrounds = "backgroundLayer1.png,backgroundLayer2.png,backgroundLayer3.png, backgroundLayer4.png, backgroundLayer1-2.png,backgroundLayer2-2.png,backgroundLayer3-2.png, backgroundLayer4-2.png,backgroundLayer1-3.png,backgroundLayer2-3.png,backgroundLayer3-3.png, backgroundLayer4-3.png";
Q.load("walker.png, walker.json, bird.png,bird.json ,spider.png,spider.json, spotify.png, stars.png,stars.json, player.png, player.json, "+backgrounds, function() {
    
	//Compile spriteSheets
	Q.compileSheets("walker.png","walker.json");
	Q.compileSheets("player.png","player.json");
	Q.compileSheets("stars.png","stars.json");
	Q.compileSheets("spider.png","spider.json");
	Q.compileSheets("bird.png","bird.json");
	
	
	Q.animations("walker", {
		idle: { frames: [0], rate: 0.25, flip: false, loop: false },
		walking: { frames: [1,2,3,4,0], rate: 0.25, flip: false, loop: true }
		 
    });
	
	Q.animations("bird", {
		idle: { frames: [0], rate: 0.25, flip: false, loop: false },
		fly: { frames: [0,2,1,3], rate: 0.25, flip: false, loop: true }
		 
    });
	Q.animations("spider", {
		idle: { frames: [0], rate: 0.30, flip: false, loop: false },
		walking: { frames: [0,1,4,5,8,9], rate: 0.30, flip: false, loop: true },
		exploding: { frames: [2,6,3,10,7,11,12,14,13], rate: 0.30, flip: false, loop: false, trigger: "explosion_done" }
    });
	
	Q.animations("stars", {
      blink: { frames: [0,1,2,3], rate: 1/3, flip: false, loop: true }
    });
   
    Q.animations("player", {
      walk_right: { frames: [0,1,2,3], rate: 0.30, flip: false, loop: true },
	  waiting : { frames: [0], rate: 1, flip: false, loop: true },
      jump_up : { frames: [4], rate: 1/10, flip: false },
	  jump_down : { frames: [5], rate: 1/10, flip: false }
    });
    Q.stageScene("level1");
	Q.stageScene("spotify",2);
  
});

//Touch listeners
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
	Q.setGameSpeed(gameSpeed/3);
	setTimeout(function(){
	
		Q.setGameSpeed(firstGameSpeed);
	},500);
 }
  
});
