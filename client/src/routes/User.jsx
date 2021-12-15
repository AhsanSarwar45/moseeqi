import { HStack, SimpleGrid, VStack, Heading } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { NavbarUser } from '../components/NavBarUser';
import { PlaylistCard, EmptyPlaylistCard } from '../components/PlaylistCard';
import Axios from 'axios';

export const User = () => {
	const [ playlists, setPlaylists ] = useState([]);
	const [ recommended, setRecommended ] = useState([]);

	useEffect(() => {
		GetPlaylist();
		GetRecommendedPlaylist();
	}, []);

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
				//setNoPlaylist(true);
			} else {
				setPlaylists(response.data);
				//setNoPlaylist(false);
			}
		});
	};
	const GetRecommendedPlaylist = () => {
		//console.log('here');
		Axios.post(
			`${process.env.REACT_APP_SERVER_URL}/get-recommended-playlist`,
			{},
			{
				headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
			}
		).then((response) => {
			if (response.data === 'no_match') {
				//setNoPlaylist(true);
			} else {
				console.log('recommende', response.data);
				setRecommended(response.data);
				//setNoPlaylist(false);
			}
		});
	};

	return (
		<VStack width="100vw" height="100vh" spacing={0} alignItems="flex-start" overflowX="hidden">
			<NavbarUser />
			<Heading padding="20px">Created Playlists</Heading>
			<SimpleGrid minChildWidth="160px" width="100%" gap="20px" padding="20px">
				{playlists.length > 0 ? (
					playlists.map((playlist, index) => (
						<PlaylistCard
							key={index}
							phoneNumber={playlist.creator_phone_number}
							name={playlist.pname}
							height="200px"
							width="160px"
						/>
					))
				) : (
					<EmptyPlaylistCard height="200px" width="160px" />
				)}
			</SimpleGrid>
			<Heading padding="20px">Explore playlists created by others:</Heading>
			<SimpleGrid minChildWidth="160px" width="100%" gap="20px" padding="20px">
				{recommended.map((playlist, index) => (
					<PlaylistCard
						key={index}
						name={playlist.pname}
						phoneNumber={playlist.creator_phone_number}
						height="200px"
						width="160px"
					/>
				))}
			</SimpleGrid>
		</VStack>
	);
};
