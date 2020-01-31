/**
 * React Native main player for the react native video streaming service
 */

import React, { Component } from 'react';
import axios from 'react-native-axios';
import {
  AlertIOS,
  View,
  Text,
  Image, 
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { Icon } from 'react-native-elements';
import Header from './Header';
import AlbumArt from './AlbumArt';
import ChapterDetails from './ChapterDetails';
import SeekBar from './SeekBar';
import Controls from './Controls';
import Video from 'react-native-video';

export default class FullPlayer extends Component {
  constructor(props) {
    super(props);
	// TODO: This is the url query for the purchased books for the Library	
	/*	
	this.route = '/android/purchased-books/';
	this.user = 'jandog8990';
	*/	
	this.route = '/android/books/player/';
	  this.orderId = '5c81be173a162c491abb1cfd'; 
	  this.isbn = '967714';
	  this.titleId = 'Outlaw';
	  this.server = 'https://c24feb7b.ngrok.io';
	//this.audioUrl = this.server + this.route + this.user; 
	this.audioUrl = this.server + this.route + this.isbn + "/" + this.titleId + "/" + this.orderId;
	this.onLoad = this.onLoad.bind(this);
	this.onProgress = this.onProgress.bind(this);
	this.onPlay = this.onPlay.bind(this);
	this.onPause = this.onPause.bind(this);

    this.state = {
      isLoading: true,
	  dataSource: {},
	  chapterList: [], 
	  rate: 1, 
	  paused: true,
      totalLength: 1,
      currentPosition: 0,
      selectedChapter: 0,
	  volume: 1,
	  duration: 0.0,
	  currentTime: 0.0,
	  controls: false
	};
  }

	// Navigation options for moving between screens from the main app
	// TODO: Change the title to the title of the book	
	static navigationOptions = ({ navigation, navigationOptions }) => {
			//headerLeftContainerStyle: {paddingLeft: 20},	
			//name={Platform.OS === "ios" ? "ios-down-arrow" : "md-down-arrow"}
		return {
			title: navigation.getParam('bookTitle', 'Full Player'),
			gesturesEnabled: false,	
			headerBackTitleVisible: false,	
			headerTitleStyle: { color: 'black', fontSize: 14, width : Dimensions.get('window').width/1.6, textAlign: 'center'},	
			headerStyle: { backgroundColor: 'white' },
			headerTintColor: 'black',
			headerLeft: () =>
				<TouchableOpacity onPress={() => navigation.goBack()}>	
				<Icon 
					containerStyle={{paddingLeft:20, paddingTop: 5}}
					type="material"
					color='black'	
					size={30}
					name="keyboard-arrow-down"	
				/>	
				</TouchableOpacity>,
			headerRight: () =>
				<TouchableOpacity> 
				<Icon 
					containerStyle={{paddingRight:20, paddingTop: 0}}
					type="material"
					color='black'	
					size={30}
					name="more-vert"	
				/>
				</TouchableOpacity>,
		};
	};

	// Component mounted => query the database for the audiobook
	componentDidMount() {
		console.log("Component did MOUNT!");
		console.log("Fetch url = " + this.audioUrl);	
		this.fetchJSONAsync(this.audioUrl);	
	}

	// Fetch the purhchased book using the url
	fetchJSONAsync = async(audiobookUrl) => {
		try {
			const resp = await axios.get(audiobookUrl);
			console.log("Axis Response:");
			console.log(resp.data);
			console.log("\n");
		
			// TODO Append the spaces with %20 fill in for audio files to run
			const audioList = resp.data.audioBook.audio_list;	
			const audioLen = audioList.length; 
			console.log("Audio len = " + audioLen);
			for (var i = 0; i < audioLen; i++) {
				var audio = audioList[i].AUDIO_LOC;
				var encode = audio.replace(/ /g, "%20");
				audioList[i].AUDIO_LOC = encode;
			}

			this.setState({
				isLoading: false,
				dataSource: resp.data.audioBook,
				chapterList: audioList 
			});
		} catch(err) {
			console.error(err);
		}
	}

  onLoad(data) {
    console.log("On Load Fired (data)!");
    console.log(this.state.selectedChapter);	
	console.log(data);	
	console.log(data.target);
	console.log("\n");
	this.setState({duration: data.target});
  }

  onProgress(data) {
    console.log("On Progress (data)!");
	//console.log(data);
	console.log("\n");
    this.setState({currentTime: data.currentTime});
  }

  onPlay(data) {
    console.log("On Press Play(data)!");
	console.log("data duration = " + data.duration);
	this.setState({paused: false});
	this.setState({duration: data.duration});
  }

  onPause(data) {
    console.log("On Press Pause(data)!");
	//console.log(data);
	this.setState({paused: true});
  }

  setDuration(data) {
    console.log("Set Duration (data):"); 
	console.log(data.duration);
	console.log("\n");
    this.setState({totalLength: Math.floor(data.duration)});
  }

  setTime(data) {
   	console.log("Set Time:"); 
	console.log(data.currentTime);
	console.log("\n");
    this.setState({currentPosition: Math.floor(data.currentTime)});
  }

  seek(time) {
    time = Math.round(time);
    this.refs.audioElement && this.refs.audioElement.seek(time);
    this.setState({
      currentPosition: time,
      paused: false,
    });
  }

  onBack() {
    console.log("On Back:");
	
	if (this.state.currentPosition < 10 && this.state.selectedChapter > 0) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({ isChanging: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        paused: false,
        totalLength: 1,
        isChanging: false,
        selectedChapter: this.state.selectedChapter - 1,
      }), 0);
    } else {
      this.refs.audioElement.seek(0);
      this.setState({
        currentPosition: 0,
      });
    }
  }

  onForward() {
    if (this.state.selectedChapter < this.state.chapterList.length - 1) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({ isChanging: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        totalLength: 1,
        paused: false,
        isChanging: false,
        selectedChapter: this.state.selectedChapter + 1,
      }), 0);
    }
  }



  render() {
	  const dataSource = this.state.dataSource;
	  const chapter = this.state.chapterList[this.state.selectedChapter];

	  console.log("Selectd chapter = " + this.state.selectedChapter);
	  console.log("Chapter:");
	  console.log(chapter);
	  console.log("\n");

	  if (this.state.isLoading) {
		  return(
			  <SafeAreaView style={{flex:1, paddingTop:40}}>
			  	<ActivityIndicator/>
			  </SafeAreaView>
		  )
	  }
		
	  /*	  
	  */
	
	/*
	 * Play the audio in the background requires:
	 * 		playInBackground=true	
	 *		ignoreSilentSwitch="ignore"	
	 */
        //<Header message="Playing From Charts" />
	//dataSource.photo_loc
        //<AlbumArt url={"/Users/alejandrogonzales/Development/MyProjects/React-Native/ReactMusic/img/migueloutlaw.jpg"}/>
	console.log("Chapter list length = " + this.state.chapterList.length);	
	console.log("Audio loc = " + chapter.AUDIO_LOC);
	console.log("Photo loc = " + chapter.PHOTO_LOC);	
	console.log("\n");
	return (
      <SafeAreaView style={styles.container}>
	  	<Video
			source={{uri: chapter.AUDIO_LOC, type: "m3u8"}} // Can be a URL or a local file.
			ref="audioElement"
			playInBackground={true}	
			playWhenInactive={true}	
			ignoreSilentSwitch="ignore"	
			style={styles.audioElement}
			paused={this.state.paused}
			onLoadStart={this.loadStart} // Callback when video starts to load
			onLoad={this.setDuration.bind(this)} // Callback when video loads
			onProgress={this.setTime.bind(this)} // Callback every ~250ms with currentTime
			onEnd={() => { console.log("Audio ended..."); }} 
			resizeMode="cover"
			rate={this.state.rate}
			onBuffer={this.onBuffer} // Callback when remote video is buffering
			onError={this.onError} // Callback when video cannot be loaded
			fullscreen={false}
		  />
		<StatusBar hidden={true} />
        <AlbumArt url={chapter.PHOTO_LOC} />
        <ChapterDetails title={chapter.TITLE} /> 
		<SeekBar
        	onSeek={this.seek.bind(this)}
          	chapterLength={this.state.totalLength}
          	onSlidingStart={() => this.setState({paused: true})}
          	currentPosition={this.state.currentPosition} />
        <Controls
          	forwardDisabled={this.state.selectedChapter === this.state.chapterList.length - 1}
          	onPressPlay={this.onPlay} 
          	onPressPause={this.onPause}
          	onBack={this.onBack.bind(this)}
          	onForward={this.onForward.bind(this)}
          	paused={this.state.paused}/>
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
const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white', 
 	marginTop: 10 
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
};
