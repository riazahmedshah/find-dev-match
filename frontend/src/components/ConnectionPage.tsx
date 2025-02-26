import axios from "axios";
import ConnectionComponent from "./daisiui/ConnectionComponent";
import { BASE_URL } from "../utils/constants";
import { useAppDispatch, useAppSelector } from "../hook";
import { setConnections } from "../features/connection/getConnectionSlice";
import { useEffect } from "react";
import { AppDispatch } from "../store";
import { Link } from "react-router-dom";

const ConnectionPage = () => {
  const connections = useAppSelector((store) => store.connections.data);
  const dispatch = useAppDispatch();
  const getConnection = async (dispatch: AppDispatch) => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      //console.log(res.data);
      dispatch(setConnections(res.data.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };
  useEffect(() => {
    if (!connections || connections.length === 0) {
      getConnection(dispatch);
    }
  }, [dispatch, connections]);

  if (!connections || connections.length === 0) {
    return <div className="h-screen flex items-center justify-center">
      <h1 className="text-2xl max-w-md">
        Oops! your connection list is empty, find someone here! 
        <Link to="/feed" className=" hover:text-blue-600">Feed page</Link>
      </h1>
    </div>;
  }
  //console.log("Fetched Connections:", connections);
  return (
    <div className="flex flex-col items-center justify-center p-16">
      <h1 className="my-10 font-medium text-3xl sm:text-4xl">
        Your Connections
      </h1>
      {connections.map((c,idx:number) => (
        <div key={idx} className="py-2">
          <ConnectionComponent 
            firstName={c.firstName}
            lastName={c.lastName}
            age={c.age}
            gender={c.gender}
            skills={c.skills}
            imgUrl={c.imgUrl}
          />
        </div>
      ))}
    </div>
    // <ConnectionComponent/>
  );
};

export default ConnectionPage;
