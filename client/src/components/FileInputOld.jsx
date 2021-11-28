import Axios from 'axios';
import { Container } from '@chakra-ui/react';
import React, { Fragment, useState } from 'react';
import { InvalidMessage } from './InvalidMessage';

export const FileInputOld = () => {
	const [ file, setFile ] = useState('');
	const [ fileName, setFileName ] = useState('Choose File');
	const [ uploadedFile, setUploadedFile ] = useState({});
	const [ isDup, setIsDup ] = useState(false);

	const onChange = (e) => {
		setFile(e.target.files[0]);
		setFileName(e.target.files[0].name);
	};

	const onSubmit = async (e) => {
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
				} else if (response.data === 'duplicate-entry') {
					//update page
					setIsDup(true);
				}
			})
			.catch((err) => {
				if (err.response.status === 400) {
					console.log('No File Uploaded.');
				} else if (err.response.status === 500) {
					console.log('Server Error');
				} else {
					console.log(err);
				}
			});
		// const { fileName, filePath } = res.data;
		// setUploadedFile({ fileName, filePath });
	};

	return (
		<Container>
			<form onSubmit={onSubmit}>
				<div>
					<input accept="audio/*" type="file" id="customFile" onChange={onChange} />
					<label className="custom-file-label" htmlFor="customFile">
						{fileName}
					</label>
					<input type="submit" value="Upload" />
				</div>
			</form>
			{isDup ? <InvalidMessage message="Duplicate file name!" /> : null}
			{/* <FileUpload name="File" acceptedFileTypes="image/*" /> */}
		</Container>
	);
};
