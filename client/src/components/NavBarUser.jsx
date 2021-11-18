import { Link } from 'react-router-dom';
import { Spacer, Button, HStack, Heading } from '@chakra-ui/react';

export const NavbarUser = () => (
    <HStack w="full" pr={10} pt={5} pb={5} pl={10} spacing={10} bg="brand.primary">
        <Spacer />
        <Link to='/search'>
                <Button colorScheme="blue" textColor="white" size="sm">
                    SEARCH
                </Button>
        </Link>
        <Button colorScheme="green" textColor="white" size="sm">
            User Name
        </Button>
    </HStack>

);

