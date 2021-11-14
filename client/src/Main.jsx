import { Routes, Route } from 'react-router-dom';
import SignUp from './routes/SignUp';
import About from './routes/About';
import Home from './routes/Home';


export const Main = () => (
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    </Routes>
);