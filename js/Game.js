class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    imageMode(CENTER)

    car1 = createSprite(200,200)
var car1_img = loadImage("images/runner.gif")
    car1.addImage("img1",car1_img);

imageMode(CENTER)

car2 = createSprite(200,400)
var car1_img = loadImage("images/runner.gif")
car2.addImage("img2",car1_img);


    
imageMode(CENTER)

car3 = createSprite(200,600)
var car1_img = loadImage("images/runner.gif")
car3.addImage("img3",car1_img);
 

imageMode(CENTER)

car4 = createSprite(200,800)
var car1_img = loadImage("images/runner.gif")
car4.addImage("img4",car1_img);


    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();

    player.getPlayersAtEnd();
    
    if(allPlayers !== undefined){
      background('#c68767');
     
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x;
      var y = 0;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = displayHeight + allPlayers[plr].distance;
        //use data form the database to display the cars in y direction
        y = y + 200;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = cars[index-1].x;
          camera.position.y = cars[index-1].y
        
          
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(player.distance>3860){
      gameState = 2;
player.rank += 1;
Player.UpdatePLayersAtEnd(player.rank)
      this.end();
    }

    drawSprites();
  }
  end(){
    console.log("Game_Ended");
  console.log(player.rank)
  }
}
