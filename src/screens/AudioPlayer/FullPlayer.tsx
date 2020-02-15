/**
 * React Native main player for the react native video streaming service
 */

import React, { Component } from 'react';
import axios from 'react-native-axios';
import {
  View,
  Text,
  Image, 
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import { Icon } from 'react-native-elements';
import Header from './Header';
import AlbumArt from './AlbumArt';
import ChapterDetails from './ChapterDetails';
import SeekBar from './SeekBar';
import Controls from './Controls';
import Video from 'react-native-video';

import PlayerController from '../../controllers/PlayerController';

// Import the API configuration for hitting certain endpoints
import { apiConfig } from '../../config/config';
import { AudioBookResponse } from 'src/interfaces/network/AudioBookResponse';
import { Chapter } from 'src/interfaces/models/Chapter';

export default class FullPlayer extends PlayerController {

	// Initilize the audio player
	// TODO Think of how we will pass the audio player across multiple classes
	// and also how to share code from the PlayerController
	audioPlayer;
	navigation = this.props.navigation;

	// Audio URL
	audioUrl: string = apiConfig.baseUrl + apiConfig.bookPlayer + apiConfig.isbn + "/" + apiConfig.titleId + "/" + apiConfig.orderId;

	// Component mounted => query the database for the audiobook
	// TODO: The url and book info should be retrieved from the navigation props from previous page
	componentDidMount() {
		// Build the URL based on the ISBN, SEARCH_ID and ORDER_ID from the Book object
		console.log("Component did MOUNT!");
		console.log("Fetch url = " + this.audioUrl);
		this.fetchJSONAsync(this.audioUrl);
	}

	// Fetch the purhchased book using the url provided in the Library component
	fetchJSONAsync = async(audiobookUrl) => {
		try {
			const response: AudioBookResponse = await axios.get(audiobookUrl);
			console.log("Axis Response:");
			console.log(response.data);
			console.log("\n");
		
			// Create 
			const audioBook = response.data.book;
			const chapterList = response.data.chapterList;	
			const numChapters = chapterList.length; 
			console.log("Number of chapters = " + numChapters);

			// Append the spaces with %20 fill in for audio files to run
			for (var i = 0; i < numChapters; i++) {
				var audio = chapterList[i].AUDIO_LOC;
				var encode = audio.replace(/ /g, "%20");
				chapterList[i].AUDIO_LOC = encode;
			}

			// Set state for the loaded audio book
			this.setState({
				isLoading: false,
				audioBook: audioBook,
				chapterList: chapterList 
			});
		} catch(err) {
			console.error(err);
		}
	}

	// Forward disabled if the index equals the number of chapters (end of book)
	onForwardDisabled = (data) => {
		// does this return a boolean to disable the FWD button?
		const { chapterIndex } = this.props.playerControlContainer.state;
		const chapterList = this.state.chapterList;
		return chapterIndex === chapterList.length - 1;
	}

	// Play method for playing the chapters
	onPlay = (data) => {
		console.log("On Press Play(data)!");
		console.log("data duration = " + data.duration);

		// this.setState({paused: false});
		// this.setState({duration: data.duration});
		this.playCurrentChapter();
	}

	// Tracks the progress of the player
	onProgress = (data) => {
		console.log("On Progress (data)!");
		console.log("\n");

		console.log("Set Time:"); 
		console.log(data.currentTime);
		console.log("\n");

		if (!this.state.isLoading) {
			// this.setState({currentTime: data.currentTime});

			this.updatePlayTime(data.currentTime);
		}
	}

	// End method for for the player ending
	onEnd = () => {
		this.setBookEnded(true);
	}

	// Handle error from the video
	onError = (error) => console.log("Audio player error occurred: " + error);

	// On seek method for ffw and rwd
	onSeek = (time) => {
		time = Math.round(time);

		// this.audioPlayer && this.audioPlayer.seek(time);
		this.audioPlayer.seek(time);

		// this.setState({ currentPosition: time, paused: false });

		// Set the current position
		this.setCurrentPosition(time);

		// Set the paused to false (play)
		this.setPaused(false);
	}

	// On pause from the pause button and also the slider
	onPause = () => {
		console.log("On Press Pause(data)!");

		// this.setState({ paused: true });
		this.setPaused(true);
	}

	onBack = () => {

		// Always seek to the beginning of the audio player then go to previous chapter
		this.audioPlayer && this.audioPlayer.seek(0);

		// Play the previous chapter using PlayerController
		this.playPreviousChapter();
	}

	onForward = () => {

		// Seek to the beginning of the AudioPlayer
		this.audioPlayer && this.audioPlayer.seek(0);

		// Play the next chapter using PlayerController
		this.playNextChapter();
	}

	/**
	 * Update methods for updating the current state of the player
	 */

	// Upade the chapter duration with the current chapter
	updateDuration = (data) => {
		console.log("Set Duration (data):"); 
		console.log(data.duration);
		console.log("\n");

		// this.setState({chapterDuration: Math.floor(data.duration)});
		this.setChapterDuration(Math.floor(data.duration));
	}

	// Set the current position of the chapter using current time
	updateCurrentPosition = (data) => {
		console.log("Set Time:"); 
		console.log(data.currentTime);
		console.log("\n");

		// this.setState({currentPosition: Math.floor(data.currentTime)});
		this.setCurrentPosition(Math.floor(data.currentTime));
	}

  	render() {
		// Import the global states from the states and props
		const { isLoading, chapterList, rate, currentPosition, chapterDuration } = this.state;
		const { paused, chapterIndex } = this.props.playerControlContainer.state;

		// Initialize the chapter from the global state chapter index
		const chapter: Chapter = chapterList[chapterIndex];

		console.log("Selectd chpater index = " + chapterIndex);
		console.log("Chapter:");
		console.log(chapter);
		console.log("\n");

		// Is loading state from the main player controller containers
		if (isLoading) {
			return(
				<SafeAreaView style={{flex:1, paddingTop:40}}>
					<ActivityIndicator/>
				</SafeAreaView>
			)
		}

		/*
		* Play the audio in the background requires:
		* 		playInBackground=true	
		*		ignoreSilentSwitch="ignore"	
		*/
			//<AlbumArt url={"/Users/alejandrogonzales/Development/MyProjects/React-Native/ReactMusic/img/migueloutlaw.jpg"}/>
			// onLoadStart={this.onLoadStart} // Callback when video starts to load
		console.log("Chapter list length = " + chapterList.length);	
		console.log("Audio loc = " + chapter.AUDIO_LOC);
		console.log("Photo loc = " + chapter.PHOTO_LOC);	
		console.log("\n");
		return (
		<SafeAreaView style={styles.container}>
			<Video
				source={{uri: chapter.AUDIO_LOC, type: "m3u8"}} // Can be a URL or a local file.
				ref={audioPlayer => (this.audioPlayer = audioPlayer)}
				playInBackground={true}	
				playWhenInactive={true}	
				ignoreSilentSwitch="ignore"	
				style={styles.audioElement}
				paused={paused}
				onLoad={this.updateDuration} // Callback when video loads
				onProgress={this.updateCurrentPosition} // Callback every ~250ms with current position using time
				onEnd={this.onEnd} 
				resizeMode="cover"
				rate={rate}
				onError={this.onError} // Callback when video cannot be loaded
				fullscreen={false}
			/>
			<StatusBar hidden={true} />
			<AlbumArt url={chapter.PHOTO_LOC} />
			<ChapterDetails title={chapter.TITLE} /> 
			<SeekBar
				chapterDuration={chapterDuration}
				currentPosition={currentPosition}
				onSeek={this.onSeek}
				onSlidingStart={this.onPause} />
			<Controls
				forwardDisabled={this.onForwardDisabled}
				onPressPlay={this.onPlay} 
				onPressPause={this.onPause}
				onBack={this.onBack}
				onForward={this.onForward}
				paused={paused}/>
			<View>
			<TouchableOpacity> 
				<View style={styles.chapterButton}> 
				<Image source={require('../../../img/2x/baseline_format_list_bulleted_black_36dp.png')} style={styles.buttons} />
				<Text style={styles.chapters}>Chapters</Text>	
				</View>
			</TouchableOpacity>
			</View>
		</SafeAreaView>
		);
	}
}

   // tintColor: 'black',
const styles = StyleSheet.create({
  container: {
    flex: 1,
	backgroundColor: 'white',
  },
  chapters: {
    fontSize: 12,
    color: 'rgb(64,64,64)',
    textAlign: 'center',
  },
  buttons: {
 	width: 35,
 	height: 35,
    tintColor: 'purple'
  },
  chapterButton: {
    paddingTop: 30,	
	alignItems: 'center',
	justifyContent: 'center',
  },
  audioElement: {
    height: 0,
    width: 0,
  }
});
