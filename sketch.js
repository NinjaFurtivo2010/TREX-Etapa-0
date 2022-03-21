var trex ,trex_running;

var solo,solo_imagem

var solo_invisivel

var nuvem,cloud

var score

var scoreSound

var cacto1,cacto2,cacto3,cacto4,cacto5,cacto6

var cacto 

var PLAY = 1

var END = 0

var game_state = PLAY

var cloudGrupo

var obstacleGrupo

var trex_collided 

var restart, restartImage

var game_over,over_png


function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  
  trex_collided = loadAnimation("trex_collided.png")

  solo_imagem = loadImage("ground2.png")
  
  cloud = loadImage("cloud.png")

  scoreSound = loadSound("ScoreHit.wav")

  cacto1 = loadImage("obstacle1.png")

  cacto2 = loadImage("obstacle2.png")

  cacto3 = loadImage("obstacle3.png")

  cacto4 = loadImage("obstacle4.png")

  cacto5 = loadImage("obstacle5.png")

  cacto6 = loadImage("obstacle6.png")

  restartImage = loadImage("restart")

  over_png = loadImage("gameOver.png")

}

function setup(){
  createCanvas(600,200)
  
  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.50
  trex.addAnimation("collided",trex_collided);

  solo = createSprite(300,180,1200,25)
  solo.velocityX = -6
  solo.x = solo.width / 2
  solo.addImage ("ground",solo_imagem)

  solo_invisivel = createSprite(50,195,1200,15)
  solo_invisivel.visible = false  

  restart = createSprite(0,0,20,20)
  restart.addImage("restart",restartImage)


  game_over = createSprite(0,0,20,20)
  game_over.addImage("gameover",over_png)
  


  score = 0
   cloudGrupo = new Group ()

   obstacleGrupo = new Group ()
}
function draw(){
  background(250)
  trex.collide(solo_invisivel)
  text ("score :"+ score ,520,20)
  

//  if(score % 100 === 0){
//scoreSound.play();

 // }
  
 
    if(game_state === PLAY){
    solo.velocityX = -6
    score = score + Math.round(frameCount / 400) 
    trex.changeAnimation("running", trex_running)
    trex.debug = true 
    trex.setCollider("circle",0,0,30)
    draw_cloud()
  
    draw_cacto()
    if(    solo.x < 0    ){
      solo.x = solo.width / 2
  
    }
    if(keyDown("space")&& trex.y >= 120 ){
      trex.velocityY = -12 
    }         
    if(obstacleGrupo.isTouching (trex)){
        game_state = END

    }
  }
    else if(game_state === END){
      solo.velocityX = 0
      obstacleGrupo.setVelocityXEach(0)
      cloudGrupo.setVelocityXEach(0)
      obstacleGrupo.setLifetimeEach(-1)
      cloudGrupo.setLifetimeEach(-1)
      trex.changeAnimation("collided",trex_collided)

    }
 


 trex.velocityY = trex.velocityY+1 
  
  drawSprites();

}
function draw_cloud(){
    if(frameCount % 75 === 0 ){
    nuvem = createSprite(600,100,40,40 )
    nuvem.velocityX = -3
    nuvem.addImage("cloud",cloud)
    nuvem.y = Math.round(random(30 ,110))
    nuvem.depth = trex.depth
    trex.depth = trex.depth +1
    nuvem.lifetime = 220
    cloudGrupo.add(nuvem)

}

}

function draw_cacto(){
    if(frameCount % 90 === 0){
      cacto = createSprite(600,170,20,20)
      cacto.velocityX = -3
      cacto.scale= 0.40
      var number = Math.round(random(1 ,6))
      switch(number){
        case 1: cacto.addImage("obstacle1",cacto1)
        break; 
      
        case 2: cacto.addImage("obstacle2",cacto2)
        break;
      
        case 3: cacto.addImage("obstacle3",cacto3)
        break;

        case 4: cacto.addImage("obstacle4",cacto4)
        break;

        case 5: cacto.addImage("obstacle5",cacto5)
        break;

        case 6: cacto.addImage("obstacle6",cacto6)
        break;
        default: break
      }

      cacto.lifetime = 220
      obstacleGrupo.add(cacto)
    }


}