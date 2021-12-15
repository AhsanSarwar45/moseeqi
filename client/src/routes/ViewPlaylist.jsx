import {
	Box,
	Avatar,
	Button,
	HStack,
	Spacer,
	VStack,
	Heading,
	Container,
	Text,
	List,
	ListItem
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { InvalidMessage } from '../components/InvalidMessage';
import { useParams } from 'react-router';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const RetSongs = ({ songs }) => {
	return (
		<List spacing={3}>
			{songs.map((song, index) => (
				<ListItem key={index}>
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
			<Link to={`/music/${song.s_ph}/${song.s_name}`}>
				<HStack>
					<Avatar
						shadow="md"
						size="md"
						name={song.s_name}
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRikhddhHqZyLCxvwFFd1weIv6wQttST0z9q4MjTnLnyxv9cp1HEqvBNnzqm98IXfvWyFI&usqp=CAU"
					/>
					<Box w="10px" />
					<Text fontSize="l" textColor="black">
						{song.s_name}
					</Text>
					{/* <Text fontSize="md" textColor="gray">
						(creator: {song.username})
					</Text> */}
				</HStack>
			</Link>
		</Box>
	);
};

export const ViewPlaylist = () => {
	const navigate = useNavigate();
	const { p_name, p_ph } = useParams();
	const [ songs, setSongs ] = useState([]);
	const [ noSongs, setNoSongs ] = useState(true);

	useEffect(() => {
		Axios.post(
			`${process.env.REACT_APP_SERVER_URL}/view_playlist`,
			{
				p_name: p_name,
				p_ph: p_ph
				//phone_number: JSON.parse(sessionStorage.getItem('user-data')).phone_number
			},
			{
				headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
			}
		).then((response) => {
			// for (let i = 0; i < response.data.length; i++) {
			//     setSongs((songs) => [ ...songs, response.data[i] ]);
			// }
			if (response.data.length === 0) {
				setNoSongs(true);
			} else {
				setNoSongs(false);
				setSongs(response.data);
			}
		});
	}, []);

	useEffect(
		() => {
			console.log('Songs: ', songs);
		},
		[ songs ]
	);

	return (
		<div>
			<HStack w="full" pr={20} pt={5} pb={5} pl={10} spacing={10} bg="brand.primary">
				<Spacer />
				<Button colorScheme="blue" textColor="white" size="sm" onClick={() => navigate(-1)}>
					Back
				</Button>
			</HStack>
			<Container maxWidth="full" pt="30px">
				<VStack padding={0} spacing={10}>
					<Heading size="md">Songs in: {p_name}</Heading>

					{noSongs ? (
						<InvalidMessage>
							message="Playlist Empty!" color="red.800" bg="linear(to-t, red.200, red.100)"
						</InvalidMessage>
					) : (
						<RetSongs songs={songs} />
					)}
				</VStack>
			</Container>
		</div>
	);
};
