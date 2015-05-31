Quintus.GameScenes = function(Q){
	var Player = Parse.Object.extend("Player");
	var gameScore = new Player();
	var PLAYER_SCORE = 0;
	var toveUrl = "https://open.spotify.com/user/tovestyrkeofficial/playlist/5pz7UkmtznuzI6n7Xx0LIu";
	var cameraYOffset;
	var cameraYScale;
	//218 is the constant when background height is 1000.
	var cameraYConstant = 218;
	
	
	
	 //If device, use: Q.touchDevice;
	Q.scene("level1",function(stage) {
			cameraYOffset = Q.worldHeight*0.1;
			cameraYScale = Q.worldHeight*0.5;
			cameraYConstant *= Q.worldHeight/1000;
			var player = new Q.Player();			
			Q.addMap(player);
			
			
			
			stage.add("viewport");
			stage.viewport.scale = Q.height/((Q.worldHeight)-cameraYScale);
			
			var cameraXPos = (player.p.x - Q.width*0.25)/stage.viewport.scale;
			var cameraYPos = cameraYConstant-Q.height*0.5/stage.viewport.scale+cameraYScale/2-cameraYOffset;
			
			stage.moveTo(cameraXPos, cameraYPos);
			stage.follow(player,{ x:false,y:true });
			stage.viewport.offsetY = cameraYPos;
			Q.stageScene("gameIntro",1);
		
		 
	});
	
	Q.scene("gameIntro",function(stage){
		var verb = Q.touchDevice ? 'Tap': 'Press space';

		stage.insert(new Q.UI.Text({
		
		  label: verb + " to jump",
		  align: 'center',
		  x: Q.width/2,
		  y: Q.height/2,
		  weight: "normal"
		}));
		
	});
	
	Q.scene("spotify",function(stage){
		if(!Q.touchDevice){
		//	var spotify = new Q.UI.IFrame({ url: "https://embed.spotify.com/?uri=spotify%3Atrack%3A253V91l7DxehjkHyvxLPNN", w: 300, h: 80, x: 150, y: 40 });
		var spotify = new Q.UI.IFrame({ url: "https://embed.spotify.com/?uri=spotify%3Auser%3Atovestyrkeofficial%3Aplaylist%3A5pz7UkmtznuzI6n7Xx0LIu", w: 300, h: 80, x: 150, y: 40 });
			stage.insert(spotify);
		}
	});
	
	Q.scene("gameHUD",function(stage) {
		stage.insert(new Q.UI.Button({
			label: "DIE",
			y: 150,
			
			x: 100
		},function(){
			Q.pauseGame();
			Q.stageScene("gameOver",1);
		}));
		
		
		Q.state.reset({ score: 0,lives: 3});
		stage.insert(new Q.Score());
		stage.insert(new Q.Lives());
	});
	
	Q.scene("gameOver",function(stage) {
		Q.stage(0).pause();  
		stage.insert(new Q.GameOver());
		
		
		stage.insert(new Q.UI.Button({
			asset: "spotify.png",
			y: Q.height/4,
			x: Q.width/2,
			scale: 0.3
		},function(){
			window.open(toveUrl);
		}));
		
		stage.insert(new Q.UI.Button({
			label: "Save score!",
			y: Q.height*0.25,
			x: Q.width*0.75
		},function(){
			loginToFacebook(Q.state.get("score"));
			//saveScore("Test",Math.floor((Math.random() * 1000)));
		}));
		
		var highscoreText = new Q.UI.Text({
			color: "black",
			label: "Highscore\n",
			y: Q.height/2
		});
		highscoreText.p.x = Q.width -highscoreText.p.w;

		stage.insert(highscoreText);
	
		getTopTen(highscoreText);
		
		stage.insert(new Q.UI.Button({
			label: "Restart",
			y: Q.height*0.75,
			x: Q.width/2
			
		},function(){
			restartGame();
		}));
	});
	function updateScore(parseId,score){
		var Point = Parse.Object.extend("Player");
		var point = new Point();
		point.id = parseId;
		point.set("score", score);
		console.log("id "+point.id);
		point.save(null, {
			success: function(gameScore) {			
				alert("Score submitted");
			}
		});
	}
	
	function saveScore(facebookId,name,score){
		gameScore.set("facebookId", facebookId);
		gameScore.set("score", score);
		gameScore.set("name", name);
		gameScore.save(null, {
			success: function(gameScore) {
				alert("Score submitted");
		  },
		  error: function(gameScore, error) {
			 
		  }
		});
		
	}
	function getTopTen(highscoreText){
		highscoreText.p.label = "Highscore\n";
		var query = new Parse.Query(Player);
		query.descending("score");
		query.limit(10);
		query.find({ 
			success: function(results) {
				for(var i = 0; i < 10; i++){
					var object = results[i];
					var name = object.get('name');
					var score = object.get('score');
					
					highscoreText.p.label += (i+1)+". "+ name +"\t\t\t\t"+score+"\n";
				}
				
			}
		});
		
	}
	function restartGame(){
		Q.stageScene("level1",0);
		Q.setRunning(false);
	}
	function checkIfNewPlayer(fbId,fbName,score){
		var query = new Parse.Query(Player);
		query.equalTo("facebookId", fbId);
		query.find({
			success: function(results) {
				
				if(results.length < 1){
					
					saveScore(fbId,fbName,score);
				}else{
					var object = results[0];
					var oldScore = object.get('score');
					var objectId = object.id;
				if(oldScore < score){
						updateScore(objectId,score);
						
					}else{
					
					}
					
				}
				
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
	}
	function loginToFacebook(score){
		
		FB.login(function(response) {
			if (response.authResponse) {
			
 
				FB.api('/me', function(response) {
					
					checkIfNewPlayer(response.id,response.first_name,score);
				});
 
			} else {
				alert('You need to be logged into Facebook to Submit your score');
			}
		});
		
	}
}