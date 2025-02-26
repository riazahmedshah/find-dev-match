import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useActionState } from "react";
import { SkillsInput } from "./SkillInput";
import { useAppDispatch } from "../hook";
import { addUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handlesubmit = async (_previousData:unknown, formData:FormData) =>{
    const payload = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email:formData.get("email") as string,
      password:formData.get("password") as string,
      age:Number(formData.get("age")),
      gender: formData.get("gender") as "male" | "female",
      skills: formData.getAll("skills") as string[],
      about: formData.get("about") as string,
      imgUrl: formData.get("imageUrl") as string
    };
  
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/signup`,payload,
        { withCredentials: true }
      );
  
      //console.log("signpu:", res.data);
      dispatch(addUser(res.data));
      navigate("/");
      return res.data; // If using useActionState, this becomes the new `previousData`
    } catch (error) {
      if(error instanceof Error){
        console.error(error);
        navigate("/login");
      } else{
        console.log("Unknown error happened, try again!")
      }
    }
  }
  const [data, formAction, isPending] = useActionState(handlesubmit, undefined);
  console.log("data",data);
  return (
    <div className="max-w-[70rem] mx-auto flex justify-center items-center py-10">
          <form action={formAction} className="w-3/4">
          <div className="card bg-zinc-950 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center text-2xl font-bold">SIGN UP - FORM</h2>
              <div>
                <div className="flex items-center gap-4">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-white">First Name</span>
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Enter FirstName"
                      className="input input-bordered w-full bg-zinc-700"
                      //value={postInputs.email}
                      onChange={() => {
                        // setPostInputs({
                        //   ...postInputs, 
                        //   email:e.target.value
                        // })
                      }}
                    />
                  </label>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-white">Last Name</span>
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Enter LastName"
                      className="input input-bordered w-full bg-zinc-700"
                      //value={postInputs.password}
                      // onChange={(e) => setPostInputs({
                      //   ...postInputs,
                      //   password:e.target.value})}
                    />
                  </label>
                </div>
                <div className="flex items-center gap-4">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-white">Email</span>
                    </div>
                    <input
                      type="text"
                      name="email"
                      placeholder="user@examaple.com"
                      className="input input-bordered w-full bg-zinc-700"
                    />
                  </label>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-white">Password</span>
                    </div>
                    <input
                      type="text"
                      name="password"
                      placeholder="123456"
                      className="input input-bordered w-full bg-zinc-700"
                    />
                  </label>
                </div>
                <div className="flex items-center gap-4">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-white">Gender</span>
                    </div>
                    <select className="select select-bordered w-full bg-zinc-700" name="gender" >
                      <option  disabled selected>Select gender</option>
                      <option>male</option>
                      <option>female</option>
                    </select>
                  </label>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-white">Age</span>
                    </div>
                    <input
                      type="number"
                      name="age"
                      placeholder="Enter your age"
                      className="input input-bordered w-full bg-zinc-700"
                    />
                  </label>
                </div>
                <SkillsInput />
                <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-white">Image URL</span>
                    </div>
                    <input
                      type="text"
                      name="imageUrl"
                      placeholder="Enter ImgURL"
                      className="input input-bordered w-full bg-zinc-700"
                    />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-white">About</span>
                    </div>
                    <textarea className="textarea textarea-primary bg-zinc-700" placeholder="About" name="about" ></textarea>
                </label>
              </div>
              <div className="card-actions w-full justify-center">
                <button 
                  disabled={isPending}
                  type="submit"
                  className="w-full btn btn-primary"
                  onClick={() => handlesubmit}
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
          </form>
        </div>
  )
}

export default Signup