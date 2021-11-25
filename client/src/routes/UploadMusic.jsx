import { Button, HStack, Spacer, VStack, Heading, Container, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { TextInput} from '../components/TextInput';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';


export const UploadMusic = () => {
	const navigate = useNavigate();
	const [ fieldValue, setFieldValue] = useState('');

	const UploadOnClick = (values, actions) => {
		setTimeout(() => {
			actions.setSubmitting(false);
			console.log({ 
				fileName: values.file.name, 
				type: values.file.type,
				size: `${values.file.size} bytes`
			  })
		}, 1000);
	};

	
	const handleFileUpload = (event) => {
		this.setState({WAHTEVETKEYYOUNEED: event.currentTarget.files[0]})};

	const validate = (values) => {
		const errors = {};

		if (!values.name) {
			errors.name = 'Name is required';
		}
		if (!values.file) {
			errors.file = 'File is required';
		}
		//...

		return errors;
	};

	return (
        <div>
        <HStack w="full" pr={20} pt={5} pb={5} pl={10} spacing={10} bg="brand.primary">
            <Spacer />
			<Link to="/user">
				<Button colorScheme="blue" textColor="white" size="sm">
                    Back   
				</Button>
			</Link>
		</HStack>
		<Container maxWidth="full" pt="30px">
			<VStack padding={0} spacing={10}>
				<Heading size="md">Upload Music</Heading>
				<Formik
					initialValues={{ name: '', file: '', confirm: '' }}
					onSubmit={UploadOnClick}
					validate={validate}
				>
					{(props) => (
						<Form>
							<Field name="name">
								{({ field, form }) => (
									<TextInput
										label="Song Name"
										id="name"
										placeholder=""
										field={field}
										error={form.errors.name}
										touched={form.touched.name}
									/>
								)}
							</Field>
							<Field name="file">
								{({ field, form }) => (
									<input 
									id="file"
									name="file"
									type="file"
									onChange={(event) => {
										setFieldValue("file", event.currentTarget.files[0]);
									  }} />
								)}
							</Field>
							<Button
								colorScheme="primary"
								w="full"
								size="lg"
								isLoading={props.isSubmitting}
								type="submit"
							>
								Upload
							</Button>
							<VStack w="300px" align="left" pt={5}>
								<Text textColor="gray" align="center" fontSize="8pt">
									By Uploading thid file, you agree to our terms and conditions{' '}
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
