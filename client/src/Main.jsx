import { Routes, Route } from 'react-router-dom';
import SignUp from './routes/SignUp';
import About from './routes/About';
import Home from './routes/Home';
import SignIn from './routes/SignIn';


export const Main = () => (
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/sign_in' element={<SignIn/>}/>
    </Routes>
);