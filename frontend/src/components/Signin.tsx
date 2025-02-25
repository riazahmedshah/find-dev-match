import axios from "axios";
import { useEffect, useState } from "react";
import { SigninSchemaType } from "../types/signinTypes";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useAppDispatch, useAppSelector } from "../hook";
import { addUser } from "../features/user/userSlice";

const Signin = () => {
  const [postInputs, setPostInputs] = useState<SigninSchemaType>({
    email:"test03@gmail.com",
    password:"123456",
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const user = useAppSelector((store) => store.user)
  const handleSignin = async() => {
    try {
      const res = await axios.post(BASE_URL + "/auth/signin",postInputs,{
        withCredentials:true
      });
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      if(error instanceof Error){
        console.error(error);
        navigate("/login");
      } else{
        console.log("Unknown error happened, try again!")
      }
    }
  }

  useEffect(() => {
    if (user.data?.userData) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-cyan-100 via-blue-300 to-indigo-400">
      <div className="card bg-zinc-800 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold">Sign In</h2>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-white">Email</span>
              </div>
              <input
                type="text"
                placeholder="Enter Email"
                className="input input-bordered w-full max-w-xs bg-zinc-700"
                value={postInputs.email}
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs, 
                    email:e.target.value
                  })
                }}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-white">Password</span>
              </div>
              <input
                type="text"
                placeholder="Enter password"
                className="input input-bordered w-full max-w-xs bg-zinc-700"
                value={postInputs.password}
                onChange={(e) => setPostInputs({
                  ...postInputs,
                  password:e.target.value})}
              />
            </label>
            <p className="py-3 text-zinc-400">
              Not registered yet? <Link to="/signup">Sign up</Link>           
            </p>
          </div>
          <div className="card-actions w-full justify-center">
            <button 
              className="w-full btn btn-primary"
              onClick={handleSignin}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
