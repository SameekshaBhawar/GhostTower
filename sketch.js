var tower,towerImage
var door,doorImage
var doorsGroup
var climber,climberImage
var climbersGroup
var ghost,ghostImage
var iblock,iblocksGroup
var gameState="play"
var spookySound
function preload(){
towerImage=loadImage("tower.png")
  
doorImage=loadImage("door.png")

  
climberImage=loadImage("climber.png")
  
ghostImage=loadImage("ghost-standing.png")
spookySound=loadSound("spooky.wav")
}


function setup(){
createCanvas(600,600)
spookySound.loop()
tower=createSprite(300,300)
tower.addImage("tower",towerImage)
tower.velocityY=1
ghost=createSprite(200,200,50,50)
ghost.addImage("ghost",ghostImage)
ghost.scale=0.5
doorsGroup=new Group()
climbersGroup=new Group()
iblocksGroup=new Group()
}


function draw(){
background(0)
if(gameState==="play"){
if(tower.y>400)
{
 tower.y=300
}
if(keyDown("left_arrow")){
ghost.x=ghost.x-3
}
if(keyDown("right_arrow")){
ghost.x=ghost.x+3
}
if(keyDown("space")){
ghost.velocityY=-5
}
ghost.velocityY=ghost.velocityY+0.8
  
if(climbersGroup.isTouching(ghost)){
 ghost.velocityY=0
}
spawnDoors()
if(iblocksGroup.isTouching(ghost)||ghost.y>600){
ghost.destroy()
gameState="end"
}
drawSprites();

}

if(gameState==="end")
{
  stroke("yellow")
  fill("yellow")
  textSize(30)
  text("Game Over",230,250)
}
  
 }
function spawnDoors()
{
  if(frameCount%240===0){
  var door=createSprite(200,-50)
  door.addImage(doorImage)
  var climber=createSprite(200,10)
  climber.addImage(climberImage)
  var iblock=createSprite(200,15)
  iblock.width=climber.width
  iblock.height=2
  door.velocityY=1
  door.x=Math.round(random(120,400))
  climber.x=door.x
  climber.velocityY=1
  iblock.x=door.x
  iblock.velocityY=1
  ghost.depth=door.depth
  ghost.depth+=1
  iblock.debug=true;
  door.lifetime=800
  climber.lifetime=800
  iblock.lifetime=800
  doorsGroup.add(door)
  climbersGroup.add(climber)
  iblocksGroup.add(iblock)
  }
}