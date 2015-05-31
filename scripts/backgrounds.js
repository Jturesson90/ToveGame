Quintus.GameBackgrounds = function(Q){
	
	var farBehind = ["backgroundLayer4.png","backgroundLayer4-2.png","backgroundLayer4-3.png"];
	var backgrounds = ["backgroundLayer3.png","backgroundLayer3-2.png","backgroundLayer3-3.png"];
	var middle = ["backgroundLayer2.png","backgroundLayer2-2.png","backgroundLayer2-3.png"];
	var foregrounds = ["backgroundLayer1.png","backgroundLayer1-2.png","backgroundLayer1-3.png"];
	var testItems = ["testitems.png"];
	
	//var backgroundSpeed = -500/3;
	
	var farBehindParallaxSpeed = 0.90;
	var backgroundParallaxSpeed = 0.95;
	var foregroundParallaxSpeed = 1.05;
	
	
	Q.addMap = function(player){
		
		var stage = Q.stage(0);
		addFarBehind(stage);
		addBackgrounds(stage);
		stage.insert(player);
		Q.addItems();
		addMiddle(stage);
		
		//addTestItems(stage);
		addForeground(stage);
		
		
	}
	
	
	Q.Sprite.extend("BG",{

		init: function(p) {
			
			this._super(p,{
				
				//asset: image,//"bg1.png",//Q.touchDevice ? "bg1.png" : "bg1_old.png",
				type : Q.SPRITE_NONE,
				collisionMask: Q.SPRITE_NONE, 
				h: 1000,	
				x:0,
				z:10,
				y:0,
				vx:0.99,
				speed: 500,
				startPosX:0
			});
	
		this.p.x = this.p.cx - (400* (Q.worldHeight/1000));
		this.p.startPosX = this.p.x;
		
	},
	step: function(dt) {
		if(Q.isRunning()){
			this.p.x += Q.getGameSpeed() * this.p.vx * dt;
			
			if(this.p.x < 0-this.p.cx*2){
				this.p.x += middle.length * this.p.cx*2;
			}
			
		}
	}
	
	});
	
	function addFarBehind(stage){
		for(var i = 0; i < backgrounds.length; i++){	
			var item = new Q.BG({asset : farBehind[i],vx : farBehindParallaxSpeed });
			//console.log("ADDED Layer4-"+(i+1));
			item.p.x += item.p.w*i;
			item.p.startPosX = item.p.x;
			console.log("startPosX: "+item.p.startPosX+" X: "+item.p.x);
			stage.insert(item);
		}
	}
	function addBackgrounds(stage){
		for(var i = 0; i < backgrounds.length; i++){	
			var item = new Q.BG({asset : backgrounds[i],vx : backgroundParallaxSpeed });
			//console.log("ADDED Layer3-"+(i+1));
			item.p.x += item.p.w*i;
			stage.insert(item);
		}
	}
	
	function addMiddle(stage){
		for(var i = 0; i < middle.length; i++){	
			var item = new Q.BG({asset : middle[i],vx : 1.0 });
			//console.log("ADDED Layer2-"+(i+1));
			item.p.x += item.p.w*i;
			stage.insert(item);
		}
	}
	function addTestItems(stage){
		for(var i = 0; i < testItems.length; i++){	
			var item = new Q.BG({asset : testItems[i],vx : 1.0 });
			//console.log("ADDED Layer1-"+(i+1));
			item.p.x += item.p.w*i;
			stage.insert(item);
		}
	}
	function addForeground(stage){
		for(var i = 0; i < foregrounds.length; i++){	
			var item = new Q.BG({asset : foregrounds[i] , vx : foregroundParallaxSpeed });
			item.p.x += item.p.w*i;
			stage.insert(item);
		}
	}
}