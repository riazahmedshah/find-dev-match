/* eslint-disable @typescript-eslint/no-explicit-any */
import TinderCard from 'react-tinder-card'
import Card from './daisiui/Card'

const Tindercard = () => {

  const onSwipe = (direction:any) => {
    console.log('You swiped: ' + direction)
  }
  
  const onCardLeftScreen = (myIdentifier:any) => {
    console.log(myIdentifier + ' left the screen')
  }

  return (
    <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}>
      <Card/>
      <Card/>
      <Card/>
    </TinderCard>
  )
}

export default Tindercard