import { Navbar } from '../components/NavBar';
import { Link } from 'react-router-dom';
import { Center, Button, VStack, Heading } from '@chakra-ui/react';

export const SignUpSuccess = () => (
	<div className="about">
		<Navbar />
		<Center h="500px">
			<VStack spacing={10}>
				<Heading>Account created successfully!</Heading>
				<Link to="/login">
					<Button colorScheme="secondary" w={40} size="lg">
						Login
					</Button>
				</Link>
			</VStack>
		</Center>
	</div>
);
