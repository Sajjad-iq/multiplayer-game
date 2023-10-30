import { useContext, useEffect, useRef } from "react"
import { idle, attack, idle_rev, attack_rev } from "../assets"
import { BackgroundAnimate, Character, MagicBullets } from "../utils"
import { GlobalContext } from "../context"
import { SocketIoActions } from "./SocketIoActions"


export const GameBehavior = () => {

    const BgCanvasRef = useRef<HTMLCanvasElement | null>(null)
    const PlayersCanvasRef = useRef<HTMLCanvasElement | null>(null)
    const BulletsCanvasRef = useRef<HTMLCanvasElement | null>(null)
    const CanvasWidth = 2400
    const CanvasHeight = 700
    const { socket } = useContext(GlobalContext)
    const prevXRef = useRef<any>(null)
    const { move, startAttack } = SocketIoActions()



    useEffect(() => {

        let directions = 'left'
        // magicBullets
        let BulletsArr: any = []

        function handleMouseClick(e: any) {
            startAttack({ x: e.offsetX, y: e.offsetY, directions: directions, bullets: BulletsArr })
            BulletsArr.push(new MagicBullets(MagicBulletsCtx, e.offsetY, directions === 'left' ? e.offsetX - Player.width * 1.5 : e.offsetX - Player.width / 4, CanvasWidth, directions))
            Player = new Character(PlayerCtx, e.offsetX, e.offsetY, directions === 'left' ? attack_rev : attack, false, 7)
        }

        function handleMouseMove(e: any) {
            const currentX = e.clientX;
            if (prevXRef.current !== null) {
                if (currentX < prevXRef.current) {
                    directions = "left"
                    Player = new Character(PlayerCtx, e.offsetX, e.offsetY, idle_rev, false, 7)
                }
                else if (currentX > prevXRef.current) {
                    directions = 'right'
                    Player = new Character(PlayerCtx, e.offsetX, e.offsetY, idle, false, 7)
                }
            }
            prevXRef.current = currentX;
            move({ x: e.offsetX, y: e.offsetY, directions: directions })
        }

        if (!socket) return;
        if (!BgCanvasRef.current) return;
        if (!PlayersCanvasRef.current) return;
        if (!BulletsCanvasRef.current) return;

        // Join the game
        const playerName = prompt('Enter your name:');
        const room = prompt('Enter your room:');
        socket.emit('join', { playerName, room });

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

        const Background = new BackgroundAnimate(5, BgCtx)
        let Player = new Character(PlayerCtx, 0, 0, idle, false, 7)
        let EnemyPlayer = new Character(PlayerCtx, 0, 0, idle, false, 7)


        //for player moving
        document.addEventListener('mousemove', handleMouseMove);

        //for player attack
        document.addEventListener("click", handleMouseClick)

        socket.on('playerCoordinates', ({ playerId, x, y, direction }: any) => {
            if (playerId !== socket.id) {
                // Store the other player's coordinates
                EnemyPlayer = new Character(PlayerCtx, x, y, direction == "left" ? idle_rev : idle, false, 7)
            }
        });

        // attack
        socket.on('magicBullets', ({ playerId, x, y, direction }: any) => {
            if (playerId !== socket.id) {
                // Store the other player's coordinates
                BulletsArr.push(new MagicBullets(MagicBulletsCtx, y, direction === 'left' ? x - Player.width * 1.5 : x - Player.width / 4, CanvasWidth, direction))
                EnemyPlayer = new Character(PlayerCtx, x, y, direction == "left" ? attack_rev : attack, false, 7)
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
            /* Background.backgroundAnimateAndDraw() */
            Player.draw()
            Player.update()
            EnemyPlayer.draw()
            EnemyPlayer.update()

            // bullets
            BulletsArr.forEach((e: any) => {
                e.update()
                e.draw()
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
