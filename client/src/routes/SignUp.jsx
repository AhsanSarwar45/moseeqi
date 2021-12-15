import { Button, Box, Image, HStack, Spacer, VStack, Heading, Container, Text } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import validator from 'validator';
import { TextInput, PasswordInput } from '../components/TextInput';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import viola from '../assets/images/viola.png';
import Axios from 'axios';

export const SignUp = () => {
	const navigate = useNavigate();
	const [ isDup, setIsDup ] = useState(false);

	const SignUpOnClick = (values, actions) => {
		setTimeout(() => {
			actions.setSubmitting(false);
			Axios.post(
				`${process.env.REACT_APP_SERVER_URL}/create_user`,
				values,
				{
					headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
				},
				{
					headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
				}
			).then((response) => {
				console.log(response.data);
				if (response.data === 'user-added') {
					//console.log('Sucess!');
					navigate('/signup_success');
				} else if (response.data === 'duplicate-entry') {
					//update page
					console.log('check');
					setIsDup(true);
				}
			});
		}, 1000);
	};

	const validate = (values) => {
		const errors = {};

		if (!values.username) {
			errors.username = 'Username is required';
		}
		if (!values.email) {
			errors.email = 'Email is required';
		} else if (!validator.isEmail(values.email)) {
			errors.email = 'Invalid Email';
		}
		if (!values.phone_number) {
			errors.phone_number = 'Phone Number is required';
		} else if (!validator.isMobilePhone(values.phone_number)) {
			errors.phone_number = 'Invalid Phone Number';
		} else if (isDup) {
			errors.phone_number = 'Phone Number already registered';
		}

		if (!values.password) {
			errors.password = 'Password is required';
		}

		if (values.password && values.confirm !== values.password) {
			errors.confirm = 'Passwords do not match';
		}
		//...

		return errors;
	};

	return (
		<VStack overflowX="hidden" height="100vh" position="relative" width="100vw" alignItems="flex-start">
			<HStack width="full" zIndex={10} paddingLeft="10vw" paddingRight="5vw">
				<Button colorScheme="secondary" textColor="white" size="sm" onClick={() => navigate(-1)}>
					Back
				</Button>
				<Spacer />
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
			</HStack>

			<Box
				borderRadius="100%"
				position="absolute"
				width="130vw"
				height="130vw"
				bgGradient="linear(to-r, brand.secondary, brand.primary)"
				bottom={10}
				left="50vw"
			/>

			<Image
				position="absolute"
				bottom="10vh"
				right="10vw"
				boxSize="60vh"
				objectFit="contain"
				src={viola}
				alt="BG"
				//filter="drop-shadow(10px 10px 10px #555)"
			/>

			<VStack position="absolute" right="5vw" top="20vh" spacing={5} alignItems="flex-end">
				<Heading color="white">One of us already?</Heading>
				<RouterLink to="/login">
					<Button size="lg">LOGIN</Button>
				</RouterLink>
			</VStack>

			<VStack spacing={10} paddingLeft="10vw" paddingTop="30px" paddingBottom="30px" width="40vw">
				<Heading fontWeight={800} size="md">
					Create Account
				</Heading>
				<Formik
					initialValues={{ username: '', email: '', phone_number: '', password: '', confirm: '' }}
					onSubmit={SignUpOnClick}
					validate={validate}
				>
					{(props) => (
						<Form>
							<VStack spacing={8} width="30vw">
								<Field name="username">
									{({ field, form }) => (
										<TextInput
											label="Username"
											id="username"
											placeholder=""
											field={field}
											error={form.errors.username}
											touched={form.touched.username}
										/>
									)}
								</Field>
								<Field name="email">
									{({ field, form }) => (
										<TextInput
											label="Email"
											id="email"
											placeholder="example@site.com"
											field={field}
											error={form.errors.email}
											touched={form.touched.email}
										/>
									)}
								</Field>
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
								<Field name="confirm">
									{({ field, form }) => (
										<PasswordInput
											label="Confirm Password"
											id="confirm"
											placeholder=""
											field={field}
											error={form.errors.confirm}
											touched={form.touched.confirm}
										/>
									)}
								</Field>

								<Button
									colorScheme="primary"
									width="50%"
									size="lg"
									isLoading={props.isSubmitting}
									type="submit"
								>
									Sign Up
								</Button>
							</VStack>
							<VStack w="300px" align="left" pt={5}>
								<Text textColor="gray" align="center" fontSize="8pt">
									By Signing up, you agree to our terms and conditions{' '}
								</Text>
							</VStack>
						</Form>
					)}
				</Formik>
			</VStack>
		</VStack>
	);
};
