import { useRef, useEffect } from "react"
import { BackgroundAnimate } from "../utils"

export const HomeBackgroundAnimation = () => {

    const BgCanvasRef = useRef<HTMLCanvasElement | null>(null)
    const CanvasWidth = 2400
    const CanvasHeight = 700

    useEffect(() => {

        if (!BgCanvasRef.current) return;

        // configurations
        const BgCtx = BgCanvasRef.current.getContext("2d")
        BgCanvasRef.current.width = CanvasWidth
        BgCanvasRef.current.height = CanvasHeight

        const Background = new BackgroundAnimate(2, BgCtx)

        // animate function
        function animate() {

            //clear canvas
            if (!BgCanvasRef.current) return

            // draw on canvas
            Background.backgroundAnimateAndDraw()

            // animation loop
            requestAnimationFrame(animate)
        }

        animate()


    }, [])
    return { BgCanvasRef }
}
