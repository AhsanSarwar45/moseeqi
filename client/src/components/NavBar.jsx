import { Link, Routes, Route } from 'react-router-dom';
import SignUp from '../routes/SignUp';
import About from '../routes/About';
import Home from '../routes/Home';

const Navbar = () => (
    <nav>
    <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/feed'>Feed</Link></li>
        <li><Link to='/discover'>Discover</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/studio'>Studio</Link></li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/signup'>Signup</Link></li>
    </ul>
    </nav>
);

const Main = () => (
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    </Routes>
);

export {
  Navbar,
  Main,
}