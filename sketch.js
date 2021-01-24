var road,mainCar;
var roadImage,mainCarImage
var Car_HornSound;
var obstacle,obstacle1, obstacle2, obstacle3
var blueCar,greenCar,yellowCar;
var blueImageCar,greenImageCar,yellowImageCar;
var gameState = "play";
var gameover, gameoverImage;
var gameoverSound;
var distance=0;

function preload(){
  roadImage=loadImage("Road.png")
  mainCarImage=loadImage("RedCar.png")
  blueImageCar=loadImage("BlueCar.png")
  greenImageCar=loadImage("GreenCar.png")
  yellowImageCar=loadImage("YellowCar.png")
  Car_HornSound=loadSound("CarHorn.wav")
  gameoverSound=loadSound("GameoverSound.mp3")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  gameoverImage=loadImage("gameOver.png")
}

function setup(){
  
createCanvas(900,300);
  
  // Moving background
  road=createSprite(100,150);
  road.addImage(roadImage);
  
  gameover=createSprite(450,150);
  gameover.addImage(gameoverImage)
  //creating boy running
  mainCar  = createSprite(70,150,20,20);
  mainCar.addImage(mainCarImage); 
  mainCar.scale=0.7;
  mainCar.debug=false;
  mainCar.setCollider("rectangle",0,35,220,90);
  obstacleGroup=new Group();
  CarGroup=new Group();
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance+" m",400,30);
  
  if(gameState==="play"){
    gameover.visible=false;
   mainCar.y = World.mouseY;
    obs();
    //blueCarOp();
    //greenCarOp();
    //yellowCarOp();
    decider();
    
    road.velocityX = -(10+distance/10);
   edges= createEdgeSprites();
   mainCar .collide(edges);
  if(keyDown("space"))
    {
      Car_HornSound.play();
    }
  //code to reset the background
  if(road.x < 0 ){
    road.x = width/2;
  }
    distance =  distance + Math.round(frameRate()/60);
 }
  if(gameState==="end"){
    
    obstacleGroup.setVelocityXEach(0);
    //CarGroup.setVelocityXEach(0);
    CarGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    road.velocityX=0;
    text("Press up arrow key to restart",320,210);
    gameover.visible=true;
    
    if(keyDown("up"))
      {
        reset();
        
      }
    
  }
}

function obs()
{ 
  if(frameCount%100===0)
    {
      var rand2=Math.round(random(20,280))
      obstacle=createSprite(950,rand2,20,20);
      obstacle.velocityX=road.velocityX;
      obstacle.scale=0.15;
      obstacle.lifetime=95
      obstacle.debug=false;
      obstacle.setCollider("circle",0,0,300);
      var rand3=Math.round(random(1,3))
      switch(rand3)
        {
          case 1: obstacle.addImage("cone",obstacle1);
            break;
          case 2: obstacle.addImage("hole",obstacle2);
            break;
          case 3: obstacle.addImage("nails",obstacle3);
            break;
          default: break;
            
        }
      obstacleGroup.add(obstacle);
    }
}

function blueCarOp()
{ 
  if(frameCount%120===0)
    {
      var rand5=Math.round(random(20,280))
      blueCar=createSprite(950,rand5,20,20);
      blueCar.addImage(blueImageCar)
      blueCar.velocityX=road.velocityX;
      blueCar.scale=0.35;
      blueCar.lifetime=95;
      blueCar.debug=true;
      blueCar.setCollider("rectangle",-30,10,500,150);
      
      CarGroup.add(blueCar);
    }
}
function greenCarOp()
{ 
  if(frameCount%120===0)
    {
      var rand6=Math.round(random(20,280))
      greenCar=createSprite(950,rand6,20,20);
      greenCar.addImage(greenImageCar)
      greenCar.velocityX=road.velocityX;
      greenCar.scale=0.2;
      greenCar.lifetime=95;
      greenCar.debug=true;
      greenCar.setCollider("rectangle",-30,10,600,250);
      
      CarGroup.add(greenCar);
    }
}
function yellowCarOp()
{ 
  if(frameCount%120===0)
    {
      var rand7=Math.round(random(20,280))
      yellowCar=createSprite(950,rand7,20,20);
      yellowCar.addImage(yellowImageCar)
      yellowCar.velocityX=road.velocityX;
      yellowCar.scale=0.4;
      yellowCar.lifetime=95;
      yellowCar.debug=true;
      yellowCar.setCollider("rectangle",0,0,400,150);
      
      CarGroup.add(yellowCar);
    }
}
function decider()
{ 
  var rand6=Math.round(random(1,3))
  if(mainCar.isTouching(obstacleGroup))
    {
      gameState="end";
      gameoverSound.play();
      CarGroup.velocityX=-(road.velocityX);
    }
  if(mainCar.isTouching(CarGroup))
    {
      gameState="end";
      gameoverSound.play();
      CarGroup.velocityX=-(road.velocityX);
    }
}
function reset()
{
  gameState="play";
  obstacleGroup.destroyEach();
  CarGroup.destroyEach();
  distance=0;
  
}