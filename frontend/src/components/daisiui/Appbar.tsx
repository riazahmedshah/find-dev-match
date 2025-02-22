import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hook";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { removeUser } from "../../features/user/userSlice";

export const Appbar = () => {
  const user = useAppSelector((store) => store.user?.data?.userData);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = async() =>{
    await axios.post(BASE_URL+"/auth/logout",{},{withCredentials:true});
    dispatch(removeUser());
    navigate("/login");
  }
  return (
    <div className="navbar bg-base-200 px-10 py-3">
      <div className="flex-1">
        <Link to="/" className="font-sigmar text-3xl font-semibold tracking-wider bg-gradient-to-r from-purple-500 to-purple-900 bg-clip-text text-transparent">
          find<span className="">Dev</span> 
        </Link>
      </div>
      <div className="flex-none gap-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-20 rounded-full">
                <img
                  alt="profile"
                  src={user?.imgUrl} 
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <div onClick={handleLogout}>logout</div>
              </li>
            </ul>
          </div>
        ): (
          <div>
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};
