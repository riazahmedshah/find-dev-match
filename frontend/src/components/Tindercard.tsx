/* eslint-disable @typescript-eslint/no-explicit-any */
import TinderCard from 'react-tinder-card'
import Card from './daisiui/Card'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useAppDispatch } from '../hook'
import { removeFromFeed } from '../features/feed/feedSlice'

const Tindercard = ({data}: any) => {
  console.log("Tinder Card:", data._id);
  const dispatch = useAppDispatch();
  
  const onSwipe = async (direction: string) => {
    console.log('You swiped: ' + direction);
    try {
      if (direction === "right") {
        await axios.post(`${BASE_URL}/request/send/interested/${data._id}`, {}, { withCredentials: true });
      } else if (direction === "left") {
        await axios.post(`${BASE_URL}/request/send/ignored/${data._id}`, {}, { withCredentials: true });
      }
      dispatch(removeFromFeed(data._id));
    } catch (error) {
      console.error('API call failed:', error);
    }
  }
  const onCardLeftScreen = (myIdentifier: any) => {
    console.log(myIdentifier + ' left the screen');
  }

  return (
    <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['up', 'down']}>
      <Card data={data} />
    </TinderCard>
  );
}

export default Tindercard;
