import React from 'react';
import {
	useBoolean,
	Box,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Button,
	InputGroup,
	Input,
	InputRightElement
} from '@chakra-ui/react';

export const TextInput = ({ label, id, placeholder, field, error, touched, type }) => {
	return (
		<FormControl isInvalid={error && touched}>
			<FormLabel ml="18px" htmlFor={id}>
				{label}
			</FormLabel>
			<Input {...field} id={id} placeholder={placeholder} variant="filled" type={type} />
			<FormErrorMessage>{error}</FormErrorMessage>
			<Box w="100%" h={5} p={4} color="white" />
		</FormControl>
	);
};

export const PasswordInput = ({ label, id, placeholder, field, error, touched }) => {
	const [ show, setShow ] = useBoolean();

	return (
		<FormControl isInvalid={error && touched}>
			<FormLabel ml="18px" htmlFor={id}>
				{label}
			</FormLabel>
			<InputGroup size="md">
				<Input
					{...field}
					id={id}
					placeholder={placeholder}
					variant="filled"
					type={show ? 'text' : 'password'}
				/>
				<InputRightElement width="4.5rem">
					<Button h="1.75rem" size="sm" onClick={setShow.toggle}>
						{show ? 'Hide' : 'Show'}
					</Button>
				</InputRightElement>
			</InputGroup>
			<FormErrorMessage>{error}</FormErrorMessage>
			<Box w="100%" h={5} p={4} color="white" />
		</FormControl>
	);
};
