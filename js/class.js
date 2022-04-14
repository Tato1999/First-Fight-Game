class sprite  {
    constructor ({position, imageSrc, scale = 1, maxFrame=1, changeFrame}){
        this.position = position
        this.height = 170
        this.width = 70
        this.image = new Image()
        this.image.src = imageSrc;
        this.scale = scale
        this.maxFrame = maxFrame
        this.changeFrame = changeFrame
        this.delay = 0
        this.delayHold = 20
    }
    draw(){
        c.drawImage(
            this.image,
            this.changeFrame*(this.image.width/this.maxFrame),
            0,
            this.image.width/this.maxFrame,
            this.image.height,
            this.position.x,
            this.position.y,
            (this.image.width/this.maxFrame) * this.scale,
            this.image.height * this.scale,
        )
    }
    
    update() {
        this.draw()
        this.delay++
        if(this.delay % this.delayHold === 0){
        if(this.changeFrame < this.maxFrame -5){
            this.changeFrame++
            }else{
                this.changeFrame = 0
            }
          }
        }
    }
  


  class Boxer {
    constructor ({position, velocity, color = 'red',sprites, dir, scale, imageSrc, maxFrame,changeFrame}){
        this.position = position
        this.velocity = velocity
        this.height = 170
        this.width = 70
        this.gravity = 0.5
        this.dir = dir
        this.hand = {
            position: this.position,
            width: 150,
            height: 50
        }
        this.color = color
        this.dmg = false;
        this.attackAnim = false;
        this.playerHealth = 100
        this.image = new Image(),
        this.image.src = imageSrc,
        this.scale = scale,
        this.maxFrame = maxFrame,
        this.changeFrame = changeFrame,
        this.delay = 0,
        this.delayHold = 5,

        this.sprites = sprites

        for(const sprite in this.sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
            sprites[sprite].maxFrame = sprites[sprite].maxFrame
        }
        
  console.log(this.sprites)
    }
    draw(){
        c.drawImage(
            this.image,
            this.changeFrame*(this.image.width/this.maxFrame),
            0,
            this.image.width/this.maxFrame,
            this.image.height,
            (this.position.x-this.dir.x),
            this.position.y-this.dir.y,
            (this.image.width/this.maxFrame) * this.scale,
            this.image.height * this.scale,
            )
        //handt
        if(this.dmg){
           // c.fillStyle = 'green'
            //c.fillRect(this.hand.position.x + this.dir.x, this.hand.position.y, this.hand.width, this.hand.height)
        }
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0;
        }else{
            this.velocity.y += this.gravity
        }
        this.delay++
        if(this.delay % this.delayHold === 0){
        if(this.changeFrame < this.maxFrame -1){
            this.changeFrame++
            }else{
                if(player2.playerHealth > 1){
                    this.changeFrame = 0
                }
            }
        }
    }

        //attack enemy 
        attackDmg(){ 
            this.dmg = true
            this.attackAnim = true
            setTimeout(() => {
               this.dmg = false
               this.attackAnim = false
         }, 500)  
    }
  }
  function restart(){
      
    if(player.playerHealth ==  0 || player2.playerHealth == 0){
        setTimeout(() => {
            window.location.reload()
        }, 700)
    }
  }