import { Routes, Route } from 'react-router-dom';
import SignUp from './routes/SignUp';
import About from './routes/About';
import Home from './routes/Home';
import Login from './routes/Login';
import User from './routes/User';
import Search from './routes/Search';

export const Main = () => (
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/user' element={<User/>}/>
    <Route path='/search' element={<Search/>}/>
    </Routes>
);