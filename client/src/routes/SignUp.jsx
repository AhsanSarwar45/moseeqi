import { Button, VStack, Heading, Container, Text } from '@chakra-ui/react';
import { TextInput, PasswordInput } from '../components/TextInput';

const SignUp = () => {
    return(
         <Container maxWidth="full" pt="30px">
        <VStack padding={0} spacing={5}>
            <Heading size="md">Create Account</Heading>
            <TextInput label="Username" />
            <TextInput label="Email" />
            <PasswordInput label="Password" />
            <PasswordInput label=" Repeat Password" />
            <VStack w="300px" align="left" pt={5}>
                <Text textColor="gray" align="center" fontSize="8pt">
                    By Signing up, you agree to our terms and conditions{' '}
                </Text>
                <Button colorScheme="primary" w="full" size="lg">
                    SIGN UP
                </Button>
            </VStack>
        </VStack>
    </Container>
    );
   
};

export default SignUp;