import axios from "axios";
import { useAppDispatch, useAppSelector } from "../hook"
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { setRequeste } from "../features/connection/requsetSice";
import { AppDispatch } from "../store";
import RequestComponent from "./daisiui/RequestComponent";

const RequestsPage = () => {
  const requests = useAppSelector((store) => store.requests.data)
  const dispatch = useAppDispatch();
  const getRequests = async (dispatch: AppDispatch) => {
    const res = await axios.get(BASE_URL + "/user/requests-recieved",{withCredentials:true});
    //console.log(res.data.recievedReq);
    dispatch(setRequeste(res.data.recievedReq));
  }

  useEffect(() => {
    if(!requests || requests.length === 0){
      getRequests(dispatch);
    }
  },[dispatch,requests]);

  if (!requests || requests.length === 0) {
    return <div className="h-screen flex items-center justify-center">
      <h1 className="text-2xl max-w-md">
        Oops! your request list is empty, waiting for request!
      </h1>
    </div>;
  }
  return (
    <div className="flex flex-col items-center justify-center p-16">
      <h1 className="my-10 font-medium text-3xl sm:text-4xl">
        Your Connections
      </h1>
      {requests.map((c,idx:number) => (
        <div key={idx} className="py-2">
          <RequestComponent 
            _id={c._id}
            fromUserId={c.fromUserId}
            status={c.status}
            toUserId={c.toUserId}
          />
        </div>
      ))}
    </div>
  )
}

export default RequestsPage