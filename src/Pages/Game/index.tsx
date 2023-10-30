import { BackgroundCanvas, BulletsCanvas, PlayersCanvas } from "../../components/canvas";
import { GameBehavior } from "../../hooks";


export default function Game() {

    const { BgCanvasRef, PlayersCanvasRef, BulletsCanvasRef } = GameBehavior()

    return (
        <section>
            <BackgroundCanvas Ref={BgCanvasRef} />
            <PlayersCanvas Ref={PlayersCanvasRef} />
            <BulletsCanvas Ref={BulletsCanvasRef} />
        </section>
    )
}
