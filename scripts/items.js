Quintus.InteractiveItems = function(Q){
	
	var stage;

	
	Q.addItems = function (){
		
		stage = Q.stage(0);
		
	
		for(var i = 0; i <100; i ++){
			//addStar(200+(i*40),-70);
		}
		for(var i = 1; i <20; i ++){
			//addCrate(300*i,45);
		}
		addBird(500,182);
		addBird(800,182);
		addBird(1100,182);
		addBird(1400,182);
		addBird(1800,182);
		addBird(2300,182);
	
	}
	function addBird(x,y){
		stage.insert(new Q.Bird({x:x,y:y}));
	}
	function addStar(x,y){
		
		stage.insert(new Q.Star({x:x,y:y}));
		
	}
	
	Q.Sprite.extend("Star", {

		init: function(p) {
			this._super(p,{		
				sheet: "stars",
				sprite: "stars",
				collisionMask : Q.SPRITE_NONE
				//type : Q.SPRITE_NONE
			});
		this.add("animation");
		this.on("hit",this,"collision");
		},
		step: function(dt) {
			if(Q.isRunning()){
				this.p.x += Q.getGameSpeed() * dt;
				this.play("blink");
			}
		},
		collision: function(col){
			if(col.obj.isA("Player")){
				stage.insert(new Q.Flash({color:"white"}));
				Q.state.inc("score",50);
				//Q.slowDownEffect();
					
				this.destroy();
				
			}
		}
		
	});
	function addCrate(x,y){
			stage.insert(new Q.Crate({x:x,y:y}));
	}
	Q.Sprite.extend("Crate", {

		init: function(p) {
			this._super(p,{		
				asset:"crate.png",
				scale:0.4
				
			});   
		this.on("hit",this,"collision");
		},
		step: function(dt) {
			if(Q.isRunning()){
				this.p.x += Q.getGameSpeed() * dt;
			}
		},
		collision: function(col){
			if(col.obj.isA("Player")){
				stage.insert(new Q.Flash({color:"black"}));
				Q.state.dec("lives",1);
				Q.slowDownEffect();
					
				this.destroy();
				
			}
		}
		
	});
	Q.Sprite.extend("Bird", {

		init: function(p) {
			this._super(p,{		
				asset:"crate.png",
				scale:1,
				startPos:0,
				yRange: 100,
				currentYSpeed: -1
				
			});   
		this.p.startPos = this.p.y;
		this.on("hit",this,"collision");
		},
		step: function(dt) {
			if(Q.isRunning()){
				this.p.x += Q.getGameSpeed() * dt;
				if(this.p.y > this.p.startPos+this.p.yRange){
					this.p.currentYSpeed = 1;
				}else if(this.p.y < this.p.startPos - this.p.yRange){
					this.p.currentYSpeed = -1;
				}
				this.p.y += Q.getGameSpeed() * dt * this.p.currentYSpeed;
			}
		},
		collision: function(col){
			if(col.obj.isA("Player")){
				stage.insert(new Q.Flash({color:"black"}));
				Q.state.dec("lives",1);
				Q.slowDownEffect();
					
				this.destroy();
				
			}
		}
		
	});
	
	Q.Sprite.extend("Flash",{
		  init: function(p) {
			this._super(p,{
				color: "white",
				type : Q.SPRITE_NONE,
				collisionMask: Q.SPRITE_NONE, 
				w: Q.width,
				opacity:0.5,
				h: Q.height
			});
		  },

		draw: function(ctx) {
			ctx.fillStyle = this.p.color;
			ctx.fillRect(-this.p.cx,
						-this.p.cy,
						this.p.w,
						this.p.h);
			
		},
		step: function(dt){
			this.p.opacity -= dt;
			if(this.p.opacity < 0){
				this.destroy();
			}
		}
		
	});
}