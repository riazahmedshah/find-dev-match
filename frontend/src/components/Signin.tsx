
import axios from "axios";

import { useState } from "react";
import { SigninSchemaType } from "../types/signinTypes";
import { useAppDispatch } from "../hook";
import { useNavigate } from "react-router-dom";
import { addUser } from "../features/user/userSlice";

const Signin = () => {
  const [postInputs, setPostInputs] = useState<SigninSchemaType>({
    email:"test03@gmail.com",
    password:"123456",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignin = async() => {
    const res = await axios.post("http://localhost:1100/auth/signin",postInputs,{
      withCredentials:true
    });

    console.log(res.data);
    dispatch(addUser(res.data));
    navigate("/");
  }

  return (
    <div className="h-screen flex justify-center items-center bg-base-300">
      <div className="card bg-base-200 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold">Sign In</h2>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="text"
                placeholder="Enter Email"
                className="input input-bordered w-full max-w-xs"
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
                <span className="label-text">Password</span>
              </div>
              <input
                type="text"
                placeholder="Enter password"
                className="input input-bordered w-full max-w-xs"
                value={postInputs.password}
                onChange={(e) => setPostInputs({
                  ...postInputs,
                  password:e.target.value})}
              />
            </label>
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
