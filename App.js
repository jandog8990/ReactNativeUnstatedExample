/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import axios from 'react-native-axios';
import {
  FlatList,
  ActivityIndicator, 
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// Import another project file
//import List from './components/List'

//const App: () => React$Node = () => {
export default class UnstatedApp extends Component {
  
  // Constructor props and state init
  constructor(props) {
    super(props);
	this.state = { isLoading: true }
  }

  fetchJSONAsync = async(url) => {
    try {
	  const resp = await axios.get(url);
	  console.log("Axios Resp Object:");
	  console.log(resp.data.gridBooks);
	  console.log("\n");
		
	  this.setState({
	    isLoading: false,
	    dataSource: resp.data.gridBooks
	  });
	} catch(err) {
	  console.error(err);
	}
  } 
  
  // Component did mount -> fetch network
  componentDidMount() {
    //let url = 'https://facebook.github.io/react-native/movies.json';
	let url = 'https://b0d67d01.ngrok.io/android/books';	
	this.fetchJSONAsync(url);
  }

  // Render item function
  _renderItem(item) {
    return ( 
	  <Image style={{width: 120, height: 180, marginRight: 5, marginTop: 5}} source={{uri: item.PHOTO_LOC}}/> 
	)	
  }

  render() {
	  let pic = {
        uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
      }; 
	  
	  if (this.state.isLoading) {
	    return(
		  <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator/>
          </View> 
		)
	  }

	  //renderItem={({item}) => <Text>{item.TITLE}, {item.AUTHOR}</Text>}
	  //horizontal	
	  //SeparatorComponent={() => <View style={{marginRight: 5}} />}	
	  return (
		<View style={{alignItems: 'center', top: 50}}>
		<View style={styles.sectionContainer}>
		  <FlatList
			renderItem={({item}) => this._renderItem(item)} 
			keyExtractor={({id}, index) => id}
			data={this.state.dataSource}
		  />
		</View>
		</View>
	  );
  }
}

/*
  fetchJSONAsync = async(url) => {
	try {	
		const response = await fetch(url);
		const responseJson = await response.json();
		console.log("Response Json:");
		console.log(responseJson);
		console.log("\n");
			
		this.setState({
		  isLoading: false,
		  dataSource: responseJson.movies
		});
	} catch(err) {
	    console.error(err);
	}
  }
*/

/*
	return fetch('https://facebook.github.io/react-native/movies.json')
	  .then((response) => response.json())
	  .then((responseJson) => {
	    console.log("Response json = ");
		console.log(responseJson);

	    this.setState({
	  	  isLoading: false,
	      dataSource: responseJson.movies
		}, function() {
		});
 
 	  }).catch((err) => {
	    console.error(err);
	  });
 	*/ 

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
