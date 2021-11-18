import { Button, VStack, Heading, Container, Text } from '@chakra-ui/react';
import { TextInput, PasswordInput } from '../components/TextInput';
import { useState } from 'react';
import Axios from 'axios'

const DuplicateMessage = () => {
    return(
        <Text>Duplicate</Text>
    );
}

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone_number, setPhoneNumber] = useState(0);
    const [isDup, setIsDup] = useState(false);

    const SignUpOnClick = ()=>{
        Axios.post('http://localhost:3001/create_user', 
        {
            username: username, 
            email: email, 
            password: password, 
            phone_number: phone_number
        }).then((response)=>{
            console.log(response.data);
            if (response.data === "/user_added"){
                //AHSAN: IMPLEMENT STATE
            } else if (response.data === "/incomplete_information"){
                //use state similar to isDup
            } else if (response.data === "/duplicate_entry"){
                //update page
                setIsDup(true);
            }
        });
        
    };

    return(
         
        <Container maxWidth="full" pt="30px">
        <VStack padding={0} spacing={5}>
            <Heading size="md">Create Account</Heading>
            {isDup ? <DuplicateMessage/> : null }
            <TextInput label="Username" value = {username} onChange = {(event)=>{setUsername(event.target.value)}}/>
            <TextInput label="Email" value = {email} onChange = {(event)=>{setEmail(event.target.value)}}/>
            <TextInput type = "tel" label="Phone Number"value = {phone_number} onChange = {(event)=>{setPhoneNumber(event.target.value)}} />
            <PasswordInput label="Password" value = {password} onChange = {(event)=>{setPassword(event.target.value)}}/>
            <PasswordInput label=" Repeat Password" />
            <VStack w="300px" align="left" pt={5}>
                <Text textColor="gray" align="center" fontSize="8pt">
                    By Signing up, you agree to our terms and conditions{' '}
                </Text>
                <Button colorScheme="primary" w="full" size="lg" onClick = {SignUpOnClick}>
                    Sign Up
                </Button>
            </VStack>
        </VStack>
    </Container>
    );
   
};

export default SignUp;