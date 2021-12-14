import AudioPlayer from 'react-h5-audio-player';
import { Spacer, Image, HStack, Button, VStack, Heading, Text, Box, StackDivider } from '@chakra-ui/react';
import 'react-h5-audio-player/lib/styles.css';
import Axios from 'axios';
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

export const MusicPlayer = ({ source, ph, sn }) => (
	<AudioPlayer
		src={source}
		onPlay={(e) => console.log('onPlay')}
		showFilledVolume={true}
		onEnded={(e) => {
			console.log("in onEnded");
			Axios.post('http://localhost:3001/add_listen', {
			s_ph: ph,
			s_name: sn,
			listener_ph: JSON.parse(sessionStorage.getItem("user-data")).phone_number
			}).then((err) => {
				if (err) {
					console.log("error occured");
					throw err;
				} else {
					console.log("listen added to db");
				};
			});
		}}
	/>
);

