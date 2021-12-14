// import { NavbarUser } from '../components/NavBarUser';
import { Link } from 'react-router-dom';
import { Spacer, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Image, HStack, Button, VStack, Heading, Text, Box, StackDivider } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { MusicPlayer } from '../components/MusicPlayer';

export const Music = () => {
	// let data = sessionStorage.getItem('user-data');
	// data = JSON.parse(data);
	const { sname, phone_number } = useParams();
	const [ data, setData ] = useState({ sname: '', username: '', genre: '', music_path: '', like_count: 0 });
	const [ isLiked, setIsLiked ] = useState(false);
	const [ noPlaylist, setNoPlaylist ] = useState(false);
	const [ playlists, setPlaylists ] = useState([]);

	const AddSongToPlaylist = (playlistName, sname, s_ph, p_ph) => {
		console.log('adding to p:');
		Axios.post('http://localhost:3001/add_song_to_playlist',{
		
		}).then((response) => {

		})
		// same as AddLike and /add_like below
		// change the 'added' table to added( p_name, p_ph, s_name, s_ph)
		// p_ph = ph of person who made playlist
		// s_ph = person who made song
	};

	const AddLike = () => {
		setIsLiked(true);
		Axios.post('http://localhost:3001/add_like', {
			check: false,
			phone_number: phone_number,
			sname: sname,
			liker_ph: JSON.parse(sessionStorage.getItem("user-data")).phone_number
		}).then((response) => {
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
		Axios.post('http://localhost:3001/search_playlist', {
				phone_number: JSON.parse(sessionStorage.getItem("user-data")).phone_number
			}).then((response) => {
				if (response.data === 'no_match') {
					setNoPlaylist(true);
				} else {
					setPlaylists(response.data);
					setNoPlaylist(false);
				}
			});
	};

	useEffect(() => {
		Axios.post('http://localhost:3001/get-music', {
			phone_number: phone_number,
			sname: sname
		}).then((response) => {
			setData(response.data[0]);
			console.log('music info received');
		});
		//to check if user has already liked this song
		Axios.post('http://localhost:3001/add_like', {
		check: true,
		phone_number: phone_number,
		sname: sname,
		liker_ph: JSON.parse(sessionStorage.getItem("user-data")).phone_number
		}).then((response) => {
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
		<div>
			{/* <NavbarUser /> */}
			<HStack w="full" pr={20} pt={5} pb={5} pl={10} spacing={10} bg="brand.primary">
				<Spacer />
				<Menu>
				<MenuButton
					px={3}
					py={1}
					transition='all 0.2s'
					// borderWidth='1px'
					borderRadius='full'
					textColor='white'
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
					{ noPlaylist ? 
					<MenuItem>
						No Playlist Found
					</MenuItem>
					: playlists.map((p) => (
						<MenuItem key={p.pname} onClick={()=>AddSongToPlaylist(p.pname, p.creator_phone_number)}>
							{p.pname}
						</MenuItem>
					))}	
				</MenuList>
				</Menu>
				{!isLiked? 
				<Button colorScheme="pink" textColor="white" size="sm" onClick={AddLike}> 
					LIKE 
				</Button> : 
				<Button colorScheme="green" textColor="white" size="sm"> 
					LIKED 
				</Button>}
				<Link to="/search">
					<Button colorScheme="blue" textColor="white" size="sm">
						Back
					</Button>
				</Link>
			</HStack>
			<VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} pt={3} align="center">
				<Image
					borderRadius="full"
					boxSize="150px"
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRikhddhHqZyLCxvwFFd1weIv6wQttST0z9q4MjTnLnyxv9cp1HEqvBNnzqm98IXfvWyFI&usqp=CAU"
				/>
				<Box h="20px">
					<Heading size="md">Music Info:</Heading>
				</Box>
				<Box h="20px">
					<Text> User Name: {data.username} </Text>
				</Box>
				<Box h="20px">
					<Text> Song Name: {data.sname} </Text>
				</Box>
				<Box h="20px">
					<Text> Likes: {data.like_count} </Text>
				</Box>
				<Box h="20px">
					<Text> Genre: {data.genre} </Text>
				</Box>
				<Spacer />

				<MusicPlayer source={`http://localhost:3001/${phone_number}/music/${sname}`} ph={phone_number} sn={sname} />
			</VStack>
		</div>
	);
};
