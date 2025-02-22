import { Link } from "react-router-dom"
import { useAppSelector } from "../../hook"

export const Appbar = () => {
  // const handleLogout = async() =>{
  //   await axios.post(BASE_URL+"/auth/logout");
  // } 
  const user = useAppSelector((store) => store.user)
  return(
    <div className="navbar bg-base-200 px-4 py-1">
  <div className="flex-1">
    <Link to="/" className="text-xl">daisyUI</Link>
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 bg-black rounded-full">
          <h1 className="text-white">{user.data?.firstName?.charAt(1) || "Login"}</h1>
          {/* <img
            alt="Tailwind CSS Navbar component"
            src={user.} /> */}
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li>logout</li>
      </ul>
    </div>
  </div>
</div>
  )
}