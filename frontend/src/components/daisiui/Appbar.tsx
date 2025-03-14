import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hook";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { removeUser } from "../../features/user/userSlice";
import { clearFeed } from "../../features/feed/feedSlice";
import { clearConnections } from "../../features/connection/getConnectionSlice";
import { clearRequests } from "../../features/connection/requsetSice";

export const Appbar = () => {
  const user = useAppSelector((store) => store.user?.data?.userData);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const handleLogout = async() =>{
    await axios.post(BASE_URL+"/auth/logout",{},{withCredentials:true});
    dispatch(removeUser());
    dispatch(clearFeed());
    dispatch(clearConnections());
    dispatch(clearRequests());
    navigate("/login");
  }
  return (
    <div className="bg-zinc-950">
      <div className="navbar  md:px-16 px-2 py-4 max-w-[85rem] mx-auto">
          <div className="flex-1">
            <Link to="/" className="font-sigmar text-4xl font-semibold tracking-wider  bg-[linear-gradient(60deg,_rgb(247,_149,_51),_rgb(243,_112,_85),_rgb(239,_78,_123),_rgb(161,_102,_171),_rgb(80,_115,_184),_rgb(16,_152,_173),_rgb(7,_179,_155),_rgb(111,_186,_130))]  bg-clip-text text-transparent">
              fin<span className="text-5xl">dD</span>ev
            </Link>
          </div>
          <div className="flex-none gap-2">
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar w-16"
                >
                  <div className="rounded-full">
                    <img
                      className=""
                      alt="profile"
                      src={user?.imgUrl} 
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-zinc-950 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    { location.pathname === "/profile" ? 
                      (
                        <Link to="/edit-profile" className="justify-between">
                          edit Profile
                        </Link>
                      ): (
                        <Link to="/profile" className="justify-between">
                          Profile
                        </Link>
                      )
                    }
                  </li>
                  <li>
                    <div onClick={handleLogout}>logout</div>
                  </li>
                  <li>
                    <Link to="/connections">connections</Link>
                  </li>
                  <li>
                    <Link to="/requests"> requests</Link>
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
    </div>
  );
};
