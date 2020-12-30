
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
//Adding the bodies ,the engine and the world to the computer's memory
var engine,world;
var sceneImg;
var sceneImg2;
var scene;

var apple;
var button,buttonImg;
var ground,invisibleGround;
var sling;

var playerJunko1Img;
var junko,junkoImg;
var cloudImg,cloud;
var gameState = 0;

var sling;

//Creating arrays for the donut, hotdog and pizza

var donut=[];
var hotDog=[];
var pizza=[];

function preload(){

  //Loading all the images

    sceneImg = loadImage("images/scene.png");
    buttonImg=loadImage("images/playButton.png");
    sceneImg2 = loadImage("images/bg.jpg");
    
    junkoImg = loadImage("images/junko1.png");
    cloudImg = loadImage("images/cloud.png");

    playerJunko1Img = loadImage("images/girlSling.png");

    
}

function setup(){
   createCanvas(windowWidth,windowHeight);
   engine = Engine.create();
   world = engine.world;

  //Creating all the the sprites and adding their images
   
   apple = new Apple(width-450,height/2+120,100,100);

   sling = new SlingShot(apple.body,{x:width-450,y:height/2+120});

   scene = createSprite(width/2,height/2);
   scene.addImage(sceneImg);

   button = createSprite(width-200,height-100);
   button.addImage(buttonImg);

   junko = createSprite(200,height-200);
   junko.addImage(junkoImg);

   cloud = createSprite(450,height/2-100);
   cloud.addImage(cloudImg);

   


}

function draw(){
 
  
  if(gameState===0){

  
    drawSprites();

   
 //Displaying all the texts.
  
    textSize(16);
    textFont("Georgia");
    fill("black");
    text("Hello my name is Junko.",350,height/2-150);
    text("I am on a mission to climb Mt Everest.",320,height/2-120);
    text("Help me complete my mission.Press ",320,height/2-90);
    text("the Play button to start ",360,height/2-60);
    text(" the game ",390,height/2-30);
    textSize(40);
    textFont("Georgia");
    textStyle("Bold");
    fill("#e60000");
    text("Junko's journey to the Summit",620,height/2-260);

//Creating an if statement to chamge the gameState to 1 when we press the button play

if(mousePressedOver(button)){
     gameState=1;
   }
  
  }
else if(gameState===1){

//updating the engine

     Engine.update(engine);

//adding the second background when gameState is 1

     background(sceneImg2);
    
//Adding image for Junko in level 1 challenge 1

      image(playerJunko1Img,width-500,height/2,300,300);

//displaying the sling

      sling.display();

//displaying the sling      

     apple.display();

        
  if(donut.positionY>=200){
    world.remove(donut);
  }

// adding an if statement thatif frameCount is 60% switch between donut , pizza and hotdog.
   if(frameCount%60===0){
        var rand = Math.round(random(1,4));
        switch(rand){
          case 1: donut.push(new Donut(random(100,width-800),0,100));
          break;
          case 2: pizza.push(new Pizza(random(100,width-800),0,100));
          break;
          case 3: hotDog.push(new HotDog(random(100,width-800),0,100));
          break;
          default: break;
        }

//creating for loop to display the donut
        
    }
    for(var k=0;k<donut.length;k++){
      donut[k].display();
    }

//creating for loop to display the pizza
    
    for(var k=0;k<pizza.length;k++){
     pizza[k].display();
    } 
  
//creating for loop to display the hotDog
   
    for(var k=0;k<hotDog.length;k++){
      hotDog[k].display();
    }
  
  }
    
}

//Giving a function that if spaceBar if pressed then the apple will be attached to the slingshot
function keyPressed(){
  if(keyCode===32){
    Matter.Body.setPosition(apple.body,{x:100,y:480});
    sling.attach(apple.body);
  }
}  
//Giving a function that if mouse is draggeed then apple should move with the mouse
function mouseDragged(){
  Matter.Body.setPosition(apple.body, {x: mouseX , y: mouseY});
}
//Giving a unction that if mouse is released then the sling should fly
function mouseReleased(){
  sling.fly();
}
 