/** @type {HTMLCanvasElement}*/

import { magicBullets } from "../assets"

export class MagicBullets {

    x: number
    y: number
    ctx: any
    speed: number
    markedForDeletion: boolean
    CanvasWidth: number
    spriteWidth: number
    spriteHeight: number
    width: number
    height: number
    FrameX: 0
    image: any
    flapSpeed: number
    gameFrame: number
    CharacterImages: any
    direction: string

    constructor(ctx: any, y: number, x: number, CanvasWidth: number, direction: string) {
        this.spriteWidth = 256
        this.spriteHeight = 256
        this.x = x
        this.y = y - this.spriteHeight / 2
        this.ctx = ctx
        this.speed = 10
        this.markedForDeletion = false
        this.CanvasWidth = CanvasWidth
        this.width = this.spriteWidth
        this.height = this.spriteHeight
        this.FrameX = 0
        this.image = new Image()
        this.flapSpeed = 6
        this.gameFrame = 0
        this.CharacterImages = magicBullets
        this.direction = direction

    }

    update() {
        this.direction === "left" ? this.x -= this.speed : this.x += this.speed

        if (this.gameFrame % this.flapSpeed === 0) {
            if (this.FrameX >= this.CharacterImages.length - 1) {
                this.FrameX = 0
                this.markedForDeletion = true
            } else this.FrameX++
        }
        this.gameFrame++
    }

    draw() {
        this.image.src = this.CharacterImages[this.FrameX]
        this.ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }

}


