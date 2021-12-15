import { Link } from 'react-router-dom';
import {
	Spacer,
	Button,
	HStack,
	Menu,
	MenuButton,
	Avatar,
	MenuList,
	Center,
	MenuDivider,
	MenuItem
} from '@chakra-ui/react';

export const NavbarUser = () => {
	const logOut = () => {
		sessionStorage.removeItem('user-data');
		sessionStorage.setItem('isUserLogged', false);
		console.log('good');
	};

	return (
		<HStack w="full" pr={2} pt={2} pb={2} pl={2} spacing={10} bg="brand.primary">
			<Spacer />
			{/* <Link to="/create_playlist">
				<Button colorScheme="primary" textColor="white" size="sm">
					CREATE PLAYLIST
				</Button>
			</Link> */}
			<Link to="/upload_music">
				<Button colorScheme="primary" textColor="white" size="sm">
					Upload Music
				</Button>
			</Link>
			<Link to="/delete_music">
				<Button colorScheme="primary" textColor="white" size="sm">
					Delete Music
				</Button>
			</Link>
			<Link to="/search">
				<Button colorScheme="primary" textColor="white" size="sm">
					Search
				</Button>
			</Link>
			<Menu>
				<MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
					<Avatar
						size={'md'}
						src={'https://i.pinimg.com/originals/3b/85/a0/3b85a067c5add90cba61445eec1a6945.jpg'}
					/>
				</MenuButton>
				<MenuList alignItems={'center'}>
					<br />
					<Center>
						<Avatar
							size={'2xl'}
							src={'https://i.pinimg.com/originals/3b/85/a0/3b85a067c5add90cba61445eec1a6945.jpg'}
						/>
					</Center>
					<br />
					<Center>
						<p>{JSON.parse(sessionStorage.getItem('user-data')).username}</p>
					</Center>
					<br />
					<MenuDivider />
					<Link to={`/profile/${JSON.parse(sessionStorage.getItem('user-data')).phone_number}`}>
						<MenuItem>Profile</MenuItem>
					</Link>
					<Link to="/">
						<MenuItem>Logout</MenuItem>
					</Link>
				</MenuList>
			</Menu>
		</HStack>
	);
};
