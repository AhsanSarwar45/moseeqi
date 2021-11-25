import { NavbarUser } from '../components/NavBarUser';
import { Spacer, VStack, Heading, Text, Box, StackDivider } from '@chakra-ui/react';

export const Profile = () => {
	let data = sessionStorage.getItem('user-data');
	data = JSON.parse(data);
	
	return (
		<div>
			<NavbarUser />
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
