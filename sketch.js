const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var stones = [];
var bridge;
var ground;
var jointLink;
var wall1;
var wall2;
var engine;
var world;
var jointPoint;
var zombie
var backgroundImage;
var breakButton
var background


function preload() {
  zombie1 = loadImage("./js/zombie.png");
  //bridge = loadImage("./js/wood.png");

  backgroundImage = loadImage("./js/background.png");
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);
  zombie = createSprite(width / 2, height - 110);
  zombie.addImage("lefttoright", zombie1);
  //zombie.addImg("righttoleft", zombie1);
  zombie.scale = 0.1;
  zombie.velocityX = 10;

  breakButton = createImg("./js/axe.png");
  breakButton.position(width - 200, height / 2 - 50);
  breakButton.size(50, 50);
  breakButton.mouseClicked(handleButtonPress);


  bridge = new Bridge(15, {x: width / 2 - 400, y: height / 2 });
  ground = new Base(0, height - 10, width * 2, 20);
  wall1=new Base(300, height / 2 + 50, 600, 100);
  wall2=new Base(width - 300, height / 2 + 50, 600, 100);
  jointPoint=new Base(width - 600, height / 2 + 10, 40, 20);

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);
   
  for(var i = 0; i <= 8; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-10, 140);
    var stone = new Stone(x, y, 80, 80);
    stones.push(stone);
  }

}

function draw() {
  background(backgroundImage);
  Engine.update(engine);

  bridge.show()
  ground.show();
  
  wall1.show()
  wall2.show()

  for(var stone of stones) {
    stone.show()
  }

  if (zombie.position.x >= width - 300) { 
    zombie.velocityX = -10; 
    //zombie.changeAnimation("lefttoright");
  } if(zombie.position.x <= 300){ 
    zombie.velocityX = 10; 
  }

  drawSprites()

}

function handleButtonPress() {
  jointLink.detach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}
