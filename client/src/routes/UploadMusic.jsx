import { Button, HStack, Spacer, VStack, Heading, Container, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {FileInputOld} from '../components/FileInputOld';

export const UploadMusic = () => {

	return (
        <div>
        <HStack w="full" pr={20} pt={5} pb={5} pl={10} spacing={10} bg="brand.primary">
            <Spacer />
			<Link to="/user">
				<Button colorScheme="blue" textColor="white" size="sm">
                    Back   
				</Button>
			</Link>
		</HStack>
		<Container maxWidth="full" pt="30px">
			<VStack padding={0} spacing={10}>
				<Heading size="md">Upload Music</Heading>
				<FileInputOld/>
				<VStack w="300px" align="left" pt={5}>
					<Text textColor="gray" align="center" fontSize="8pt">
						By Uploading this file, you agree to our terms and conditions.{' '}
					</Text>
				</VStack>
			</VStack>
		</Container>
		</div>
	);
};
