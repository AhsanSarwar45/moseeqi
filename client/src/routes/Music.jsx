// import { NavbarUser } from '../components/NavBarUser';
import { Link } from 'react-router-dom';
import { Spacer, Image, HStack, Button, VStack, Heading, Text, Box, StackDivider } from '@chakra-ui/react';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { MusicPlayer } from '../components/MusicPlayer';
import { saveAs } from 'file-saver';

export const Music = () => {
	// let data = sessionStorage.getItem('user-data');
	// data = JSON.parse(data);
	const { sname, phone_number } = useParams();
	const [ data, setData ] = useState({ sname: '', username: '', genre: '', music_path: '', like_count: 0 });

	useEffect(() => {
		Axios.post('http://localhost:3001/get-music', {
			phone_number: phone_number,
			sname: sname
		}).then((response) => {
			setData(response.data[0]);
			console.log('music info received');
		});
	}, []);

	return (
		<div>
			{/* <NavbarUser /> */}
			<HStack w="full" pr={20} pt={5} pb={5} pl={10} spacing={10} bg="brand.primary">
				<Spacer />
				<Link to="/user">
					<Button colorScheme="blue" textColor="white" size="sm">
						Back
					</Button>
				</Link>
			</HStack>
			<VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} pt={3} align="center">
				<Image
					borderRadius="full"
					boxSize="150px"
					src="https://i.pinimg.com/originals/3b/85/a0/3b85a067c5add90cba61445eec1a6945.jpg"
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

				<MusicPlayer source={`http://localhost:3001/${phone_number}/music/${sname}`} />
			</VStack>
		</div>
	);
};
