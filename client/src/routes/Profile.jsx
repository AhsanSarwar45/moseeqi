// import { NavbarUser } from '../components/NavBarUser';
import { Link } from 'react-router-dom';
import { Spacer, HStack, Button, VStack, Heading, Text, Box, StackDivider } from '@chakra-ui/react';

export const Profile = () => {
	let data = sessionStorage.getItem('user-data');
	data = JSON.parse(data);
	
	return (
		<div>
			{/* <NavbarUser /> */}
			<HStack w="full" pr={20} pt={5} pb={5} pl={10} spacing={10} bg="brand.primary">
				<Spacer />
				<Link to="/user">
					<Button colorScheme="blue" textColor="white" size="sm">
						Back   
					</Button>
				</Link>
			</HStack>
			<VStack
			divider={<StackDivider borderColor="gray.200" />}
			spacing={4}
			align="center"
			>
				<Box h="20px" padding="30px">
					<Heading size="md">Profile Info:</Heading>
				</Box>
				<Box h="20px" >
					<Text> User Name: {data.username} </Text>
				</Box>
				<Box h="20px">
					<Text> Phone Number: {data.phone_number} </Text>
				</Box>
				<Box h="20px">
					<Text> Followers: {data.follower_count} </Text>
				</Box>
				<Box h="20px">
					<Text> Earnings: {data.earnings} </Text>
				</Box>
				<Spacer/>
			</VStack>
		</div>
	);
};
