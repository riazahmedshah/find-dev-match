import { Outlet } from "react-router-dom"
import { Appbar } from "./daisiui/Appbar"

const Body = () => {
  return (
    <div>
      <Appbar/>
      <Outlet/>
    </div>
  )
}

export default Body