/* eslint-disable @typescript-eslint/no-explicit-any */
import { useActionState } from "react"
import { SkillsInput } from "./SkillInput"
import { useAppDispatch, useAppSelector } from "../hook"
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../features/user/userSlice";

const EditProfile = () => {
  const user = useAppSelector((store) => store.user.data?.userData);
  const dispatch = useAppDispatch();
  const handlesubmit = async (_previousData:any, formData:FormData) =>{
    const payload = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      gender: formData.get("gender") as "male" | "female",
      skills: formData.getAll("skills") as string[],
      about: formData.get("about") as string,
      imgUrl: formData.get("imgUrl") as string,
    };
  
    try {
      const res = await axios.put(
        `${BASE_URL}/profile/edit`,payload,
        { withCredentials: true }
      );
  
      console.log("Profile updated:", res.data);
      dispatch(addUser(res.data));
      //return res.data; // If using useActionState, this becomes the new `previousData`
    } catch (error) {
      console.error("Error updating profile:", error);
      return { error: "Failed to update profile" };
    }
  }
  const [data, formAction, isPending] = useActionState(handlesubmit, undefined);
  console.log("data",data);
  return (
    <div className="max-w-[70rem] mx-auto flex justify-center items-center py-10">
      <form action={formAction} className="w-3/4">
      <div className="card bg-zinc-950 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold">Edit Profile</h2>
          <div>
            <div className="flex items-center gap-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-white">First Name</span>
                </div>
                <input
                  type="text"
                  name="firstName"
                  defaultValue={user?.firstName}
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
                  defaultValue={user?.lastName}
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
                  <span className="label-text text-white">Gender</span>
                </div>
                <select className="select select-bordered w-full bg-zinc-700" name="gender" defaultValue={user?.gender}>
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
                  defaultValue={user?.age}
                  placeholder="Enter your age"
                  className="input input-bordered w-full bg-zinc-700"
                  //value={postInputs.password}
                  // onChange={(e) => setPostInputs({
                  //   ...postInputs,
                  //   password:e.target.value})}
                />
              </label>
            </div>
            <SkillsInput skill={user?.skills}/>
            <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-white">Image URL</span>
                </div>
                <input
                  type="text"
                  name="imageUrl"
                  defaultValue={user?.imgUrl}
                  placeholder="Enter ImgURL"
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
                  <span className="label-text text-white">About</span>
                </div>
                <textarea className="textarea textarea-primary bg-zinc-700" placeholder="About" name="about" defaultValue={user?.about}></textarea>
            </label>
          </div>
          <div className="card-actions w-full justify-center">
            <button 
              disabled={isPending}
              type="submit"
              className="w-full btn btn-primary"
              onClick={() => handlesubmit}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      </form>
    </div>
  )
}

export default EditProfile