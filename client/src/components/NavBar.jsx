import { Link } from 'react-router-dom';
import { Spacer, Button, HStack, Heading } from '@chakra-ui/react';

export const Navbar = () => (
    <HStack w="full" pr={10} pt={5} pb={5} pl={10} spacing={10} bg="brand.primary">
        <Spacer />
        <Link to='/'>
                <Heading textColor="white" size="sm">
                    Home
                </Heading>
        </Link>
        <Link to='/about'>
                <Heading textColor="white" size="sm">
                    About
                </Heading>
        </Link>
        <Link to='/login'>
                <Heading textColor="white" size="sm">
                   Login
                </Heading>
        </Link>
        <Link to='/signup'>
                <Button colorScheme="secondary" textColor="white" size="sm">
                    SIGN UP
                </Button>
        </Link>

    </HStack>

);

