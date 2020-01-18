/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * TODO: Import react native navigation and apply the unstated-demo code
 * to this test example for the Abantu database examples
 * 
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Subscribe, Provider } from 'unstated';
//import Routes from "./Routes";

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
  TouchableOpacity,
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

/*
const App = () => <Routes/>
export default App;
*/

//const App: () => React$Node = () => {
export default class UnstatedApp extends Component {
  
  // Constructor props and state init
  constructor(props) {
    super(props);
	this.state = { isLoading: true, dataSource: []}
  }

  fetchJSONAsync = async(urlArr) => {
	  //let requests = new Array(); 
	  let requests = []; 
	  for(var i = 0; i < urlArr.length; i++) {
		  console.log(urlArr[i]);
		  const request = axios.get(urlArr[i]);
		  console.log(request); 
		  requests.push(request);
	  }
	  
	  console.log("Requests:");
	  console.log(requests);
	  console.log("\n");

	  axios.all(requests).then(axios.spread((...responses) => {
		  console.log("Responses:");
		  let genreData = new Array(); 
		  for (var i = 0; i < responses.length; i++) {
			  console.log(responses[i].data);
		  	  console.log("\n");
		 	  genreData.push(responses[i].data); 
		  }
	 	  console.log("Genre Data:");
		  console.log(genreData);
		  console.log("\n");

		  this.setState({
			  isLoading: false,
			  dataSource: genreData 
		  });
	  })).catch(errors => {
			console.log("Errors:"); 
		  console.log(errors);
	  });

	 	/* 
	  try {
			console.log(urlArr[0]);	
		  const resp = await axios.get(urlArr[0]);
		console.log("Axios Resp Object:");
		console.log(resp.data);
		console.log("\n");

		  this.setState({
		isLoading: false,
		dataSource: resp.data.gridBooks
		});
	  } catch(err) {
	  	console.log(err);
	  }
	 	*/ 
  } 
  
  // Component did mount -> fetch network
  // NOTE: Using the /routes/android-profile.js router for /genres/:genreID
  // where the DB query is done using the SEARCH_ID
  componentDidMount() {
	  //let url = 'https://facebook.github.io/react-native/movies.json';
	  let server = 'http://40b3a28b.ngrok.io';
	  let route = '/android/genres/';
	  //let url1 = server + 'android/books'; 
	  let url1 = server + route + 'history';
	  let url2 = server + route + 'poetry';
	  let url3 = server + route + 'fiction';

	  // create the url array 
	  let urlArr = [url1, url2, url3];
	  console.log("Url Arr:");
	  console.log(urlArr);
	  console.log("\n");

	  this.fetchJSONAsync(urlArr);
  }

  // Render item function
  _renderItem(item) {
    return (
		<TouchableOpacity  onPress={() => console.log('image clicked')}>
		<Image style={{width: 120, height: 180, marginRight: 10, marginTop: 12}} source={{uri: item.PHOTO_LOC}}/> 
		</TouchableOpacity>	
	)
  }

  render() {
	  let pic = {
        uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
      }; 
	
	  // Create FlatList views from the datasource of Genres
	  let dataSource = this.state.dataSource; 
	  let flatListArr = []; 
	  console.log("Genres:"); 
	  for (var i = 0; i < dataSource.length; i++) {
	  		//console.log(dataSource);
		  	console.log(dataSource[i].genreName);
	  }
	  console.log("\n");
	  
	  if (this.state.isLoading) {
	    return(
		  <View style={{flex: 1, paddingTop: 40}}>
            <ActivityIndicator/>
          </View> 
		)
	  }

		// Typescript Provider for linking multiple modules to the main app (check react-native docs)

	  //renderItem={({item}) => <Text>{item.TITLE}, {item.AUTHOR}</Text>}
	  //horizontal	
	  //SeparatorComponent={() => <View style={{marginRight: 5}} />}	
				/*	
	  			flexDirection: 'column',
				flexWrap: 'wrap'
	 			*/ 
		/*	
		<View style={{alignItems: 'center', top: 50}}>
		<View style={styles.sectionContainer}>
		</View>
		</View>
	 	*/ 
	  return (
		  <ScrollView style={styles.sectionContainer}>	
			 <View style={styles.sectionListView}> 
		  	 <Text style={styles.sectionTitle}>{this.state.dataSource[0].genreName}</Text>  
	  		 <FlatList
				horizontal={true}	
				showsHorizontalScrollIndicator={false}	
		  		contentContainerStyle={{
					alignSelf: 'flex-start'
				}}
				renderItem={({item}) => this._renderItem(item)} 
				keyExtractor={({id}, index) => id}
				data={this.state.dataSource[0].books}
			  />
			 </View> 
			 
		     <View style={styles.sectionListView}> 
		  	 <Text style={styles.sectionTitle}>{this.state.dataSource[1].genreName}</Text>  
			 <FlatList
				horizontal={true}	
				showsHorizontalScrollIndicator={false}	
		  		contentContainerStyle={{
					alignSelf: 'flex-start'
				}}
				renderItem={({item}) => this._renderItem(item)} 
				keyExtractor={({id}, index) => id}
				data={this.state.dataSource[1].books}
			  />
			 </View> 
		  </ScrollView>
	  );
	}
}
		
		/*
	    <Provider>
		  <Subscribe to={[BookContainer, CounterContainer, LocationsContainer]}>
		    {(bookStore, counterStore, locationsStore) => (
			  <AppContainer
			    bookStore={bookStore}
				counterStore={counterStore}
				locationsStore={locationsStore}
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
    top: 100,
    paddingHorizontal: 24,
  },
  sectionListView: {
	  marginBottom: 20
  },
  sectionTitle: {
    fontSize: 16,
    //fontWeight: '600',
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
