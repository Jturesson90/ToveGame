Quintus.GameUserInterface = function(Q) {
	 Q.UI.Text.extend("Score",{
		init: function() {
			this._super({
				label: "Score: "+Q.state.get("score"),
				color: "black",
				x: Q.width*0.5,
				y: Q.height*0.2
				
			});
		
			Q.state.on("change.score",this,"score");
		},

		score: function(score) {
			console.log("NEW POINTS");
			this.p.label = "Score: " + score;
		}
	});
	 Q.UI.Text.extend("Lives",{
		init: function() {
			this._super({
				label: "Lives: "+Q.state.get("lives"),
				color: "black",
				x: Q.width*0.5,
				y: Q.height*0.1
				
			});
		
			Q.state.on("change.lives",this,"lives");
		},

		lives: function(lives) {
			this.p.label = "Lives: " + lives;
			if(0 >= Q.state.get("lives")){
				Q.pauseGame();
				Q.stageScene("gameOver",1);
			}
				
		}
	});
	Q.UI.Text.extend("GameOver",{
		init: function() {
			this._super({
				label: "Game Over",
				x: Q.width/2,
				y: Q.height/2
			});
		}
	});
	
};