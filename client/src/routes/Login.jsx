import { Button, VStack, Heading, Container, Text } from '@chakra-ui/react';
import { TextInput, PasswordInput } from '../components/TextInput';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'

const InvalidMessage = () => {
    return(
        <Container maxWidth="full" pt="30px">
            <Text textColor="red" align="center" fontSize="12pt">
                Password or Phone Number is Invalid{' '}
            </Text>
        </Container>
    );
}


export const Login = () => {
    const navigate = useNavigate();

    const [password, getPassword] = useState("");
    const [phone_number, getPhoneNumber] = useState(0);
    const [isInvalid, setIsInvalid] = useState(false);
    const [isValid, setValid] = useState(false);

    const LoginOnClick =  (values, actions)=>{
        setIsInvalid(false);
        setValid(false);
        actions.setSubmitting(false);
        Axios.post('http://localhost:3001/login', values).then((response)=>{
            if (response.data === "invalid"){
                setIsInvalid(true);
                console.log("user name or password is invalid");
            } else {
                
                console.log("sucess login", response.data, "!");
				
                sessionStorage.setItem("user-data", JSON.stringify(values));
                sessionStorage.setItem("isUserLogged", true);

				let data = sessionStorage.getItem("user-data");
				data = JSON.parse(data);
				console.log(data);
				Axios.post('http://localhost:3001/get-user', 
				{
					phone_number: data.phone_number
				}).then((response)=>{
					console.log(`recieved: `, response);
				})
				sessionStorage.getItem("isUserLogged");
				navigate('/user');
            }
        });
    };

    return(
         
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
        </VStack>
    </Container>

    );
   
};

