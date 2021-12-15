import Axios from 'axios';
import { Button, VStack, Text, Input, Select } from '@chakra-ui/react';
import React, { useState } from 'react';
import { InvalidMessage } from './InvalidMessage';
import { SimpleInput } from './TextInput';

const Genres = [
	'Rock',
	'Jazz',
	'Hip Hop',
	'Pop',
	'Folk',
	'Blues',
	'Country',
	'Heavy Metal',
	'Popular Music',
	'Classical',
	'Country',
	'Punk',
	'EDM',
	'Techno',
	'Trance',
	'Disco',
	'Dubstep',
	'Instrumental'
];

export const FileInputOld = () => {
	const [ file, setFile ] = useState('');
	const [ fileName, setFileName ] = useState('Choose File');
	const [ uploadedFile, setUploadedFile ] = useState(false);
	const [ noFile, setNoFile ] = useState(false);
	const [ isDup, setIsDup ] = useState(false);
	const [ invalidFile, setInvalidFile ] = useState(false);
	const [ songName, setSongName ] = useState('');
	const [ genre, setGenre ] = useState('');
	const [ isSubmitting, setIsSubmitting ] = useState(false);

	const onChange = (e) => {
		if (e.target.files.length > 0) {
			console.log('[0]:', e.target.files[0].type);
			if (e.target.files[0].type === 'audio/mpeg' || e.target.files[0].type === 'audio/ogg') {
				setFile(e.target.files[0]);
				setFileName(e.target.files[0].name);
				setInvalidFile(false);
			} else {
				setInvalidFile(true);
				setIsDup(false);
			}
			setNoFile(false);
		} else {
			setFile('');
			setInvalidFile(false);
			setIsDup(false);
			setNoFile(true);
		}
		setUploadedFile(false);
	};

	const onSubmit = async (e) => {
		setIsDup(false);
		setUploadedFile(false);
		// setInvalidFile(false);
		setNoFile(false);
		e.preventDefault();
		if (file !== '') {
			setIsSubmitting(true);
			let data = sessionStorage.getItem('user-data');
			data = JSON.parse(data);
			var formData = new FormData();
			formData.append('file', file);
			formData.append('ph', data.phone_number);
			formData.append('user_name', data.username);
			formData.append('sname', songName);
			formData.append('genre', genre);
			Axios.post(`${process.env.REACT_APP_SERVER_URL}/upload_music`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'Access-Control-Allow-Origin': '*'
					//'Content-Type': 'application/json
				}
			})
				.then((response) => {
					if (response.data === 'success') {
						console.log('Sucess uploading image!');
						setUploadedFile(true);
						setIsDup(false);
						setFile('');
						setIsSubmitting(false);
					} else if (response.data === 'duplicate-entry') {
						setIsDup(true);
						setNoFile(false);
					}
				})
				.catch((err) => {
					if (err.response.status === 400) {
						console.log('No File Uploaded.');
						setNoFile(true);
						setIsDup(false);
					} else if (err.response.status === 500) {
						console.log('Server Error');
					} else {
						console.log(err);
					}
				});
		} else {
			setIsDup(false);
			setUploadedFile(false);
			if (!invalidFile) setNoFile(true);
		}
	};

	return (
		<VStack padding={0} spacing="20px">
			<VStack w="300px" align="left">
				<Text ml="18px">Music File</Text>
				<Input
					type="file"
					id="customFile"
					accept="audio/*"
					bgColor="gray.100"
					padding={2}
					onChange={onChange}
				/>
			</VStack>
			<SimpleInput
				label="Song Name"
				value={songName}
				onChange={(event) => {
					setSongName(event.target.value);
				}}
			/>

			<VStack w="300px" align="left">
				<Text ml="18px">Genre</Text>
				<Select
					placeholder="Select Genre"
					variant="filled"
					onChange={(event) => {
						setGenre(event.target.value);
					}}
				>
					{Genres.map((genre, index) => (
						<option key={index} value={index}>
							{genre}
						</option>
					))}
				</Select>
			</VStack>

			{/* <SimpleInput
				label="Genre"
				value={genre}
				onChange={(event) => {
					setGenre(event.target.value);
				}}
			/> */}

			<Button
				type="submit"
				isLoading={isSubmitting}
				value="UPLOAD"
				w={200}
				width="full"
				colorScheme="primary"
				onClick={onSubmit}
			>
				Upload
			</Button>
			{isDup ? <InvalidMessage message="Duplicate file name!" /> : null}
			{noFile ? <InvalidMessage message="No File Selected!" /> : null}
			{invalidFile ? <InvalidMessage message="Invalid File Format." /> : null}
			{uploadedFile ? (
				<InvalidMessage
					message="Upload Successful!"
					color="green.800"
					bg="linear(to-t, green.200, green.100)"
				/>
			) : null}
		</VStack>
	);
};
