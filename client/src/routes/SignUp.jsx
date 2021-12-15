import { Button, HStack, Spacer, VStack, Heading, Container, Text } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import validator from 'validator';
import { TextInput, PasswordInput } from '../components/TextInput';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Axios from 'axios';

export const SignUp = () => {
	const navigate = useNavigate();
	const [ isDup, setIsDup ] = useState(false);

	const SignUpOnClick = (values, actions) => {
		setTimeout(() => {
			actions.setSubmitting(false);
			Axios.post('https://sharkbit-111.uc.r.appspot.com/create_user', values, {headers:{'Access-Control-Allow-Origin':'*','Content-Type': 'application/json'}}).then((response) => {
				console.log(response.data);
				if (response.data === 'user-added') {
					//console.log('Sucess!');
					navigate('/signup_success');
				} else if (response.data === 'duplicate-entry') {
					//update page
					console.log("check");
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
        <div>
        <HStack w="full" pr={20} pt={5} pb={5} pl={10} spacing={10} bg="brand.primary">
            <Spacer />
			<Button colorScheme="blue" textColor="white" size="sm" onClick={()=> navigate(-1)}>
				Back   
			</Button>
		</HStack>
		<Container maxWidth="full" pt="30px">
			<VStack padding={0} spacing={10}>
				<Heading size="md">Create Account</Heading>
				<Formik
					initialValues={{ username: '', email: '', phone_number: '', password: '', confirm: '' }}
					onSubmit={SignUpOnClick}
					validate={validate}
				>
					{(props) => (
						<Form>
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
								w="full"
								size="lg"
								isLoading={props.isSubmitting}
								type="submit"
							>
								Sign Up
							</Button>
							<VStack w="300px" align="left" pt={5}>
								<Text textColor="gray" align="center" fontSize="8pt">
									By Signing up, you agree to our terms and conditions{' '}
								</Text>
							</VStack>
						</Form>
					)}
				</Formik>
			</VStack>
		</Container>
		</div>
	);
};
