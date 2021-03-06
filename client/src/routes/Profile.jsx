// import { NavbarUser } from '../components/NavBarUser';
import { Link, useNavigate } from 'react-router-dom';
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
	Box,
	StackDivider
} from '@chakra-ui/react';
import { useParams } from 'react-router';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import Axios from 'axios';

export const Profile = () => {
	// let data = sessionStorage.getItem('user-data');
	// data = JSON.parse(sessionStorage.getItem('user-data'));
	const { phone_number } = useParams();
	const [ data, setData ] = useState({ phone_number: '', username: '', follower_count: 0, earnings: 0 });
	const [ isSelfProfile, setSeltProfile ] = useState(false);
	const [ following, setFollowing ] = useState(false);
	const [ noPlaylist, setNoPlaylist ] = useState(false);
	const [ noSongs, setNoSong ] = useState(false);
	const [ playlists, setPlaylists ] = useState([]);
	const [ songs, setSongs ] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		Axios.post(
			`${process.env.REACT_APP_SERVER_URL}/get-user`,
			{
				phone_number: phone_number
			},
			{
				headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
			}
		).then((response) => {
			let selfData = sessionStorage.getItem('user-data');
			selfData = JSON.parse(selfData);
			setData(response.data[0]);
			console.log(response.data[0]);
			if (selfData.phone_number === response.data[0].phone_number) {
				setSeltProfile(true);
			} else {
				setSeltProfile(false);
			}
		});

		Axios.post(
			`${process.env.REACT_APP_SERVER_URL}/follow_user`,
			{
				check: true,
				followed_ph: phone_number,
				follower_ph: JSON.parse(sessionStorage.getItem('user-data')).phone_number
			},
			{
				headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
			}
		).then((response) => {
			//console.log(response)
			console.log('RES: ', response);
			if (response.data === 'following') {
				setFollowing(true);
				console.log('following already');
			} else if (response.data === 'not_following') {
				setFollowing(false);
				console.log('not following already');
			}
		});
	}, []);

	// const deleteAccount = () => {
	// 	Axios.post(
	// 		`${process.env.REACT_APP_SERVER_URL}/delete_account`,
	// 		{
	// 			phone_number: phone_number
	// 		},
	// 		{
	// 			headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
	// 		}
	// 	).then((response) => {
	// 		//TODO: create a page
	// 	});
	// };

	const GetPlaylist = () => {
		//console.log('here');
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

	const GetSongs = () => {
		//console.log('here');
		Axios.post(
			`${process.env.REACT_APP_SERVER_URL}/search_self_music`,
			{
				phone_number: JSON.parse(sessionStorage.getItem('user-data')).phone_number
			},
			{
				headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
			}
		).then((response) => {
			if (response.data === 'no_match') {
				setNoSong(true);
			} else {
				console.log("Songs res: ",response.data);
				setSongs(response.data);
				setNoSong(false);
			}
		});
	};

	const followUser = () => {
		setFollowing(true);
		Axios.post(
			`${process.env.REACT_APP_SERVER_URL}/follow_user`,
			{
				check: false,
				followed_ph: phone_number,
				follower_ph: JSON.parse(sessionStorage.getItem('user-data')).phone_number
			},
			{
				headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
			}
		).then((response) => {
			if (response.data === 'duplicate_entry') {
				console.log('already following');
			} else if (response.data === 'error') {
				console.log('some error');
			} else if (response.data === 'success') {
				console.log('follow added succ');
			}
		});
	};

	return (
		<div>
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
						My Playlists <ChevronDownIcon />
					</MenuButton>
					<MenuList>
						<Link to="/create_playlist">
							<MenuItem>New Playlist</MenuItem>
						</Link>
						<MenuDivider />
						{noPlaylist ? (
							<MenuItem>No Playlist Found</MenuItem>
						) : (
							playlists.map((p) => <Link to= {`/view_playlist/${p.pname}/${phone_number}`}><MenuItem key={p.pname}>{p.pname}</MenuItem></Link>)
						)}
					</MenuList>
				</Menu>
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
						onClick={GetSongs}
					>
						My Songs <ChevronDownIcon />
					</MenuButton>
					<MenuList>
						{noSongs ? (
							<MenuItem>No Uploads</MenuItem>
						) : (
							songs.map((song) => <Link to= {`/music/${phone_number}/${song.sname}`}><MenuItem key={song.sname}>{song.sname}</MenuItem></Link>)
						)}
					</MenuList>
				</Menu>
				
				<Button colorScheme="blue" textColor="white" size="sm" onClick={() => navigate(-1)}>
					Back
				</Button>
				{/* {isSelfProfile ? (
					<Link to="/">
						<Button colorScheme="red" textColor="white" size="sm" onClick={deleteAccount}>
							Delete Account
						</Button>
					</Link>
				) : null} */}

				{isSelfProfile ? null : following ? (
					<Button colorScheme="red" textColor="white" size="sm">
						{' '}
						Following{' '}
					</Button>
				) : (
					<Button colorScheme="red" textColor="white" size="sm" onClick={followUser}>
						{' '}
						Follow{' '}
					</Button>
				)}
			</HStack>
			<VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} pt={3} align="center">
				<Image
					borderRadius="full"
					boxSize="150px"
					src="https://i.pinimg.com/originals/3b/85/a0/3b85a067c5add90cba61445eec1a6945.jpg"
				/>
				<Box h="20px">
					<Heading size="md">Profile Info:</Heading>
				</Box>
				<Box h="20px">
					<Text> User Name: {data.username} </Text>
				</Box>
				<Box h="20px">
					<Text> Phone Number: {data.phone_number} </Text>
				</Box>
				<Box h="20px">
					<Text> Followers: {data.follower_count} </Text>
				</Box>
				<Spacer />
			</VStack>
		</div>
	);
};
