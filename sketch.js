
var monkey , monkey_running,monkeyCollide,monkeyCollideImg;
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score;
var ground,groundImage;
var gameState = "play";
var bananas;
var gameOver,gameOverIMG;
var restart,restartImg;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage   = loadImage("obstacle.png");
  groundImage=loadImage("g.png")
 monkeyCollideImg=loadAnimation("sprite_1.png");
gameOverIMG=loadImage("game1.png");
  restartImg=loadImage ("restart.png")
 
}



function setup() {
  createCanvas(600, 200);
  
  ground = createSprite(70,240,600,10);
 ground.x = ground.width /2;
  ground.addImage(groundImage)
 ground.scale=2;
  
  
   
  
  monkey=createSprite(50,130,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("t",monkeyCollideImg)
  monkey.scale=0.12;
  monkey.debug = true;
  
  
  gameOver=createSprite(300,100);
  gameOver.addImage(gameOverIMG);
  gameOver.scale=0.18;
  
  
restart=createSprite(290,160,20,20);
 restart.addImage(restartImg);
  restart.scale=0.06;
  
  
  obstacleGroup  = new Group();
  foodGroup = new Group();
  
 score=0;
bananas=0;
  
  restart.visible=false;
  gameOver.visible=false;

}


function draw() {
background(220);
  
  textSize(20);
  fill("red")
 text("Score: "+ score, 500,50);
 text("bananas:"+ bananas,300,50);
console.log(monkey.y)
  
if (gameState==="play"){
    score = score + Math.round(getFrameRate()/60);
    obstacles();
    food() ;
    ground.velocityX = -(8 + 3* score/100);
  if (ground.x < 0){
    ground.x = ground.width/2;
 } 
  if(keyDown("space")&& monkey.y >= 149) {
    monkey.velocityY = -12;
 }
    
   if(foodGroup.isTouching(monkey))  {
     bananas = bananas+1;
     foodGroup.destroyEach();
     
  }  if(obstacleGroup.isTouching(monkey)){
     gameState = "end";
  }
   
 } else if (gameState==="end"){
    ground.velocityX = 0;
      monkey.velocityY = 0;
   
     
   monkey.changeAnimation("t",monkey)
      
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  
     obstacleGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0); 
   
     restart.visible=true;
     gameOver.visible=true;
  }
  
   monkey.velocityY = monkey.velocityY + 0.8;
    
  monkey.collide(ground);
  
  if(mousePressedOver(restart)){
    reset();
  }
    
  
   
  
  
  drawSprites();
  
}

function reset (){
  gameState = "play";
 obstacleGroup.destroyEach();
 foodGroup.destroyEach();
 score=0;
 monkey.changeAnimation("running", monkey_running);
 gameOver.visible=false;
 restart.visible=false;
}

function obstacles(){
  if (frameCount%100===0) {
    obstacle=createSprite(600,164,20,20);
   obstacle.velocityX = -(9   + score/100);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.lifetime=300;
    obstacleGroup.add(obstacle);
  }
}


function food() {
  if (frameCount % 150 === 0) {
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,190));
    banana.scale = 0.1;
    banana.velocityX=-3;

    banana.lifetime = 200;
    
    foodGroup.add(banana);
  }
}


