import axios from "axios";
import { requestData } from "../../features/types";
import { BASE_URL } from "../../utils/constants";
import { useAppDispatch } from "../../hook";
import { removeRequser } from "../../features/connection/requsetSice";

const RequestComponent = ({_id,fromUserId} : requestData) => {
  // console.log(fromUserId);
  console.log(_id);
  const dispatch = useAppDispatch();
  const reviewRequest = async (status:string) => {
    try {
      const res = await axios.patch(`${BASE_URL}/request/review/${status}/${_id}`,{},{withCredentials:true});
      dispatch(removeRequser(_id));
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }
  return (
      <div className="user-list w-full max-w-lg mx-auto bg-zinc-950 rounded-xl shadow-xl flex flex-col space-x-4 py-4">
        <div className="user-row flex flex-col items-center justify-between cursor-pointer  p-4 duration-300 sm:flex-row sm:py-4 sm:px-8 hover:bg-zinc-800 space-x-10">
          <div className="user flex items-center text-center flex-col sm:flex-row sm:text-left">
            <div className="avatar-content mb-2.5 sm:mb-0 sm:mr-2.5">
              <img
                alt="progile-img"
                className="avatar w-20 h-20 rounded-full object-cover"
                src={fromUserId.imgUrl}
              />
            </div>
            <div className="user-body flex flex-col mb-4 sm:mb-0 sm:mr-4">
              <p className="title font-medium no-underline">
                {fromUserId.firstName + " " + fromUserId.lastName}
              </p>
              <div className="skills flex flex-col">
                <span className="subtitle text-slate-500">
                  {fromUserId.gender + ", " + fromUserId.age}
                </span>
                <span className="skills text-slate-500">
                  {fromUserId.skills?.join(",").slice(0, 20)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 user-option mx-auto sm:ml-auto sm:mr-0">
            <button
              className="btn inline-block select-none no-underline align-middle cursor-pointer whitespace-nowrap px-4 py-1.5 rounded text-base font-medium leading-6 tracking-tight text-white text-center border-0 bg-[#6911e7] hover:bg-[#590acb] duration-300"
              type="button"
              onClick={() => reviewRequest("accepted")}
            >
              Accept
            </button>
            <button
              className="btn inline-block select-none no-underline align-middle cursor-pointer whitespace-nowrap px-4 py-1.5 rounded text-base font-medium leading-6 tracking-tight text-white text-center border-0  btn-error"
              type="button"
              onClick={() => reviewRequest("rejected")}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
  );
};

export default RequestComponent;
