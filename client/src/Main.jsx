import { Routes, Route } from 'react-router-dom';
import { SignUp } from './routes/SignUp';
import { About } from './routes/About';
import { Home } from './routes/Home';
import { Login } from './routes/Login';
import { SignUpSuccess } from './routes/SignUpSuccess';

export const Main = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/about" element={<About />} />
		<Route path="/signup" element={<SignUp />} />
		<Route path="/login" element={<Login />} />
		<Route path="/signup_success" element={<SignUpSuccess />} />
	</Routes>
);
