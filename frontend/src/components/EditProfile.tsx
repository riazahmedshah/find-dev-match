/* eslint-disable @typescript-eslint/no-explicit-any */
import { useActionState } from "react"
import { SkillsInput } from "./SkillInput"

const EditProfile = () => {
  const handlesubmit = (previousData:any, formData:any) =>{
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const gender = formData.get("gender");
    const age = formData.get("age");
    const skills = formData.get("skills");
    const about = formData.get("about");
    console.log("fn called",firstName,lastName,gender,age, skills,about);
  }
  const [data, formAction, isPending] = useActionState(handlesubmit, undefined);
  console.log(data);
  return (
    <div className="max-w-[70rem] mx-auto h- flex justify-center items-center py-10">
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
                  <span className="label-text text-white">Gender</span>
                </div>
                <select className="select select-bordered w-full bg-zinc-700" name="gender">
                  <option disabled selected>Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
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
                  //value={postInputs.password}
                  // onChange={(e) => setPostInputs({
                  //   ...postInputs,
                  //   password:e.target.value})}
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
                <textarea className="textarea textarea-primary bg-zinc-700" placeholder="About" name="about"></textarea>
            </label>
          </div>
          <div className="card-actions w-full justify-center">
            <button 
              disabled={isPending}
              className="w-full btn btn-primary"
              //onClick={handleSignin}
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