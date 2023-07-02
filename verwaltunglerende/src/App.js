import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from "./Pages/Home.js"
import Login from "./Pages/Login.js"
import Neuerlernende from "./Pages/Neuerlernende.js"
import Verwaltung from "./Pages/Verwaltung.js"
import "./App.css"


function App (){
  return(
    <body>
    <Router>
      <div>
        <nav className='navbar'>
          <ul className='navbarNavi'>
            <li className='nav'>
              <Link to='/Home.js'className='navto'>Home</Link>
            </li>
            <li className='nav'>
              <Link to='/Verwaltung.js' className='navto'>Verwaltung</Link>
            </li>
            <li className='nav'>
              <Link to='/Neuerlernende.js'className='navto'>Neue Lernende erstellen</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/Home.js' element={<Home />}></Route>
          <Route path='/Verwaltung.js' element={<Verwaltung />}></Route>
          <Route path='/Neuerlernende.js' element={<Neuerlernende />}></Route>
        </Routes>
      </div>
    </Router>
    <img src='https://o.remove.bg/downloads/3bae16e0-be70-4337-b79f-bddc2f63dfd4/grafik-removebg-preview.png' alt='' className='unnötig'></img>
    </body>
  )
}


export default App;