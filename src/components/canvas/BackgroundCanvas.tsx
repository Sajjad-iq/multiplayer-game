interface Props {
    Ref: any
    style?: {}
}
const BackgroundCanvas = (props: Props) => {
    return (
        <canvas style={props.style} ref={props.Ref}></canvas>
    )
}

export default BackgroundCanvas
