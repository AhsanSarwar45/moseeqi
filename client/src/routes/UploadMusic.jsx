import { Button, HStack, Spacer, VStack, Heading, Container, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { TextInput} from '../components/TextInput';
import {FileInputOld} from '../components/FileInputOld';
import { useState } from 'react';

import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
			</VStack>
		</Container>
		</div>
	);
};
