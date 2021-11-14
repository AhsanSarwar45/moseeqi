import React from 'react';
import { useBoolean, Button, VStack, Text, InputGroup, Input, InputRightElement } from '@chakra-ui/react';

export const TextInput = ({label}) => {
	return (
		<VStack w="300px" align="left">
			<Text ml="18px">{label}</Text>
			<Input variant="filled" />
		</VStack>
	);
};

export const PasswordInput = ({label}) => {
	const [ show, setShow ] = useBoolean();

	return (
		<VStack w="300px" align="left">
			<Text ml="18px">{label}</Text>
			<InputGroup size="md">
				<Input variant="filled" type={show ? 'text' : 'password'} />
				<InputRightElement width="4.5rem">
					<Button h="1.75rem" size="sm" onClick={setShow.toggle}>
						{show ? 'Hide' : 'Show'}
					</Button>
				</InputRightElement>
			</InputGroup>
		</VStack>
	);
};
