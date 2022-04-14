const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)
  
var imageSource = {
    imageSrc:'./Martial Hero 3/Sprite/Attack3.png'
}  
    

const player = new Boxer({
    position:{
        x: 0,
        y: 0
    },
    velocity:{
        x: 0,
        y: 0
    },
    dir:{
        x:80,
        y:38
    },
    imageSrc: imageSource.imageSrc,
    sprites: {
        Idle:{
           imageSrc: './Martial Hero 3/Sprite/Idle.png',
           maxFrame: 10
        },
        Run:{
            imageSrc: './Martial Hero 3/Sprite/Run.png',
            maxFrame: 8
        },
        RunLeft:{
            imageSrc: './Martial Hero 3/Sprite/RunLeft.png',
            maxFrame: 8
        },
        Up:{
            imageSrc: './Martial Hero 3/Sprite/Going Up.png',
            maxFrame: 3
        },
        Attack:{
            imageSrc: './Martial Hero 3/Sprite/Attack2.png',
            maxFrame: 6
        },
        Death:{
            imageSrc: './Martial Hero 3/Sprite/Death.png',
            maxFrame: 11
        }
    },
    scale: 2.5,
    changeFrame: 0
})
player.draw();
/*const test = new sprite({
    position:{
        x:100,
        y:100
    },
    imageSrc: imageSource.imageSrc,
    scale: 1.5,
    maxFrame: 9,
    changeFrame: 0,
    sprites: {
        Idle:{
           imageSrc: './Martial Hero 3/Sprite/Idle.png'
        },
        Run:{
            imageSrc: './Martial Hero 3/Sprite/Run.png'
        }
    }
})*/

const player2 = new Boxer({
    position:{
        x: 400,
        y: 100
    },
    velocity:{
        x: 0,
        y: 0
    },
    dir: {
        x: 30,
        y: 168
    },
    imageSrc: imageSource.imageSrc,
    sprites: {
        Idle:{
           imageSrc: './Evil Wizard 2/Sprites/Idle.png',
           maxFrame: 8
        },
        Run:{
            imageSrc: './Evil Wizard 2/Sprites/Run.png',
            maxFrame: 8
        },
        RunLeft:{
            imageSrc: './Evil Wizard 2/Sprites/RunLeft.png',
            maxFrame: 8
        },
        Up:{
            imageSrc: './Evil Wizard 2/Sprites/Jump.png',
            maxFrame: 2
        },
        Attack:{
            imageSrc: './Evil Wizard 2/Sprites/Attack1.png',
            maxFrame: 8
        },
        Death:{
            imageSrc: './Evil Wizard 2/Sprites/Death.png',
            maxFrame:7
        }
    },
    scale: 2,
    changeFrame: 0
})

const backGround = new sprite ({
    position:{
        x: 0,
        y: 0
    },
    imageSrc: './img/background.jpg'
})

let timerCount = 60

  function timer(){
      if(timerCount > 0){
        timerCount--
        document.getElementById("timerInn").innerHTML = timerCount
      }else{
        winnerWhenTimerOut()
        }
    }     
  let timerInterval = setInterval(timer, 1000)
  function winnerWhenTimerOut(){
      if(player.playerHealth === player2.playerHealth){
        document.querySelector('#finishText').innerHTML = 'Tie'
        document.querySelector('#finishText').style.display = 'flex'
      }else if (player.playerHealth > player2.playerHealth){
        document.querySelector('#finishText').innerHTML = 'Winner is player1'
        document.querySelector('#finishText').style.display = 'flex'
      }else if (player.playerHealth < player2.playerHealth){
        document.querySelector('#finishText').innerHTML = 'Winner is player2'
        document.querySelector('#finishText').style.display = 'flex'
    }
    clearInterval(timerInterval)
  }

  function winnerWhenHealthOut(){
      if(player.playerHealth <= 0){
          restart()
          clearInterval(timerInterval)
          document.querySelector('#finishText').innerHTML = 'Winner is player2'
          document.querySelector('#finishText').style.display = 'flex'
      }

      if(player2.playerHealth <= 0){
          restart()
          clearInterval(timerInterval);
          document.querySelector('#finishText').innerHTML = 'Winner is player2'
          document.querySelector('#finishText').style.display = 'flex'
      }
  }


player2.draw();

const keys = {
    a:{
        press: false 
    },
    d:{
        press: false
    },
    w:{
        press: false
    },
    ArrowRight: {
        press: false
    },
    ArrowLeft: {
        press: false
    },
    ArrowUp: {
        press: false
    }
}

