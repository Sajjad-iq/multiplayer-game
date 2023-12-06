import { useContext } from "react";
import { BackgroundCanvas, BulletsCanvas, PlayersCanvas } from "../../components/canvas";
import { GameBehavior } from "../../hooks";
import { GlobalContext } from "../../context";


export default function Game() {

    const { BgCanvasRef, PlayersCanvasRef, BulletsCanvasRef } = GameBehavior()
    const { PlayerName } = useContext(GlobalContext)


    return (
        <section>
            < h1 className=" font-bold text-lg absolute z-20 top-5 left-5">{PlayerName}</h1>
            <BackgroundCanvas Ref={BgCanvasRef} />
            <PlayersCanvas Ref={PlayersCanvasRef} />
            <BulletsCanvas Ref={BulletsCanvasRef} />
        </section>
    )
}
