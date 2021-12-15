import React from 'react';
import { Box, Center, Heading, HStack, Text, Spacer } from '@chakra-ui/react';

export const Footer = () => {
	return (
		<Box h="300px" w="full" bg="black">
			<Center h="80%">
				<Heading color="white" fontWeight={400}>
					moseeqi
				</Heading>
			</Center>
			<HStack pl="20%" pr="20%" spacing={20}>
				<Text color="white">Legal</Text>
				<Text color="white">Privacy Policy</Text>
				<Text color="white">Cookies</Text>
				<Text color="white">Support</Text>
				<Spacer />
				<Text color="white">&copy; 2021 Moseeqi</Text>
			</HStack>
		</Box>
	);
};
