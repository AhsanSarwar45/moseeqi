import {
	Box,
	FormControl,
	Radio,
	FormHelperText,
	RadioGroup,
	Spacer,
	Button,
	HStack,
	Avatar,
	VStack,
	Text,
	List,
	ListItem,
	Heading,
	Container
} from '@chakra-ui/react';
import { SimpleInput } from '../components/TextInput';
import { useState } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { InvalidMessage } from '../components/InvalidMessage';

const UserMatchMessage = ({ users }) => {
	return (
		<List spacing={3}>
			{users.map((user) => (
				<ListItem key={user.phone_number}>
					<UserCard user={user} />
				</ListItem>
			))}
		</List>
	);
};

const SongMatchMessage = ({ songs }) => {
	return (
		<List spacing={3}>
			{songs.map((song) => (
				<ListItem key={song.sname + song.phone_number}>
					<SongCard song={song} />
				</ListItem>
			))}
		</List>
	);
};

const SongCard = ({ song }) => {
	return (
		<Box shadow="md" borderRadius="full" padding={1} w="500px" bgGradient="linear(to-t, gray.200, gray.100)">
			{/* <Text>{song}</Text> */}
			<Link to={`/music/${song.phone_number}/${song.sname}`}>
				<HStack>
					<Avatar
						shadow="md"
						size="md"
						name={song.sname}
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRikhddhHqZyLCxvwFFd1weIv6wQttST0z9q4MjTnLnyxv9cp1HEqvBNnzqm98IXfvWyFI&usqp=CAU"
					/>
					<Box w="10px" />
					<Text fontSize="l" textColor="black">
						{song.sname}
					</Text>
					<Text fontSize="md" textColor="gray">
						(creator: {song.username})
					</Text>
				</HStack>
			</Link>
		</Box>
	);
};

const UserCard = ({ user }) => {
	return (
		<Box shadow="md" borderRadius="full" padding={1} w="500px" bgGradient="linear(to-t, gray.200, gray.100)">
			<Link to={`/profile/${user.phone_number}`}>
				<HStack>
					<Avatar shadow="md" size="md" name={user.username} src={user.profile_picture} />
					<Box w="10px" />
					<Text fontSize="2xl" textColor="black">
						{user.username}
					</Text>
					<Text fontSize="md" textColor="gray">
						({user.follower_count} followers)
					</Text>
				</HStack>
			</Link>
		</Box>
	);
};

export const Search = () => {
	const [ username, getUsername ] = useState('');
	const [ value, setValue ] = useState('user');
	const [ users, setUsers ] = useState([]);
	const [ songs, setSongs ] = useState([]);
	const [ isNoMatch, setNoMatch ] = useState(false);
	const [ isSongMatch, setSongMatch ] = useState(false);
	const [ isUserMatch, setUserMatch ] = useState(false);

	const navigate = useNavigate();

	const UserRequest = () => {
		Axios.post('http://localhost:3001/search_user', {
			username: username
		}).then((response) => {
			if (response.data === 'no_match') {
				setNoMatch(true);
				setSongMatch(false);
				setUserMatch(false);
			} else {
				setUsers(response.data);
				setNoMatch(false);
				setUserMatch(true);
				setSongMatch(false);
			}
		});
	};

	const SongRequest = () => {
		Axios.post('http://localhost:3001/search_music', {
			sname: username
		}).then((response) => {
			if (response.data === 'no_match') {
				setNoMatch(true);
				setSongMatch(false);
				setUserMatch(false);
			} else {
				setSongs(response.data);
				setNoMatch(false);
				setSongMatch(true);
				setUserMatch(false);
			}
		});
	};

	const SearchOnClick = () => {
		setNoMatch(false);
		if (value === 'user') {
			UserRequest();
		} else if (value === 'song') {
			SongRequest();
		} else if (value === 'both') {
			console.log('both search');
			setNoMatch(true);
			Axios.post('http://localhost:3001/search_user', {
				username: username
			}).then((response) => {
				if (response.data === 'no_match') {
					setSongMatch(false);
				} else {
					for (let i = 0; i < response.data.length; i++) {
						setUsers((users) => [ ...users, response.data[i] ]);
					}
					setUsers(response.data);
					setUserMatch(true);
					setNoMatch(false);
				}
			});
			Axios.post('http://localhost:3001/search_music', {
				sname: username
			}).then((response) => {
				if (response.data === 'no_match') {
					setSongMatch(false);
				} else {
					for (let i = 0; i < response.data.length; i++) {
						setSongs((songs) => [ ...songs, response.data[i] ]);
					}
					setSongs(response.data);
					setSongMatch(true);
					setNoMatch(false);
				}
			});
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
							<RadioGroup
								name="search-type"
								colorScheme="green"
								onChange={setValue}
								value={value}
								defaultValue="user"
							>
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
					{isNoMatch ? <InvalidMessage message="No Match Found!" /> : null}
					{isUserMatch ? <UserMatchMessage users={users} /> : null}
					{isSongMatch ? <SongMatchMessage songs={songs} /> : null}
				</VStack>
			</Container>
		</div>
	);
};
