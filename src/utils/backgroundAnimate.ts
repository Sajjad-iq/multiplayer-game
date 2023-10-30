const backGroundLayer1 = new Image()
backGroundLayer1.src = "sky.webp"
const backGroundLayer2 = new Image()
backGroundLayer2.src = "rocks.webp"
const backGroundLayer3 = new Image()
backGroundLayer3.src = "plant.webp"
const backGroundLayer4 = new Image()
backGroundLayer4.src = "ground_3.webp"
const backGroundLayer5 = new Image()
backGroundLayer5.src = "ground_2.webp"
const backGroundLayer6 = new Image()
backGroundLayer6.src = "ground_1.webp"
const backGroundLayer7 = new Image()
backGroundLayer7.src = "clouds_2.webp"
const backGroundLayer8 = new Image()
backGroundLayer8.src = "clouds_1.webp"


class layer {

    x: number
    y: number
    width: number
    height: number
    x2: number
    image: string
    speedModifier: number
    gameSpeed: number
    ctx: any
    speed: number

    constructor(image: any, speedModifier: number, ctx: any, gameSpeed: number) {
        this.x = 0
        this.y = 0
        this.width = 2400
        this.height = 700
        this.x2 = this.width
        this.image = image
        this.speedModifier = speedModifier
        this.gameSpeed = gameSpeed
        this.ctx = ctx
        this.speed = this.gameSpeed * this.speedModifier
    }

    update() {
        this.speed = this.gameSpeed * this.speedModifier
        if (this.x <= -this.width) { this.x = this.width + this.x2 - this.speed }
        if (this.x2 <= -this.width) { this.x2 = this.width + this.x - this.speed }

        this.x = Math.floor(this.x - this.speed)
        this.x2 = Math.floor(this.x2 - this.speed)
    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        this.ctx.drawImage(this.image, this.x2, this.y, this.width, this.height)
    }
}


export class BackgroundAnimate {

    layer1: any
    layer2: any
    layer3: any
    layer4: any
    layer5: any
    layer6: any
    layer7: any
    layer8: any

    constructor(backgroundSpeed: number, ctx: any) {

        this.layer1 = new layer(backGroundLayer1, 0, ctx, backgroundSpeed)
        this.layer2 = new layer(backGroundLayer2, 0, ctx, backgroundSpeed)
        this.layer3 = new layer(backGroundLayer3, 0, ctx, backgroundSpeed)
        this.layer4 = new layer(backGroundLayer4, 0.6, ctx, backgroundSpeed)
        this.layer5 = new layer(backGroundLayer5, 0.4, ctx, backgroundSpeed)
        this.layer6 = new layer(backGroundLayer6, 0.1, ctx, backgroundSpeed)
        this.layer7 = new layer(backGroundLayer7, 0.8, ctx, backgroundSpeed)
        this.layer8 = new layer(backGroundLayer8, 0.4, ctx, backgroundSpeed)
    }

    backgroundAnimateAndDraw() {
        this.layer1.draw()
        this.layer8.update()
        this.layer8.draw()
        this.layer2.draw()
        this.layer3.draw()
        this.layer7.update()
        this.layer7.draw()
        this.layer5.update()
        this.layer5.draw()
        this.layer6.draw()
        this.layer4.update()
        this.layer4.draw()
    }
}
