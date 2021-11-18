import { Button, VStack, Heading, Container, Text } from '@chakra-ui/react';
import { TextInput, PasswordInput } from '../components/TextInput';
import { useState } from 'react';
import Axios from 'axios'

const SignIn = () => {
    const [password, getPassword] = useState("");
    const [phone_number, getPhoneNumber] = useState(0);

    const SignInOnClick = ()=>{
        Axios.post('http://localhost:3001/sign_in', 
        {
            phone_number: phone_number,
            password: password
        }).then((response)=>{
            //console.log(response.data);
            if (response.data === "/incorrect_credentials"){
                //AHSAN: IMPLEMENT STATE
                console.log("front end hit")
            } else if (response.data === "/sign_in_successful"){
                //AHSAN: IMPLEMENT STATE
                console.log("front end succ");
            }
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

            </VStack>
        </VStack>
    </Container>
    );
   
};

export default SignIn;