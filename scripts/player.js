Quintus.GamePlayer = function(Q){
	//Ground is at 282 when at 1000
	var ground = 282;
	var highestJump = 40;
	var doubleJump = false;
	var releasedKey = true;
	var dontJumpFirstTime = true;
	var gravity = 981;
  
	Q.Sprite.extend("Player",{

		init: function(p) {
			ground = 282 * Q.worldHeight/1000;
		
		// We want the player to be 60px high when the background is 1000px high. For scaling to the world I'm scaling it: worldHeight / wanted height when it's 1000px high / picture size.
			this._super(p,{
				  sheet: "player",
				  sprite: "player",
				
				  color: "red",
				  y:ground,
				
				  x:0,
				  isJumping : false,
				 
				  scale: (Q.worldHeight/(1000/60))/196,
				  speed: 500,
				  jump: -700,
				  secondJump: -542
				  
			});
			console.log(this.p.scale);
			//this.p.secondJump = this.p.jump /2;
			dontJumpFirstTime = true;
			Q.gravityY = gravity;
			this.p.y += this.p.cy;
			this.add("2d, animation");
			Q.input.on("jump",this,"jump");
			//Q.input.on("touchstart",this,"jump");
			document.onkeyup = function(event){
				releasedKey = true;
			}
			document.ontouchend = function(event){
				releasedKey = true;
			}
			
			
		},   
		jump: function(){
			if(!Q.isRunning()){
				Q.stageScene("gameHUD",1);
			}
			Q.setRunning(true);

		
		},
		
		step: function(dt) {
			
			this.p.x = 0;
			if(this.p.y >= ground) {
				this.p.y = ground;
				this.p.landed = 1;
				this.p.isJumping = false;
				this.p.vy = 0;
				Q.gravityY = 0;
				doubleJump = false;
			} else {
				this.p.landed = 0;
			}
		if(Q.isRunning()){
			if((Q.getTouching() || Q.inputs['jump']) && this.p.landed > 0 && releasedKey ) {
				if(!dontJumpFirstTime){
					Q.gravityY = gravity;
					releasedKey = false;
					this.p.vy = this.p.jump;
					doubleJump = true;
				}else{
					dontJumpFirstTime = false;
				}
			}else if((Q.getTouching() || Q.inputs['jump']) && doubleJump && releasedKey ){
				releasedKey = false;
				Q.gravityY = gravity;
				this.p.vy = this.p.secondJump;
				doubleJump = false;
			}else if(!releasedKey && this.p.vy > 0){
				Q.gravityY = 350;
			}else if(releasedKey){
				Q.gravityY = gravity;
			}
		}
		if(this.vy > this.p.jump){
			this.p.vy = this.p.jump;
		}
		if(!Q.isRunning()){
			this.play("waiting");  
		}
		else if(this.p.landed) {
			this.play("walk_right");
			
		} else if(this.p.vy < 0){
			this.play("jump_up");
		} else{
			this.play("jump_down");
		}
	
  }
  
});
	
}