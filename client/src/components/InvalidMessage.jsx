import { Container, Text } from '@chakra-ui/layout';

export const InvalidMessage = ({ message }) => {
	return (
		<Container maxWidth="full" pt="30px">
			<Text textColor="red" align="center" fontSize="12pt">
				{message}
			</Text>
		</Container>
	);
};
