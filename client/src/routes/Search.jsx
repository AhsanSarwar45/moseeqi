import { Button, VStack, Heading, Container, Text } from '@chakra-ui/react';
import { TextInput, PasswordInput } from '../components/TextInput';
import { useState } from 'react';
import Axios from 'axios'

const Search = () => {
    const [username, getUsername] = useState("");
    const SearchOnClick = () =>{
            console.log("inside search on click")
            Axios.post('http://localhost:3001/search', 
            {
                username: username
            }).then((response)=>{
                if (response==='no_match'){
                    console.log("handle no match situation")
                } else {
                for (let i = 0; i < response.data.length; i++) {
                    console.log(response.data[i]);
                  }
                console.log("now we need to print users list.");
                }
            });
        };

    return(
         
        <Container maxWidth="full" pt="30px">
        <VStack padding={0} spacing={5}>
            <Heading size="md">Search Profile</Heading>
            <TextInput type="name" label="Enter User Name:" value = {username} onChange = {(event)=>{getUsername(event.target.value)}} />
            <VStack w="300px" align="left" pt={5}>
                <Button colorScheme="green" w="full" size="lg" onClick = {SearchOnClick}>
                    SEARCH
                </Button>
            </VStack>
        </VStack>
    </Container>
    );
   
};

export default Search;