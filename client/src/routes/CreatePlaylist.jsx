import { Button, HStack, Spacer, VStack, Heading, Container, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SimpleInput } from '../components/TextInput';
import { InvalidMessage } from '../components/InvalidMessage';
import Axios from 'axios';

export const CreatePlaylist = () => {
	const navigate = useNavigate();
    const [playlistName, setPLName] = useState('');
    const [playlistAdded, setPLAdded] = useState(false);

    const createPL = () => {
        Axios.post(process.env.URL+'/create_playlist', {
			playlistName: playlistName,
            phone_number: JSON.parse(sessionStorage.getItem("user-data")).phone_number

		}).then((response) => {
            if (response.data === 'playlist-added'){
                setPLAdded(true);
            }
		});
	};
	return (
        <div>
        <HStack w="full" pr={20} pt={5} pb={5} pl={10} spacing={10} bg="brand.primary">
            <Spacer />
			<Button colorScheme="blue" textColor="white" size="sm" onClick={()=> navigate(-1)}>
				Back   
			</Button>
		</HStack>
		<Container maxWidth="full" pt="30px">
			<VStack padding={0} spacing={10}>
				<Heading size="md">Create Playlist</Heading>
                <SimpleInput
				label="Playlist Name"
				value={playlistName}
				onChange={(event) => {
					setPLName(event.target.value);
				}}/>
                <Button w={200} colorScheme="green" onClick={createPL}>
				Upload
			    </Button>
				<VStack w="300px" align="left" pt={5}>
					<Text textColor="gray" align="center" fontSize="8pt">
						By Uploading this file, you agree to our terms and conditions.{' '}
					</Text>
				</VStack>
                {playlistAdded ? (
				<InvalidMessage
					message="Playlist Created!"
					color="green.800"
					bg="linear(to-t, green.200, green.100)"
				/>
			) : null}
			</VStack>
		</Container>
		</div>
	);
};
