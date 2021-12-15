import { Navbar } from '../components/NavBar';
import { Button, Box, Heading, HStack, VStack, Image, Text } from '@chakra-ui/react';
import { Footer } from '../components/Footer';
import { Link as RouterLink } from 'react-router-dom';

export const Landing = () => (
	<div className="home">
		<Box h="100vh" w="full" bg="brand.primary" position="relative">
			<Navbar />
			{/* <MusicVisualizer /> */}
			<HStack height="100%" width="100%" paddingTop="10vh" paddingLeft="10vw" paddingRight="10vw">
				<VStack alignItems="flex-start">
					<Heading color="white" fontSize="4vw">
						Create Music
					</Heading>
					<HStack>
						<Heading color="white" fontSize="4vw">
							that Moves People
						</Heading>
						<Heading color="brand.secondary" fontSize="4vw">
							.
						</Heading>
					</HStack>
					<Text
						width="30vw"
						color="white"
						fontSize="1.5vw"
						opacity="60%"
						paddingTop="30px"
						paddingBottom="30px"
					>
						Moseeqi allows you to create, share and listen to music as part of a global community
					</Text>
					<RouterLink to="/signup">
						<Button colorScheme="secondary" size="lg" textColor="white ">
							Get Started
						</Button>
					</RouterLink>
				</VStack>
			</HStack>
			<Image
				position="absolute"
				bottom={0}
				right="10vw"
				boxSize="35vw"
				objectFit="cover"
				src="https://cdni.iconscout.com/illustration/premium/thumb/girl-listening-music-with-headphone-1792791-1519342.png"
				alt="BG"
			/>
		</Box>
		<Box h="100vh" w="full" bg="brand.secondary" />
		<Footer />
	</div>
);
