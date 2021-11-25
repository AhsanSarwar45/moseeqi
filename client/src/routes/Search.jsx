import { Box, Spacer, Button, HStack, Avatar, VStack, Text, List, ListItem, Heading, Container } from '@chakra-ui/react';
import { SimpleInput } from '../components/TextInput';
import { useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const MatchMessage = ({ users }) => {
	return(
		<List spacing={3}>
			{users.map((user) => (
				<ListItem key={user.phone_number}>
					<UserCard user={user} />
				</ListItem>
			))}
		</List>
	);
};

const NoMatchMessage = () => {
	return(
		<Box shadow="md" borderRadius="full" padding={2} w="300px" bgGradient="linear(to-t, pink.200, pink.100)">
			<Text textColor="red" align="center" fontSize="12pt">
				No Match Found{' '}
			</Text>
		</Box>
	);
};

const UserCard = ({ user }) => {
	return (
		<Box  shadow="md" borderRadius="full" padding={1} w="500px" bgGradient="linear(to-t, gray.200, gray.100)">
			<Link to="/profile">
			<HStack>
				<Avatar shadow="md" size="md" name={user.username} src="https://i.pinimg.com/originals/3b/85/a0/3b85a067c5add90cba61445eec1a6945.jpg"/>
				<Box w="10px" />
						<Text fontSize='2xl' textColor="black">{user.username}</Text>
				<Text fontSize='md' textColor="gray">({user.follower_count} followers)</Text>
			</HStack>
			</Link>
		</Box>
	);
};

export const Search = () => {
	const [ username, getUsername ] = useState('');
	const [ users, setUsers ] = useState([]);
	const [ isNoMatch, setNoMatch ] = useState(false);
	const SearchOnClick = () => {
		Axios.post('http://localhost:3001/search', {
			username: username
		}).then((response) => {
			if (response.data === 'no_match') {
				setNoMatch(true);
			} else {
				for (let i = 0; i < response.data.length; i++) {
					setUsers((users) => [ ...users, response.data[i] ]);
				}
				setUsers(response.data);
				setNoMatch(false);
			}
		});
	};


	return (
		<div>
        <HStack w="full" pr={20} pt={5} pb={5} pl={10} spacing={10} bg="brand.primary">
            <Spacer />
			<Link to="/user">
				<Button colorScheme="blue" textColor="white" size="sm">
                    Back   
				</Button>
			</Link>
		</HStack>
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
				{isNoMatch? <NoMatchMessage/> : null}
				{(!isNoMatch)? <MatchMessage users={users}/> : null}
			</VStack>
		</Container>
		</div>
	);
};
