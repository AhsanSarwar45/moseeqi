import Axios from 'axios';
import { Container, Button, HStack, Spacer, VStack, InputGroup, FormControl, Input, Heading } from '@chakra-ui/react';
import React, { Fragment, useState } from 'react';
import { InvalidMessage } from './InvalidMessage';

export const FileInputOld = () => {
	const [ file, setFile ] = useState('');
	const [ fileName, setFileName ] = useState('Choose File');
	const [ uploadedFile, setUploadedFile ] = useState(false);
	const [ noFile, setNoFile ] = useState(false);
	const [ isDup, setIsDup ] = useState(false);

	const onChange = (e) => {
		setFile(e.target.files[0]);
		setFileName(e.target.files[0].name);
	};

	const onSubmit = async (e) => {
		setIsDup(false);
		setUploadedFile(false);
		setNoFile(false);
		e.preventDefault();
		let data = sessionStorage.getItem('user-data');
		data = JSON.parse(data);
		var formData = new FormData();
		formData.append('file', file);
		formData.append('ph', data.phone_number);
		formData.append('user_name', data.username);

		Axios.post('http://localhost:3001/upload_music', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
			.then((response) => {
				if (response.data === 'success') {
					console.log('Sucess uploading image!');
					setUploadedFile(true);
				} else if (response.data === 'duplicate-entry') {
					setIsDup(true);
				}
			})
			.catch((err) => {
				if (err.response.status === 400) {
					console.log('No File Uploaded.');
					setNoFile(true);
				} else if (err.response.status === 500) {
					console.log('Server Error');
				} else {
					console.log(err);
				}
			});
	};

	return (
			<VStack padding={0} spacing={10}>
				<Input type="file" id="customFile" bgColor="gray.100" padding={2} onChange={onChange}/>
				<Button type="submit" value="UPLOAD" w={200} colorScheme="green" onClick={onSubmit}>
					Upload
				</Button>
				{isDup ? <InvalidMessage message="Duplicate file name!" />: null}
				{noFile ? <InvalidMessage message="No File Selected!" />: null}
				{uploadedFile ? <InvalidMessage message="Upload Successful!" color="green.800" bg="linear(to-t, green.200, green.100)"/> : null}
			</VStack>
	);
};
