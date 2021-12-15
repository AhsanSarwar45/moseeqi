import { Button, HStack, Spacer, Icon, VStack, Heading, Container, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FileInputOld } from '../components/FileInputOld';
import { TiChevronLeft } from 'react-icons/ti';

export const UploadMusic = () => {
	const navigate = useNavigate();

	return (
		<VStack height="100vh" spacing="20px" bgColor="brand.primary">
			<HStack w="full" pr={20} pt={5} pb={5} pl={10} spacing={10} bg="brand.primary">
				{/* <Button colorScheme="blue" textColor="white" size="sm" onClick={() => navigate(-1)}>
					Back
				</Button> */}
				<HStack cursor="pointer" onClick={() => navigate(-1)}>
					<Icon color="white" w={6} h={6} as={TiChevronLeft} />
					<Text textColor="white" fontSize="lg">
						Back
					</Text>
				</HStack>
			</HStack>
			<VStack padding="20px" spacing="20px" borderRadius="20px" bgColor="white">
				<Heading size="md">Upload Music</Heading>
				<FileInputOld />
				<Text textColor="black" opacity="60%" align="center" fontSize="8pt">
					By Uploading this file, you agree to our terms and conditions.{' '}
				</Text>
			</VStack>
		</VStack>
	);
};
