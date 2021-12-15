import { Spacer, Button, HStack, VStack, Heading, Container } from '@chakra-ui/react';
import { SimpleInput } from '../components/TextInput';
import { useState } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { InvalidMessage } from '../components/InvalidMessage';

export const DeleteMusic = () => {
	const [ sname, getSongName ] = useState('');
	const [ isNoMatch, setNoMatch ] = useState(false);
	const [ isDeleted, setDeleted ] = useState(false);
	const navigate = useNavigate();
	const DeleteOnClick = () => {
		setNoMatch(false);	
        
        let data = sessionStorage.getItem('user-data');
		data = JSON.parse(data);
        console.log('song delete');

        Axios.post(process.env.URL+'/delete_music', {
        sname: sname,
        phone_number: data.phone_number
        }).then((response) => {
            if (response.data === 'no_match') {
                setNoMatch(true);
            } else if (response.data === 'deletion_complete') {
                setDeleted(true);
            } else {
                console.log("SOME ERROR OCCURED");
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
			<VStack padding={0} spacing={5}>
				<Heading size="md">Delete Song</Heading>					
				<SimpleInput
					type="sname"
					label="Enter Song Name:"
					value={sname}
					onChange={(event) => {
						getSongName(event.target.value);
					}}
				/>
				<VStack w="300px" align="left" pt={0}>
				</VStack>
				<VStack w="300px" align="left" pt={5}>
					<Button colorScheme="green" w="full" size="lg" onClick={DeleteOnClick}>
				        DELETE
					</Button>
				</VStack>
				{isNoMatch? <InvalidMessage message="No Match Found!" /> : null}
				{isDeleted? <InvalidMessage message="Song Deleted Successfully!" color="green.800" bg="linear(to-t, green.200, green.100)" /> : null}
			</VStack>
		</Container>
		</div>
	);
};
