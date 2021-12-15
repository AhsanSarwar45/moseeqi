// import { NavbarUser } from '../components/NavBarUser';
import { Link } from 'react-router-dom';
import {
	Spacer,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Image,
	HStack,
	Button,
	VStack,
	Heading,
	Text,
	Icon,
	Box,
	StackDivider
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { MusicPlayer } from '../components/MusicPlayer';
import { TiHeartOutline, TiHeart, TiEyeOutline, TiDocumentText } from 'react-icons/ti';

export const Music = () => {
	// let data = sessionStorage.getItem('user-data');
	// data = JSON.parse(data);
	const { sname, phone_number } = useParams();
	const [ data, setData ] = useState({ sname: '', username: '', genre: '', music_path: '', like_count: 0 });
	const [ isLiked, setIsLiked ] = useState(false);
	const [ noPlaylist, setNoPlaylist ] = useState(false);
	const [ playlists, setPlaylists ] = useState([]);

	const AddSongToPlaylist = (playlistName, p_ph) => {
		//console.log('adding to p:');
		Axios.post(
			`${process.env.REACT_APP_SERVER_URL}/add_song_to_playlist`,
			{
				pname: playlistName,
				sname: sname,
				p_ph: p_ph,
				s_ph: phone_number
			},
			{
				headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
			}
		).then((response) => {
			if (response.data === 'song-added-to-playlist') {
				console.log('song added playlist Sucess!');
			} else if (response.data === 'duplicate-entry') {
				//update page
				console.log('dup entry');
			}
		});
	};

	const AddLike = () => {
		setIsLiked(true);
		Axios.post(
			`${process.env.REACT_APP_SERVER_URL}/add_like`,
			{
				check: false,
				phone_number: phone_number,
				sname: sname,
				liker_ph: JSON.parse(sessionStorage.getItem('user-data')).phone_number
			},
			{
				headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
			}
		).then((response) => {
			if (response.data === 'error') {
				setIsLiked(false);
				console.log('like invalid');
			} else if (response.data === 'duplicate_entry') {
				console.log('you already liked it!');
			} else if (response.data === 'success') {
				setIsLiked(true);
				console.log('like sucess');
			}
		});
	};

	const GetPlaylist = () => {
		console.log('here');
		Axios.post(
			`${process.env.REACT_APP_SERVER_URL}/search_playlist`,
			{
				phone_number: JSON.parse(sessionStorage.getItem('user-data')).phone_number
			},
			{
				headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
			}
		).then((response) => {
			if (response.data === 'no_match') {
				setNoPlaylist(true);
			} else {
				setPlaylists(response.data);
				setNoPlaylist(false);
			}
		});
	};

	useEffect(() => {
		Axios.post(
			`${process.env.REACT_APP_SERVER_URL}/get-music`,
			{
				phone_number: phone_number,
				sname: sname
			},
			{
				headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
			}
		).then((response) => {
			setData(response.data[0]);
			console.log('music info received');
		});
		//to check if user has already liked this song
		Axios.post(
			`${process.env.REACT_APP_SERVER_URL}/add_like`,
			{
				check: true,
				phone_number: phone_number,
				sname: sname,
				liker_ph: JSON.parse(sessionStorage.getItem('user-data')).phone_number
			},
			{
				headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
			}
		).then((response) => {
			if (response.data === 'liked') {
				setIsLiked(true);
				console.log('liked alredaugs');
			} else if (response.data === 'not_liked') {
				setIsLiked(false);
				console.log('not yet liked');
			}
		});
	}, []);

	return (
		<VStack alignItems="center" width="100vw" height="100vh" bgColor="brand.primary">
			{/* <NavbarUser /> */}
			<HStack w="full" pr={20} pt={5} pb={5} pl={10} spacing={10} bg="brand.primary">
				<Spacer />
				<Menu>
					<MenuButton
						px={3}
						py={1}
						transition="all 0.2s"
						// borderWidth='1px'
						borderRadius="full"
						textColor="white"
						_hover={{ bg: 'gray.400' }}
						_expanded={{ bg: 'green.500' }}
						_focus={{ boxShadow: 'outline' }}
						onClick={GetPlaylist}
					>
						Add to Playlist <ChevronDownIcon />
					</MenuButton>
					<MenuList>
						<Link to="/create_playlist">
							<MenuItem>New Playlist</MenuItem>
						</Link>
						<MenuDivider />
						{noPlaylist ? (
							<MenuItem>No Playlist Found</MenuItem>
						) : (
							playlists.map((p) => (
								<MenuItem
									key={p.pname}
									onClick={() => AddSongToPlaylist(p.pname, p.creator_phone_number)}
								>
									{p.pname}
								</MenuItem>
							))
						)}
					</MenuList>
				</Menu>

				<Link to="/search">
					<Button colorScheme="blue" textColor="white" size="sm">
						Back
					</Button>
				</Link>
			</HStack>
			<VStack
				borderRadius="20px"
				bgColor="brand.secondary"
				width="40vw"
				spacing={4}
				pt={3}
				align="center"
				overflow="hidden"
			>
				<Image
					borderRadius="full"
					boxSize="150px"
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRikhddhHqZyLCxvwFFd1weIv6wQttST0z9q4MjTnLnyxv9cp1HEqvBNnzqm98IXfvWyFI&usqp=CAU"
				/>
				<Heading size="md" color="white">
					{data.sname}
				</Heading>
				<Text color="white"> {data.username} </Text>
				<HStack spacing={10} width="100%" paddingRight="30px" paddingLeft="30px">
					<VStack>
						{!isLiked ? (
							<Icon cursor="pointer" color="white" w={10} h={10} onClick={AddLike} as={TiHeartOutline} />
						) : (
							<Icon cursor="pointer" color="white" w={10} h={10} as={TiHeart} />
						)}
						<Text fontSize="sm" color="white">
							Likes: {parseInt(data.like_count)}
						</Text>
					</VStack>
					<VStack>
						<Icon cursor="pointer" color="white" w={10} h={10} as={TiEyeOutline} />

						<Text fontSize="sm" color="white">
							{parseInt(data.listen_count)}
						</Text>
					</VStack>
					<Spacer />
					<VStack>
						<Icon cursor="pointer" color="white" w={10} h={10} as={TiDocumentText} />

						<Text fontSize="sm" color="white">
							Add to playlist
							{/* {parseInt(data.listen_count)} */}
						</Text>
					</VStack>
				</HStack>
				{/* <Box h="20px">
					
				</Box>
				<Box h="20px">
					
				</Box>
				<Box h="20px">
					<Text color="white"> Song Name: {data.sname} </Text>
				</Box>
				<Box h="20px">
					<Text color="white"> Likes: {parseInt(data.like_count)} </Text>
				</Box>
				<Box h="20px">
					<Text color="white"> Streams: {parseInt(data.listen_count)} </Text>
				</Box> */}

				<MusicPlayer
					source={`${process.env.REACT_APP_SERVER_URL}/${phone_number}/music/${sname}`}
					ph={phone_number}
					sn={sname}
				/>
			</VStack>
		</VStack>
	);
};
