var dog, dogImg, dogHappyImg;
var database;
var foodS, foodStock;

function preload()
{
	dogImg = loadImage("dogImg.png");
  dogHappyImg = loadImage("dogHappyImg.png");
}

function setup() {
	createCanvas(500,500);

  database = firebase.database();
  
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(250,250,20,20); 
  dog.addImage(dogImg);
  dog.scale = 0.1;
}


function draw() { 

  background(46, 139, 87); 

  if(keyDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappyImg);
  }

  drawSprites();
  
  textSize(20);
  fill("white");
  stroke("grey");
  text("Note: Press Up Arrow key to Feed the dog milk!", 20,150);

  text("Food: " + foodS,20,50);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(count){

  if(count <= 0){
    count = 0;
  } else {
    count = count - 1;
  }

  database.ref('/').update({
    Food: count
  })
}



