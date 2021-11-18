import { Routes, Route } from 'react-router-dom';
import {SignUp} from './routes/SignUp';
import {About} from './routes/About';
import {Home} from './routes/Home';
import {Login} from './routes/Login';
import {User} from './routes/User';
import {SignUpSuccess} from './routes/SignUpSuccess';
import {Search} from './routes/Search';
import { ViewProfile } from './routes/ViewProfile';

export const Main = () => (
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/user' element={<User/>}/>
    <Route path='/signup_success' element={<SignUpSuccess/>}/>
    <Route path='/search' element={<Search/>}/>
    <Route path='/view-profile' element={<ViewProfile/>}/>
    </Routes>
);