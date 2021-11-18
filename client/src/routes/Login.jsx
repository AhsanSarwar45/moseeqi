import { Button, VStack, Heading, Container, Text } from '@chakra-ui/react';
import { TextInput, PasswordInput } from '../components/TextInput';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const InvalidMessage = () => {
	return (
		<Container maxWidth="full" pt="30px">
			<Text textColor="red" align="center" fontSize="12pt">
				Password or Phone Number is Invalid{' '}
			</Text>
		</Container>
	);
};

export const Login = () => {
	const navigate = useNavigate();
	const [ isInvalid, setIsInvalid ] = useState(false);

	const LoginOnClick = (values, actions) => {
		setIsInvalid(false);
		actions.setSubmitting(false);
		Axios.post('http://localhost:3001/login', values).then((response) => {
			if (response.data === 'invalid') {
				setIsInvalid(true);
				console.log('user name or password is invalid');
			} else {
				console.log('sucess login', response.data, '!');

<<<<<<< HEAD
				sessionStorage.setItem('user-data', JSON.stringify(values));
				sessionStorage.setItem('isUserLogged', true);
=======
    const LoginOnClick =  (values, actions)=>{
        setIsInvalid(false);
        setValid(false);
        actions.setSubmitting(false);
        Axios.post('http://localhost:3001/login', 
		{
			phone_number: phone_number,
			password: password
		}).then((response)=>{
            if (response.data === "/invalid"){
                setIsInvalid(true);
                console.log("user name or password is invalid");
            } else {
                
                console.log("sucess login", response.data, "!");
				
                sessionStorage.setItem("user-data", JSON.stringify(values));
                sessionStorage.setItem("isUserLogged", true);
>>>>>>> 1b7bd806b174c78e46f160f0a400a53df0bd6bfa

				let data = sessionStorage.getItem('user-data');
				data = JSON.parse(data);
<<<<<<< HEAD
				console.log(data);
				Axios.post('http://localhost:3001/get-user', {
					phone_number: data.phone_number
				}).then((response) => {
					console.log(`recieved: `, response);
				});
				sessionStorage.getItem('isUserLogged');
=======
				//console.log(data);
				Axios.post('http://localhost:3001/get-user', 
				{
					phone_number: data.phone_number
				}).then((response)=>{
					console.log("recieved: ", response);
				})
				sessionStorage.getItem("isUserLogged");
>>>>>>> 1b7bd806b174c78e46f160f0a400a53df0bd6bfa
				navigate('/user');
			}
		});
	};

	return (
		<Container maxWidth="full" pt="30px">
			<VStack padding={0} spacing={5}>
				<Heading size="md">Login</Heading>
				{isInvalid ? <InvalidMessage /> : null}
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

<<<<<<< HEAD
							<Button
								colorScheme="secondary"
								w="full"
								size="lg"
								isLoading={props.isSubmitting}
								type="submit"
							>
								Sign Up
							</Button>
						</Form>
					)}
				</Formik>
			</VStack>
		</Container>
	);
=======
                        <Button
                            colorScheme="secondary"
                            w="full"
                            size="lg"
                            isLoading={props.isSubmitting}
                            type="submit"
                        >
                            Log In
                        </Button>
                    </Form>
                )}
            </Formik>
        </VStack>
    </Container>

    );
   
>>>>>>> 1b7bd806b174c78e46f160f0a400a53df0bd6bfa
};
