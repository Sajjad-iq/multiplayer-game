
interface Props {
    Ref: any
}
export const BulletsCanvas = (props: Props) => {
    return (
        <canvas ref={props.Ref}></canvas>
    )
}

