import { Link } from 'react-router-dom';
import { NavbarUser } from '../components/NavBarUser';
import { Spacer, Button, HStack, VStack, Heading, Container, Text } from '@chakra-ui/react';

export const Profile = () => {
	let data = sessionStorage.getItem('user-data');
	data = JSON.parse(data);
	console.log(data);

	return (
		<div>
			<NavbarUser />
			<VStack padding={0} spacing={5}>
				<Heading size="md">Profile Info:</Heading>
				<Text> Phone Number: {data.phone_number} </Text>
				<Text> Password: {data.password} </Text>
			</VStack>
		</div>
	);
};
