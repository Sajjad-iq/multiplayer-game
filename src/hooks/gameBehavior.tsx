import { useContext, useEffect, useRef } from "react"
import { idle, attack, idle_rev, attack_rev } from "../assets"
import { BackgroundAnimate, Character, MagicBullets } from "../utils"
import { GlobalContext } from "../context"
import { SocketIoActions } from "./SocketIoActions"
import { useNavigate } from "react-router-dom"


export const GameBehavior = () => {

    const BgCanvasRef = useRef<HTMLCanvasElement | null>(null)
    const PlayersCanvasRef = useRef<HTMLCanvasElement | null>(null)
    const BulletsCanvasRef = useRef<HTMLCanvasElement | null>(null)
    const CanvasWidth = 2400
    const CanvasHeight = 700
    const { socket } = useContext(GlobalContext)
    const prevXRef = useRef<any>(null)
    const { move, startAttack } = SocketIoActions()
    const Navigate = useNavigate()



    useEffect(() => {

        if (!socket) return
        let mouseDirection = 'left'
        // magicBullets
        let BulletsArr: any = []

        function handleMouseClick(e: any) {
            startAttack({ x: e.offsetX, y: e.offsetY, mouseDirection: mouseDirection, bullets: BulletsArr })
            BulletsArr.push(new MagicBullets(MagicBulletsCtx, e.offsetY, mouseDirection === 'left' ? e.offsetX - Player.width * 1.5 : e.offsetX - Player.width / 4, CanvasWidth, mouseDirection))
            Player = new Character(PlayerCtx, e.offsetX, e.offsetY, mouseDirection === 'left' ? attack_rev : attack, false, 15, socket.id)
        }

        function handleMouseMove(e: any) {
            const currentX = e.clientX;
            if (prevXRef.current !== null) {
                if (currentX < prevXRef.current) {
                    mouseDirection = "left"
                    Player = new Character(PlayerCtx, e.offsetX, e.offsetY, idle_rev, false, 15, socket.id)
                }
                else if (currentX > prevXRef.current) {
                    mouseDirection = 'right'
                    Player = new Character(PlayerCtx, e.offsetX, e.offsetY, idle, false, 15, socket.id)
                }
            }
            prevXRef.current = currentX;
            move({ x: e.offsetX, y: e.offsetY, mouseDirection: mouseDirection })
        }

        if (!BgCanvasRef.current) return;
        if (!PlayersCanvasRef.current) return;
        if (!BulletsCanvasRef.current) return;

        // configurations
        const BgCtx = BgCanvasRef.current.getContext("2d")
        BgCanvasRef.current.width = CanvasWidth
        BgCanvasRef.current.height = CanvasHeight

        const PlayerCtx = PlayersCanvasRef.current.getContext("2d")
        PlayersCanvasRef.current.width = CanvasWidth
        PlayersCanvasRef.current.height = CanvasHeight

        const MagicBulletsCtx = BulletsCanvasRef.current.getContext("2d")
        BulletsCanvasRef.current.width = CanvasWidth
        BulletsCanvasRef.current.height = CanvasHeight

        const Background = new BackgroundAnimate(2, BgCtx)
        let Player = new Character(PlayerCtx, 0, 0, idle, false, 15, socket.id)
        let EnemyPlayer = new Character(PlayerCtx, 0, 0, idle, false, 15, "")


        //for player moving
        document.addEventListener('mousemove', handleMouseMove);

        //for player attack
        document.addEventListener("click", handleMouseClick)



        socket.on('playerCoordinates', ({ playerId, x, y, direction }: any) => {
            if (playerId !== socket.id) {
                // Store the other player's coordinates
                EnemyPlayer = new Character(PlayerCtx, x, y, direction == "left" ? idle_rev : idle, false, 15, playerId)
            }
        });


        // attack
        socket.on('magicBullets', ({ playerId, x, y, direction }: any) => {
            if (playerId !== socket.id) {
                // Store the other player's coordinates
                BulletsArr.push(new MagicBullets(MagicBulletsCtx, y, direction === 'left' ? x - Player.width * 1.5 : x - Player.width / 4, CanvasWidth, direction))
                EnemyPlayer = new Character(PlayerCtx, x, y, direction == "left" ? attack_rev : attack, false, 15, playerId)
            }
        });


        socket.on('winnerPlayer', (winnerPlayerId: string) => {
            if (winnerPlayerId == socket.id) {
                Navigate("/win")
            } else {
                Navigate("/lose")
            }
        });



        // animate function
        function animate() {

            //clear canvas
            if (!BgCanvasRef.current) return
            if (!PlayersCanvasRef.current) return
            BgCtx?.clearRect(0, 0, BgCanvasRef.current?.width, BgCanvasRef.current?.height)
            PlayerCtx?.clearRect(0, 0, PlayersCanvasRef.current?.width, PlayersCanvasRef.current?.height)
            MagicBulletsCtx?.clearRect(0, 0, PlayersCanvasRef.current?.width, PlayersCanvasRef.current?.height)

            // draw on canvas
            Background.backgroundAnimateAndDraw()
            Player.draw()
            Player.update()
            EnemyPlayer.draw()
            EnemyPlayer.update()

            // bullets
            BulletsArr.forEach((bullet: any) => {
                bullet.update()
                bullet.draw()
                if (bullet.x < EnemyPlayer.x + EnemyPlayer.width / 2 &&
                    bullet.x + bullet.width / 2 > EnemyPlayer.x &&
                    bullet.y < EnemyPlayer.y + EnemyPlayer.height / 2 &&
                    bullet.y + bullet.height / 2 > EnemyPlayer.y) {

                    socket.emit("win", socket.id)
                }
            })
            BulletsArr = BulletsArr.filter((e: any) => !e.markedForDeletion)

            // animation loop
            requestAnimationFrame(animate)
        }

        animate()


        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener("click", handleMouseClick)
        };


    }, [socket])


    return { BgCanvasRef, PlayersCanvasRef, BulletsCanvasRef }
}
