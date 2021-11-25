import { Box, FormControl, FormLabel, Radio, FormHelperText,RadioGroup, Select, Spacer, Button, HStack, Avatar, VStack, Text, List, ListItem, Heading, Container } from '@chakra-ui/react';
import { SimpleInput } from '../components/TextInput';
import { Formik, Form, Field } from 'formik';
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

const InProgressMessage = () => {
	return(
		<Box shadow="md" borderRadius="full" padding={2} w="300px" bgGradient="linear(to-t, orange.200, yellow.100)">
			<Text textColor="black" align="center" fontSize="12pt">
				Abhi Ye Karna Hai :){' '}
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
	const [value, setValue] = useState('user');
	const [ users, setUsers ] = useState([]);
	const [ isNoMatch, setNoMatch ] = useState(false);
	const [ inProgress, setInProgress ] = useState(false);
	const SearchOnClick = () => {
		setInProgress(false);
		setNoMatch(false);
		if(value==='user'){
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
		} else if (value==='song'){
			setInProgress(true);
			console.log('song search');
		} else {
			setInProgress(true);
			console.log('invalid search');
		}
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
				<Heading size="md">Search</Heading>					
				<SimpleInput
					type="name"
					label="Enter User Name:"
					value={username}
					onChange={(event) => {
						getUsername(event.target.value);
					}}
				/>
				<VStack w="300px" align="left" pt={0}>
				<FormControl isRequired>
				<FormHelperText>Select Search Type:</FormHelperText>
				<RadioGroup name="search-type" colorScheme="green" onChange={setValue} value={value} defaultValue="user">
					<HStack spacing="40px" pt={1}>
					<Radio value="user">User</Radio>
					<Radio value="song">Song</Radio>
					<Radio value="both">Both</Radio>
					</HStack>
				</RadioGroup>
				</FormControl>
				</VStack>
				<VStack w="300px" align="left" pt={5}>
					<Button colorScheme="green" w="full" size="lg" onClick={SearchOnClick}>
						SEARCH
					</Button>
				</VStack>
				{isNoMatch? <NoMatchMessage/> : null}
				{inProgress? <InProgressMessage/> : null}
				{(!isNoMatch)? <MatchMessage users={users}/> : null}
			</VStack>
		</Container>
		</div>
	);
};
