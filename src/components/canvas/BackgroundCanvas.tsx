interface Props {
    Ref: any
}
const BackgroundCanvas = (props: Props) => {
    return (
        <canvas ref={props.Ref}></canvas>
    )
}

export default BackgroundCanvas
