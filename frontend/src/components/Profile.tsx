import { useAppSelector } from "../hook";

const Profile = () => {
  const user = useAppSelector((store) => store.user.data?.userData);
  return (
    <div>
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 md:h-48 h-32">
        <div className="h-full flex text-center justify-center items-center">
          <h1 className="text-4xl font-thin text-white font-sigmar">
            Welcome to your Profile!
          </h1>
        </div>
        <div className="max-w-4xl mx-auto md:px-0 px-2">
          <div className="md:w-28 w-24 -my-10 border-2 border-white rounded-full">
            <img
              className="rounded-full w-28 h-28 object-contain"
              src={user?.imgUrl}
              alt="profile-img"
            />
          </div>
          <div className="px-5">
            <div className="flex items-center gap-4 pt-11">
              <p className="font-bold text-xl">
                {user?.firstName + " " + user?.lastName}
              </p>
              <p className="text-lg">{user?.age}</p>
            </div>
            <div>
              <p className="py-2 text-xl">{user?.gender}</p>
              <p className="font-bold text-xl pb-2">Interests</p>
              <div className="flex flex-wrap gap-2">
                {user?.skills?.map((skill) => (
                  <p
                    key={skill}
                    className="border border-white bg-zinc-600 rounded-3xl inline-block px-4 py-2"
                  >
                    {skill}
                  </p>
                ))}
              </div>
              <h3 className="text-xl font-bold pb-1 pt-3">About me</h3>
              <p className="max-w-[30rem]">{user?.about}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
