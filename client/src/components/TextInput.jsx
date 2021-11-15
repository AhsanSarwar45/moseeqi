import React from 'react';
import { useBoolean, Button, VStack, Text, InputGroup, Input, InputRightElement } from '@chakra-ui/react';

export const TextInput = ({label, value, onChange, type}) => {
	return (
		<VStack w="300px" align="left">
			<Text ml="18px">{label}</Text>
			<Input type = {type} value = {value} onChange = {onChange} variant = "filled" />
		</VStack>
	);
};

TextInput.defaultProps = {
  label: "Input",
  type: "",
}
 

export const PasswordInput = ({label, value, onChange}) => {
	const [ show, setShow ] = useBoolean();

	return (
		<VStack w="300px" align="left">
			<Text ml="18px">{label}</Text>
			<InputGroup size="md">
				<Input variant="filled" value = {value} onChange = {onChange} type={show ? 'text' : 'password'} />
				<InputRightElement width="4.5rem">
					<Button h="1.75rem" size="sm" onClick={setShow.toggle}>
						{show ? 'Hide' : 'Show'}
					</Button>
				</InputRightElement>
			</InputGroup>
		</VStack>
	);
};
