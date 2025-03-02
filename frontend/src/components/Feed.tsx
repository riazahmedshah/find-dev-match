import axios from "axios";
import { BASE_URL } from "../utils/constants";
import {  useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import { addFeed } from "../features/feed/feedSlice";
import Tindercard from "./Tindercard";
import { AppDispatch } from "../store";

const Feed = () => {
  const dispatch = useAppDispatch();
  const feed = useAppSelector((store) => store.feed.data);
  console.log("Feed",feed);

  const fetchData = useCallback(async (dispatch: AppDispatch) => {
    try {
      const res = await axios.get(`${BASE_URL}/user/feed`, { withCredentials: true });
      dispatch(addFeed(res.data.data));
    } catch (error) {
      console.error(error);
    }
  }, []);

useEffect(() => {
  if(!feed || feed.length === 0){
    fetchData(dispatch);
  }
}, [dispatch, feed, fetchData]);

  if(!feed || feed.length === 0){
    return(
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-2xl max-w-md">
          Sorry! your feed is empty!
        </h1>
    </div>
    )
  }

  return(
    <div className="h-screen flex justify-center items-center">
      <Tindercard key={feed[0]?._id} data={feed[0]}/>
    </div>
  )
}

export default Feed