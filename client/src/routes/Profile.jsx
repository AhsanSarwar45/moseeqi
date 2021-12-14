// import { NavbarUser } from '../components/NavBarUser';
import { Link, useNavigate } from 'react-router-dom';
import { Spacer, Image, HStack, Button, VStack, Heading, Text, Box, StackDivider } from '@chakra-ui/react';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Axios from 'axios';

export const Profile = () => {
	// let data = sessionStorage.getItem('user-data');
	// data = JSON.parse(sessionStorage.getItem('user-data'));
	const { phone_number } = useParams();
	const [ data, setData ] = useState({ phone_number: '', username: '', follower_count: 0, earnings: 0 });
	const [ isSelfProfile, setSeltProfile] = useState (false);
	const [ following , setFollowing ] = useState(false)
	const navigate = useNavigate();

	useEffect(() => {
		Axios.post('http://localhost:3001/get-user', {
			phone_number: phone_number
		}).then((response) => {
			let selfData = sessionStorage.getItem("user-data");
			selfData = JSON.parse(selfData);
			setData(response.data[0]);
			console.log(response.data[0]);
			if(selfData.phone_number===response.data[0].phone_number){
				setSeltProfile(true);
			} else {
				setSeltProfile(false);
			}
		});

		Axios.post('http://localhost:3001/follow_user', {
			check: true,
			followed_ph: phone_number,
			follower_ph: JSON.parse(sessionStorage.getItem("user-data")).phone_number
		}).then((response) => {
			//console.log(response)
			console.log("RES: ", response)
			if (response.data === 'following') {
				setFollowing(true);
				console.log('following already');
			} else if (response.data === 'not_following') {
				setFollowing(false);
				console.log('not following already');
			}
		});

	}, []);

	const deleteAccount = () => {
		Axios.post('http://localhost:3001/delete_account', {
			phone_number: phone_number
		}).then((response) => {
			//TODO: create a page 
		});
	};

	const followUser = () => {
		setFollowing(true);
		Axios.post('http://localhost:3001/follow_user', {
			check: false,
			followed_ph: phone_number,
			follower_ph: JSON.parse(sessionStorage.getItem("user-data")).phone_number
		}).then((response) => {
			if (response.data === 'duplicate_entry'){
				console.log("already following")
			} else if (response.data === 'error'){
				console.log("some error");
			} else if (response.data === 'success'){
				console.log("follow added succ");
			}
		});
	}

	// const unFollowUser = () => {
	// 	setFollowing(false);
	// 	Axios.post('http://localhost:3001/unfollow_user', {
	// 		phone_number_follower: phone_number, 
	// 		phone_number_followed: JSON.parse(sessionStorage.getItem("user-data")).phone_number,
	// 	}).then((response) => {

	// 	});
	// }

	return (
		<div>
			{/* <NavbarUser /> */}
			<HStack w="full" pr={20} pt={5} pb={5} pl={10} spacing={10} bg="brand.primary">
				<Spacer />
				< Button colorScheme="blue" textColor="white" size="sm" onClick={()=> navigate(-1)}>
					Back
				</Button>
				{isSelfProfile ? 
				<Link to = "/"> 
					<Button colorScheme="red" textColor="white" size="sm" onClick={deleteAccount}>
						Delete Account
					</Button>
				</Link> : null}

				{isSelfProfile ? null : 
				following ? <Button colorScheme="red" textColor="white" size="sm" > Following </Button> : <Button colorScheme="red" textColor="white" size="sm" onClick={followUser}> Follow </Button>}

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
				<Box h="20px">
					<Text> Earnings: {data.earnings} </Text>
				</Box>
				<Spacer />
			</VStack>
		</div>
	);
};
