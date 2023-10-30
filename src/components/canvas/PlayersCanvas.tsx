interface Props {
    Ref: any
}
const PlayersCanvas = (props: Props) => {
    return (
        <canvas ref={props.Ref}></canvas>
    )
}

export default PlayersCanvas
