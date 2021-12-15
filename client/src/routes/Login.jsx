import { HStack, Image, Box, Spacer, Button, VStack, Heading, Container, Text } from '@chakra-ui/react';
import { TextInput, PasswordInput } from '../components/TextInput';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { InvalidMessage } from '../components/InvalidMessage';
import { Link as RouterLink } from 'react-router-dom';
import drum from '../assets/images/drum.png';

export const Login = () => {
	const navigate = useNavigate();
	const [ isInvalid, setIsInvalid ] = useState(false);
	const [ isValid, setValid ] = useState(false);

	const LoginOnClick = (values, actions) => {
		setIsInvalid(false);
		setValid(false);
		actions.setSubmitting(false);
		Axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, values, {
			headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
		}).then((response) => {
			if (response.data === 'invalid') {
				setIsInvalid(true);
				console.log('user name or password is invalid');
			} else {
				sessionStorage.setItem('user-data', JSON.stringify(values));
				sessionStorage.setItem('isUserLogged', true);
				let data = sessionStorage.getItem('user-data');
				data = JSON.parse(data);
				Axios.post(
					`${process.env.REACT_APP_SERVER_URL}/get-user`,
					{
						phone_number: data.phone_number
					},
					{
						headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
					}
				).then((response) => {
					sessionStorage.setItem('user-data', JSON.stringify(response.data[0]));
				});
				sessionStorage.getItem('isUserLogged');
				navigate('/user');
			}
		});
	};

	return (
		<VStack overflow="hidden" height="100vh" position="relative" width="100vw" alignItems="flex-end">
			<HStack width="full" zIndex={10} paddingLeft="5vw" paddingRight="10vw">
				<RouterLink to="/">
					<Text
						fontWeight={700}
						color="white"
						fontSize="2xl"
						opacity="60%"
						paddingTop="30px"
						paddingBottom="30px"
					>
						moseeqi
					</Text>
				</RouterLink>
				<Spacer />
				<Button colorScheme="primary" textColor="white" size="sm" onClick={() => navigate(-1)}>
					Back
				</Button>
			</HStack>

			<Box
				borderRadius="100%"
				position="absolute"
				width="130vw"
				height="130vw"
				bgGradient="linear(to-r, brand.secondary, brand.primary)"
				bottom={10}
				right="50vw"
			/>

			<Image
				position="absolute"
				bottom="10vh"
				left="10vw"
				boxSize="60vh"
				objectFit="contain"
				src={drum}
				alt="BG"
				//filter="drop-shadow(10px 10px 10px #555)"
			/>

			<VStack position="absolute" left="5vw" top="20vh" spacing={5} alignItems="flex-start">
				<Heading color="white">Join us now!</Heading>
				<RouterLink to="/signup">
					<Button size="lg">Sign Up</Button>
				</RouterLink>
			</VStack>

			<VStack spacing={10} width="40vw" paddingRight="10vw" paddingTop="30px">
				<Heading fontWeight={800} size="md">
					Login
				</Heading>
				<Formik initialValues={{ phone_number: '', password: '' }} onSubmit={LoginOnClick}>
					{(props) => (
						<Form>
							<VStack spacing={8} width="30vw">
								<Field name="phone_number">
									{({ field, form }) => (
										<TextInput
											label="Phone Number"
											id="phone_number"
											placeholder=""
											field={field}
											error={form.errors.phone_number}
											touched={form.touched.phone_number}
											type="tel"
										/>
									)}
								</Field>
								<Field name="password">
									{({ field, form }) => (
										<PasswordInput
											label="Password"
											id="password"
											placeholder=""
											field={field}
											error={form.errors.password}
											touched={form.touched.password}
										/>
									)}
								</Field>

								<Button
									colorScheme="secondary"
									width="50%"
									size="lg"
									isLoading={props.isSubmitting}
									type="submit"
								>
									Log In
								</Button>
							</VStack>
						</Form>
					)}
				</Formik>
				{isInvalid ? <InvalidMessage message="Invalid Phone Number or Password!" /> : null}
			</VStack>
		</VStack>
	);
};
