
import { Outlet } from 'react-router-dom'
import './App.css'
import Nav from './Shared/Nav'

function App() {
 

  return (
    <div className='bg-red'>
    <Nav/>
    <Outlet/>
  
    </div>
  )
}

export default App
