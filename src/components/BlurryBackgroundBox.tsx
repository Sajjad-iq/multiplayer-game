import { ReactNode } from "react"
interface Props {
    children: ReactNode
}
export const BlurryBackgroundBox = (props: Props) => {
    return (
        <section className="absolute-center blurryBg z-10 rounded-md p-4 w-8/12 lg:w-6/12 ">
            {props.children}
        </section>
    )
}
