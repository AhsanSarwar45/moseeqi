import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import App from './App';

import Theme from './themes/Theme.js';

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider theme={Theme}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
