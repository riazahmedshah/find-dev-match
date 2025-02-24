import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import { addFeed } from "../features/feed/feedSlice";
import Tindercard from "./Tindercard";

const Feed = () => {
  const dispatch = useAppDispatch();
  const feed = useAppSelector((store) => store.feed.data);
  console.log("Feed",feed);

  const fetchData = useCallback(async () => {
      if(feed) return;
      try {
        const res = await axios.get(BASE_URL+"/user/feed", {withCredentials:true});
        //console.log(res.data);
        dispatch(addFeed(res.data));
      } catch (error) {
        console.error(error);
      }
  },[feed,dispatch])

useEffect(() => {
  fetchData();
}, [fetchData]);


  return(
    <div className="h-screen flex justify-center items-center">
      <Tindercard />
    </div>
  )
}

export default Feed