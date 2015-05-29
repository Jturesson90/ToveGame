Quintus.GameBackgrounds = function(Q){
	
		
	var backgrounds = ["background.png"];
	var middle = ["backgroundMiddle.png"];
	var foregrounds = ["backgroundFront.png"];
	var testItems = ["testitems.png"];
	
	//var backgroundSpeed = -500/3;
	var SPRITE_BOX = 1;
	
	var backgroundParallaxSpeed = 0.95;
	var foregroundParallaxSpeed = 1.05;
	
	
	Q.addMap = function(player){
		
		var stage = Q.stage(0);
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
				h: Q.height,	
				x:0,
				z:10,
				y:0,
				vx:0.99,
				speed: 500
			});
		this.p.x = this.p.cx -550;
	},
	step: function(dt) {
		if(Q.isRunning()){
			this.p.x += Q.getGameSpeed() * this.p.vx * dt;
		}
	}
	
	});
	
	
	function addBackgrounds(stage){
		for(var i = 0; i < backgrounds.length; i++){	
			var item = new Q.BG({asset : backgrounds[i],vx : backgroundParallaxSpeed });
			item.p.x += item.p.w*i;
			stage.insert(item);
		}
	}
	
	function addMiddle(stage){
		for(var i = 0; i < middle.length; i++){	
			var item = new Q.BG({asset : middle[i],vx : 1.0 });
			item.p.x += item.p.w*i;
			stage.insert(item);
		}
	}
	function addTestItems(stage){
		for(var i = 0; i < testItems.length; i++){	
			var item = new Q.BG({asset : testItems[i],vx : 1.0 });
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