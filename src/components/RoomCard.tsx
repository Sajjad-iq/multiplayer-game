import { MouseEventHandler } from "react"

interface Props {
  roomName: string
  roomPlayers: number
  onClick: MouseEventHandler
}
export const RoomCard = (props: Props) => {
  return (
    <button onClick={props.onClick} className=" flex justify-between items-center w-full py-1 px-3 border-x-4 border-x-white mb-2 hover:border-x-teal-500 cursor-pointer">
      <h1 >{props.roomName}</h1>

      <section className="flex  justify-center items-center">
        <section className="flex mx-2">
          <p className="">{props.roomPlayers + "/32"}</p>
        </section>
        <div className={` w-3 h-3 rounded-full  ${props.roomPlayers > 0 ? " bg-lime-500" : "bg-gray-500"}`}></div>
      </section>
    </button >
  )
}
