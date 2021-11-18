import {
	Box,
	Button,
	Center,
	HStack,
	Avatar,
	VStack,
	List,
	ListItem,
	Heading,
	Container,
	Text
} from '@chakra-ui/react';
import { SimpleInput, PasswordInput } from '../components/TextInput';
import { useState } from 'react';
import Axios from 'axios';

const UserCard = ({ user }) => {
	return (
		<Box bg="gray.200" borderRadius="full" padding={5} w="500px">
			<HStack>
				<Avatar size="xl" name={user.username} />
				<Box w="10px" />
				<Heading textColor="black">{user.username}</Heading>
			</HStack>
		</Box>
	);
};

export const Search = () => {
	const [ username, getUsername ] = useState('');
	const [ users, setUsers ] = useState([]);
	const SearchOnClick = () => {
		console.log('inside search on click');
		Axios.post('http://localhost:3001/search', {
			username: username
		}).then((response) => {
			if (response === 'no_match') {
				console.log('handle no match situation');
			} else {
				for (let i = 0; i < response.data.length; i++) {
					setUsers((users) => [ ...users, response.data[i] ]);
				}
				setUsers(response.data);
				console.log('now we need to print users list.');
				console.log(users);
			}
		});
	};

	return (
		<Container maxWidth="full" pt="30px">
			<VStack padding={0} spacing={5}>
				<Heading size="md">Search Profile</Heading>
				<SimpleInput
					type="name"
					label="Enter User Name:"
					value={username}
					onChange={(event) => {
						getUsername(event.target.value);
					}}
				/>
				<VStack w="300px" align="left" pt={5}>
					<Button colorScheme="green" w="full" size="lg" onClick={SearchOnClick}>
						SEARCH
					</Button>
				</VStack>
				<List spacing={3}>
					{users.map((user) => (
						<ListItem key={user.phone_number}>
							<UserCard user={user} />
						</ListItem>
					))}
				</List>
			</VStack>
		</Container>
	);
};