/*function bothAttack({rectAngl1, rectAngl2}){
    return (
        rectAngl1.hand.position.x + rectAngl1.hand.width >= rectAngl2.position.x &&
        rectAngl1.hand.position.x <= rectAngl2.position.x &&
        rectAngl1.hand.position.y + rectAngl1.hand.height >= rectAngl2.hand.position.y
    )
}*/

let lastkeys
function animation(){
    window.requestAnimationFrame(animation);
    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width, canvas.height)
    backGround.update()
    //test.update()
    player.update()
    player2.update()

    player.velocity.x = 0
    player2.velocity.x = 0

    // player1 move
    player.image = player.sprites.Idle.image
    player.maxFrame = player.sprites.Idle.maxFrame
    if(keys.a.press && lastkeys === 'a'){
        player.image = player.sprites.RunLeft.image
        player.maxFrame = player.sprites.RunLeft.maxFrame
        player.velocity.x = -5
    }else if(keys.d.press && lastkeys === 'd'){
        player.velocity.x = 5
        player.image = player.sprites.Run.image
        player.maxFrame = player.sprites.Run.maxFrame
    }else if(keys.w.press && lastkeys === 'w'){
        player.image = player.sprites.Up.image
        player.maxFrame = player.sprites.Up.maxFrame
        player.velocity.y = -12
    }else if(player.dmg || player.attackAnim){
        player.image = player.sprites.Attack.image
        player.maxFrame = player.sprites.Attack.maxFrame
    }else if(player.playerHealth <= 1){
        player.image = player.sprites.Death.image
        player.maxFrame = player.sprites.Death.maxFrame
    }


    //player2 move
    player2.image = player2.sprites.Idle.image
    player2.maxFrame = player2.sprites.Idle.maxFrame
    if(keys.ArrowLeft.press && lastkeys === 'ArrowLeft'){
        player2.velocity.x = -5
        player2.image = player2.sprites.Run.image
        player2.maxFrame = player2.sprites.Run.maxFrame
    }else if(keys.ArrowRight.press && lastkeys === 'ArrowRight'){
        player2.velocity.x = 5
        player2.image = player2.sprites.RunLeft.image
        player2.maxFrame = player2.sprites.RunLeft.maxFrame
    }else if(keys.ArrowUp.press && lastkeys === 'ArrowUp'){
        player2.velocity.y = -12
        player2.image = player2.sprites.Up.image
        player2.maxFrame = player2.sprites.Up.maxFrame
    }else if(player2.dmg || player2.attackAnim){
        player2.image = player2.sprites.Attack.image
        player2.maxFrame = player2.sprites.Attack.maxFrame
    }else if(player2.playerHealth <= 1){
        player2.image = player2.sprites.Death.image
        player2.maxFrame = player2.sprites.Death.maxFrame
    }

    //player1 hit 
    if(player.dmg){
        if(player.hand.position.x + player.hand.width >= player2.position.x &&
            player.hand.position.x <= player2.position.x &&
            player.hand.position.y + player.hand.height >= player2.hand.position.y)
        {
            player2.playerHealth -= 5
            player.dmg = false
            document.getElementById("player2Health").style.width = player2.playerHealth + '%';
            winnerWhenHealthOut();
    }
}


    if(player2.dmg){
        if(player2.hand.position.x + player2.dir.x <= player.position.x + player.width &&
            player2.hand.position.x >= player.position.x &&
            player.hand.position.y + player.hand.height >= player2.hand.position.y)
            {
             player.playerHealth -= 5
             player2.dmg = false
             document.getElementById("player1Health").style.width = player.playerHealth + '%';
             winnerWhenHealthOut()
        }
    }
}

animation()

window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'a': keys.a.press = true; lastkeys = 'a' 
        break 
        case 'd': keys.d.press = true; lastkeys = 'd'
        break
        case 'w': keys.w.press = true; lastkeys = 'w'
        break
        case ' ': player.attackDmg();
    }
    
    switch(event.key){
        case 'ArrowRight': keys.ArrowRight.press = true; lastkeys ='ArrowRight'
        break
        case 'ArrowLeft': keys.ArrowLeft.press = true; lastkeys = 'ArrowLeft'
        break
        case 'ArrowUp': keys.ArrowUp.press = true; lastkeys = 'ArrowUp'
        break
        case 'ArrowDown': player2.attackDmg();
        }

})

window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'a': keys.a.press = false;
        break 
        case 'd': keys.d.press = false; 
        break
        case 'w': keys.w.press = false;
        break
        case ' ': testasdasd1 = 0
    }

     
    switch(event.key){
        case 'ArrowRight': keys.ArrowRight.press = false;
        break
        case 'ArrowLeft': keys.ArrowLeft.press = false;
        break
        case 'ArrowUp': keys.ArrowUp.press = false;
        break
    }
})









