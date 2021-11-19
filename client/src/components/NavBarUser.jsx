import { Link } from 'react-router-dom';
import { Spacer, Button, HStack, Heading } from '@chakra-ui/react';
import Axios from 'axios'

export const NavbarUser = () => {
const logOut = () =>{
    sessionStorage.removeItem("user-data");
    sessionStorage.setItem("isUserLogged", false);
    console.log("good");
}


return(
    <HStack w="full" pr={10} pt={5} pb={5} pl={10} spacing={10} bg="brand.primary">
        <Spacer />
        <Link to='/view-profile'>
            <Button colorScheme="green" textColor="white" size="sm">
                PROFILE
            </Button>
        </Link>
        <Link to='/search'>
            <Button colorScheme="blue" textColor="white" size="sm">
                SEARCH
            </Button>
        </Link>
        <Link to='/'>
            <Button colorScheme="red" textColor="white" size="sm" onClick ={logOut}>
                LOG OUT
            </Button>
        </Link>
    </HStack>

);
};
