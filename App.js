/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * TODO: Import react native navigation 
 * 
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Subscribe, Provider } from 'unstated';
/*
import { BookContainer } from './BookContainer'
import { CounterContainer } from './CounterContainer'
import { LocationsContainer } from './LocationsContainer'
import AppContainer from './AppContainer'
*/

import axios from 'react-native-axios';
import {
  Platform, 
  FlatList,
  ActivityIndicator, 
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  TextInput,
  StatusBar,
  Image
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
import uuidV4 from 'uuid/v4'

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
	let url = 'https://eaa8d46a.ngrok.io/android/books';	
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

		// Typescript Provider for linking multiple modules to the main app (check react-native docs)
		  /*
	    <Provider>
		  <Subscribe to={[BookContainer, CounterContainer, LocationsContainer]}>
		    {(bookStore, counterStore, locationsStore) => (
			  <AppContainer
			    bookStore={bookStore}
				counterStore={counterStore}
				locationsStore={locationsStore}
		*/

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
