import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Body from './components/Body'
import Profile from './components/Profile'
import Signin from './components/Signin'

function App() {
  

  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/login' element={<Signin/>}/>
        <Route path='/' element={<Body/>}>
          <Route path='/profile' element={<Profile/>}/>
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
