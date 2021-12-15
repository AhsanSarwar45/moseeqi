import { HStack, Spacer, Button, VStack, Heading, Container, Text } from '@chakra-ui/react';
import { TextInput, PasswordInput } from '../components/TextInput';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { InvalidMessage } from '../components/InvalidMessage';

export const Login = () => {
	const navigate = useNavigate();
	const [ isInvalid, setIsInvalid ] = useState(false);
	const [ isValid, setValid ] = useState(false);

	const LoginOnClick = (values, actions) => {
		setIsInvalid(false);
		setValid(false);
		actions.setSubmitting(false);
		Axios.post('https://sharkbit-111.uc.r.appspot.com/login', values, {
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
				Axios.post('https://sharkbit-111.uc.r.appspot.com/get-user',{
					phone_number: data.phone_number
				},  {headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'Access-Control-Allow-Methods': 'GET, POST' }
				}).then((response) => {
					sessionStorage.setItem('user-data', JSON.stringify(response.data[0]));
				});
				sessionStorage.getItem('isUserLogged');
				navigate('/user');
			}
		});
	};

	return (
		<div>
			<HStack w="full" pr={20} pt={5} pb={5} pl={10} spacing={10} bg="brand.primary">
				<Spacer />
				<Link to="/">
					<Button colorScheme="blue" textColor="white" size="sm">
						Back
					</Button>
				</Link>
			</HStack>
			<Container maxWidth="full" pt="30px">
				<VStack padding={0} spacing={5}>
					<Heading size="md">Login</Heading>
					<Formik initialValues={{ phone_number: '', password: '' }} onSubmit={LoginOnClick}>
						{(props) => (
							<Form>
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
									w="full"
									size="lg"
									isLoading={props.isSubmitting}
									type="submit"
								>
									LOG IN
								</Button>
							</Form>
						)}
					</Formik>
					{isInvalid ? <InvalidMessage message="Invalid Phone Number or Password!" /> : null}
				</VStack>
			</Container>
		</div>
	);
};
