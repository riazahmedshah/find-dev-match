import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Body from './components/Body'
import Profile from './components/Profile'
import Signin from './components/Signin'
import Feed from './components/Feed'
import Home from './components/Home'

function App() {
  
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/login' element={<Signin/>}/>
        <Route path='/' element={<Body/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/feed' element={<Feed/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
