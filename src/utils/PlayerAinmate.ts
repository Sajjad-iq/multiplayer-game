import { idle } from "../assets"

export class Character {

    x: number
    y: number
    image: any
    spriteWidth: number
    spriteHeight: number
    width: number
    height: number
    ctx: any
    FrameX: number
    flapSpeed: number
    gameFrame: number
    CharacterImages: any
    lose: boolean
    playerId: string

    constructor(ctx: any, x: number, y: number, CharacterImages: any, lose: boolean, flapSpeed: number, playerId: string) {
        this.spriteWidth = 128
        this.spriteHeight = 128
        this.width = this.spriteWidth * 1.1
        this.height = this.spriteHeight * 1.1
        this.x = x - this.width / 2
        this.y = y - this.height / 2
        this.image = new Image()
        this.ctx = ctx
        this.FrameX = 0
        this.flapSpeed = flapSpeed
        this.gameFrame = 0
        this.CharacterImages = CharacterImages
        this.lose = lose
        this.playerId = playerId
    }

    update() {
        if (this.gameFrame % this.flapSpeed === 0) {
            if (this.lose) this.FrameX >= this.CharacterImages.length - 1 ? this.FrameX = 6 : this.FrameX++
            this.FrameX >= this.CharacterImages.length - 1 ? this.FrameX = 0 : this.FrameX++
        }
        this.gameFrame++
    }

    draw() {
        if (this.CharacterImages.length === 4) {
            if (this.FrameX >= 3) this.CharacterImages = idle
            else this.image.src = this.CharacterImages[this.FrameX]
        }
        else this.image.src = this.CharacterImages[this.FrameX]

        this.ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
}


