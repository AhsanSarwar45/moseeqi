import { Container, Box, Text } from '@chakra-ui/layout';

export const InvalidMessage = ({ message, color="red", bg="linear(to-t, pink.200, pink.100)" }) => {
	return (
		<Box shadow="md" borderRadius="full" padding={2} w="300px" bgGradient={bg}>
			<Text textColor={color} align="center" fontSize="12pt">
				{message}
			</Text>
		</Box>
	);
};
