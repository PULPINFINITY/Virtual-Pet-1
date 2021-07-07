//Create variables here
var dog,happyDog,database,foodS,foodStock


function preload()
{
	//load images here
  dogimg = loadImage("images/dogImg.png");
  happyDogimg = loadImage("images/dogImg1.png");
  
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dog = createSprite(250,250,10,10);
  dog.addImage(dogimg);
  dog.scale= 0.25;
  
  foodStock=database.ref("FoodStock")
  foodStock.on("value",readStock , showError)


}


function draw() {  
  background("lime")
  drawSprites();
  fill("black")
  text("Press Up Arrow to feed the dog",250,50,)
  text("Food Remaining:"+ foodS,210,120)

  //add styles here
  if(keyWentDown(UP_ARROW)){
    dog.addImage(happyDogimg);
    writeStock(foodS);
  }
}

function readStock(data){
foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0
  }
  else{
  x--
  }

  database.ref("/").update({
    FoodStock:x
  })
  }

function showError(){
  console.log("Uh ohh there was an error")
  }

