import { Outlet, useNavigate } from "react-router-dom"
import { Appbar } from "./daisiui/Appbar"
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useAppDispatch, useAppSelector } from "../hook"
import { addUser } from "../features/user/userSlice"
import { useCallback, useEffect } from "react"

const Body = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user)
  const fetchUser = useCallback( async() => {
    try {
      const res = await axios.get(BASE_URL+"/profile/view",{withCredentials:true});
      //console.log(res.data);
      dispatch(addUser(res.data));
    } catch (error) {
      if(error instanceof Error){
        if(error.message === "Request failed with status code 400"){
          navigate("/login");
        }
        //console.log("ERROR "+error.message);
      } else{
        console.log("Unkown error!")
      }
    }
  },[dispatch, navigate]);

  useEffect(() => {
    fetchUser();
  },[fetchUser]);

  useEffect(()=>{
    if(!user.data?.userData){
      navigate("/login");
    }
  },[navigate, user])
  
  
  return (
    <div>
      <Appbar/>
      <Outlet/>
    </div>
  )
}

export default Body