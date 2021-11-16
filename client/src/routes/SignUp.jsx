import { Button, VStack, Heading, Container, Text } from '@chakra-ui/react';
import { TextInput, PasswordInput } from '../components/TextInput';
import { useState } from 'react';
import Axios from 'axios'

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone_number, setPhoneNumber] = useState(0);

    const SignUpOnClick = ()=>{
        Axios.post('http://localhost:3001/create_user', 
        {
            username: username, 
            email: email, 
            password: password, 
            phone_number: phone_number
        }).then(()=>{
            console.log("Success");
        });
    };

    return(
         
        <Container maxWidth="full" pt="30px">
        <VStack padding={0} spacing={5}>
            <Heading size="md">Create Account</Heading>
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
                    SIGN UP
                </Button>
            </VStack>
        </VStack>
    </Container>
    );
   
};

export default SignUp;