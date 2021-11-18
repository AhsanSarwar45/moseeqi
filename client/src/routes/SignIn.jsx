import { Button, VStack, Heading, Container, Text } from '@chakra-ui/react';
import { TextInput, PasswordInput } from '../components/TextInput';
import { useState } from 'react';
import Axios from 'axios'

const InvalidMessage = () => {
    return(
        <Container colorScheme="pink" maxWidth="full" pt="30px">
            <Text textColor="red" align="center" fontSize="12pt">
                Password or Phone Number is Invalid{' '}
            </Text>
        </Container>
    );
}

const SignIn = () => {
    const [password, getPassword] = useState("");
    const [phone_number, getPhoneNumber] = useState(0);
    const [isInvalid, setIsInvalid] = useState(false);

    const SignInOnClick = ()=>{
        setIsInvalid(false);
        Axios.post('http://localhost:3001/sign_in', 
        {
            phone_number: phone_number,
            password: password
        }).then((response)=>{
            if (response.data === "invalid"){
                setIsInvalid(true);
                console.log("user name or password is invalid");
            } else {
                console.log("hello", response.data, "!");
                Axios.post('http://localhost:3001/user', [response.data], 
                {
                    username: response.data
                }).then(()=>{
                    console.log("back on sing in page");
                });
            }
            console.log("Success");
        });
    };

    return(
         
        <Container maxWidth="full" pt="30px">
        <VStack padding={0} spacing={5}>
            <Heading size="md">Sign In</Heading>
            <TextInput type = "tel" label="Phone Number"value = {phone_number} onChange = {(event)=>{getPhoneNumber(event.target.value)}} />
            <PasswordInput label="Password" value = {password} onChange = {(event)=>{getPassword(event.target.value)}}/>
            <VStack w="300px" align="left" pt={5}>
                <Text textColor="gray" align="center" fontSize="8pt">
                    Enter your account details{' '}
                </Text>
                <Button colorScheme="green" w="full" size="lg" onClick = {SignInOnClick}>
                    SIGN IN
                </Button>
                {isInvalid ? <InvalidMessage/> : null }
            </VStack>
        </VStack>
    </Container>
    );
   
};

export default SignIn;