import React from 'react';
import {
	useBoolean,
	Box,
	Icon,
	Text,
	VStack,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Button,
	InputGroup,
	Input,
	InputRightElement
} from '@chakra-ui/react';
import { MdVisibilityOff, MdVisibility } from 'react-icons/md';

export const TextInput = ({ label, id, placeholder, field, error, touched, type }) => {
	return (
		<FormControl isInvalid={error && touched}>
			<FormLabel ml="18px" htmlFor={id}>
				{label}
			</FormLabel>
			<Input {...field} id={id} width="100%" placeholder={placeholder} variant="filled" type={type} />
			<FormErrorMessage>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const SimpleInput = ({ label, value, onChange, type }) => {
	return (
		<VStack w="300px" align="left">
			<Text ml="18px">{label}</Text>
			<Input type={type} value={value} onChange={onChange} variant="filled" />
		</VStack>
	);
};

SimpleInput.defaultProps = {
	label: 'Input',
	type: ''
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
					<Icon
						cursor="pointer"
						color="brand.primary"
						w={6}
						h={6}
						onClick={setShow.toggle}
						as={show ? MdVisibility : MdVisibilityOff}
					/>
				</InputRightElement>
			</InputGroup>
			<FormErrorMessage>{error}</FormErrorMessage>
		</FormControl>
	);
};
