import { Link } from 'react-router-dom';
import { Spacer} from '@chakra-ui/react';
import {
	Box,
	Button,
	Center,
	HStack,
	Avatar,
	VStack,
	List,
	ListItem,
	Heading,
	Container,
	Text
} from '@chakra-ui/react';
import { SimpleInput, PasswordInput } from '../components/TextInput';
import { useState } from 'react';
import Axios from 'axios'


export const ViewProfile = () => {
    let data = sessionStorage.getItem("user-data");
    data = JSON.parse(data);
    console.log(data);

    return(
    <Container maxWidth="full" pt="30px">
    <HStack w="full" pr={10} pt={5} pb={5} pl={10} spacing={10} bg="brand.primary">
    <Spacer />
    <Link to='/user'>
        <Button colorScheme="green" textColor="white" size="sm">
            BACK
        </Button>
    </Link>
    </HStack>
    <VStack padding={0} spacing={5}>
        <Heading size="md">Profile Info:</Heading>
        <Text> Phone Number: {data.phone_number} </Text>    
        <Text> Password: {data.password} </Text>
    </VStack>
    </Container>

    );
   
};

