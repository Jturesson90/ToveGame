Quintus.InteractiveItems = function(Q){
	
	var stage;

	
	Q.addItems = function (){
		
		stage = Q.stage(0);
		
		//This is the place to place out enemies and items
		var player = Q("Player").first();
		
		var highest = 400-player.p.cy;
		var lowest = 0-player.p.cy;
		var starSpawn = 500 * Q.worldHeight/1000;
		var starNum = 100;
		
		for(var i = 0; i*starSpawn < Q.worldWidth; i ++){
			addStar(starSpawn+(i*starSpawn),Q.random(lowest,highest));
			
		}
		for(var i = 0; i <100; i ++){
			addBird(8000+(i*800),0);
		}
	
		addWalker(500,255);
		addWalker(800,255);
		addSpider(1100,255);
		addWalker(1400,255);
		addWalker(1800,255);
		addWalker(2300,255);
	
		
	
	}
	Q.random = function(min,max) {
    return min + Math.random() * (max - min);
  }
	//TODO Anpassningsbar efter skalning
	function addWalker(x,y){
		stage.insert(new Q.Walker({x:x,y:y}));
	}
	function addSpider(x,y){
		stage.insert(new Q.Spider({x:x,y:y}));
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
				scale:(Q.worldHeight/(1000/50))/77,
				collisionMask : Q.SPRITE_FRIENDLY
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
	
	Q.Sprite.extend("Bird", {

		init: function(p) {
			this._super(p,{
				sheet: "bird",
				sprite: "bird",
				scale:(Q.worldHeight/(1000/50))/110,
				startPos:0,
				yRange: 100,
				currentYSpeed: -1,
				collisionMask : Q.SPRITE_ENEMY
				
			});   
		this.p.startPos = this.p.y;
		this.add("animation");
		this.on("hit",this,"collision");
		},
		step: function(dt) {
			if(Q.isRunning()){
				this.play("fly");
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
	Q.Sprite.extend("Spider", {

		init: function(p) {
			this._super(p,{	
				sheet: "spider",
				sprite: "spider",			
				points: [ [-55,-48],[55,-48],[55,68],[-55,68]],
				startPos:0,
				scale: (Q.worldHeight/(1000/120))/270,
				yRange: 100,
				currentYSpeed: -1,
				gravity: 0,
				speed: 1.5,
				started: false,
				collisionMask : Q.SPRITE_ENEMY
				
			});
		
	
		this.p.started = false;
		this.p.startPos = this.p.y;
		this.add("2d,animation");
		this.on("bump.top",this,"hitup");
		this.on("bump.left",this,"hitleft");
		this.on("explosion_done",this,"explosion_done");
		this.on("bump.bottom",this,"hitleft");
		this.play("idle");
		},
		step: function(dt) {
			
			if(Q.isRunning()){
				this.p.x += Q.getGameSpeed() * dt*this.p.speed;
				if(!this.p.started){
					this.p.started = true;
					this.play("walking");
				}
			}
		},
		explosion_done: function(){
			this.destroy();
		},
		hitup: function(col){
				
			if(col.obj.isA("Player")){
				this.play("exploding");
				Q.state.inc("score",50);
				col.obj.p.vy = -500;
				stage.insert(new Q.Flash({color:"white"}));
				
			}
		},
		hitleft: function(col){
			if(col.obj.isA("Player")){
				stage.insert(new Q.Flash({color:"black"}));
				Q.state.dec("lives",1);
				Q.slowDownEffect();				
				this.destroy();	
			}
		}
		
	});
	Q.Sprite.extend("Walker", {

		init: function(p) {
			this._super(p,{	
				sheet: "walker",
				sprite: "walker",			
				startPos:0,
				scale: (Q.worldHeight/(1000/110))/125,
				gravity: 0,
				speed: 2,
				collisionMask : Q.SPRITE_ENEMY
				
			});

		this.add("2d,animation");
		this.on("bump.top",this,"hitup");
		this.on("bump.left",this,"hitleft");
		this.on("bump.bottom",this,"hitleft");
	
		console.log("New walker   "+this.p.x+"  ,   "+this.p.y);
		},
		step: function(dt) {
			
			if(Q.isRunning()){
				
				this.p.x += Q.getGameSpeed() * dt*this.p.speed;
				this.play("walking");
				
			}
		},
		explosion_done: function(){
			this.destroy();
		},
		hitup: function(col){
				
			if(col.obj.isA("Player")){
				//this.play("exploding");
				this.destroy();
				Q.state.inc("score",50);
				col.obj.p.vy = -500;
				stage.insert(new Q.Flash({color:"white"}));
				
			}
		},
		hitleft: function(col){
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