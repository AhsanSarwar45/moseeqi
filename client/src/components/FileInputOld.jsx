import Axios from 'axios';
import React, {Fragment, useState} from 'react';

export const FileInputOld = () => {
	const [file, setFile] = useState('');
	const [fileName, setFileName] = useState('Choose File');
	const [uploadedFile, setUploadedFile] = useState({});

	const onChange = e => {
		setFile(e.target.files[0]);
		setFileName(e.target.files[0].name);
	};

	const onSubmit = async e => {
		e.preventDefault();
		var formData = new FormData();
		formData.append('file', file);
		console.log("fd:", formData);

		try{
			const res = await Axios.post('http://localhost:3001/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			const {fileName, filePath} = res.data;
			setUploadedFile({fileName, filePath});
		} catch( err ) {
			if (err.response.status === 400) {
				console.log('No File Uploaded.');
			} else if (err.response.status === 500) {
				console.log('Server Error');
			} else {
				console.log(err);
			}
		}
	};

	return (
		<Fragment>
            <form onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                <input type="file" className="custom-file-input" id="customFile" onChange={onChange}/>
                <label className="custom-file-label" htmlFor="customFile">{fileName}</label>
                <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4"/>
                </div>
            </form>
        </Fragment>
	);
};