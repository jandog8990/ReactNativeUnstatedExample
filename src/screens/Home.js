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
import { Platform } from 'react-native';
import { Icon } from 'react-native-elements';
//import Routes from "./Routes";
import LogoTitle from './LogoTitle';

/*
import { BookContainer } from './BookContainer'
import { CounterContainer } from './CounterContainer'
import { LocationsContainer } from './LocationsContainer'
import AppContainer from './AppContainer'
*/

import axios from 'react-native-axios';
import {
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
export default class Home extends Component {

    // Constructor props and state init
    constructor(props) {
    	super(props);
		this.state = { isLoading: true, dataSource: []};
  		this.server = 'https://c24feb7b.ngrok.io';
	}
	
	// Navigation options for the top header
	static navigationOptions = {
		headerTitle: () => <LogoTitle/>,
		headerBackTitleVisible: false,	
		headerLeft: () =>
			<Icon
				containerStyle={{paddingLeft:20, paddingTop: 5}}
				type="ionicon"
				name={Platform.OS === "ios" ? "ios-contact" : "md-contact"}
			/>,
		headerRight: () =>
			<Icon
				containerStyle={{paddingRight:20, paddingTop: 5}}
				type="ionicon"
				name={Platform.OS === "ios" ? "ios-search" : "md-searchs"}
			/>	
	};

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
  /* TODO:
   * 1. Need to query the database for all genres prior to loading
   * data into the nested FlatList views 
   * 2. Need a BestSellers section in the DB 
   */ 
  componentDidMount() {
	  //let url = 'https://facebook.github.io/react-native/movies.json';
	  let server = this.server; 
	  let route = '/android/genres/';
	  //let url1 = server + 'android/books'; 
	  let url1 = server + route + 'history';
	  let url2 = server + route + 'poetry';
	  let url3 = server + route + 'fiction';
	  let url4 = server + route + 'biography';

	  // create the url array 
	  let urlArr = [url1, url2, url3, url4];
	  console.log("Url Arr:");
	  console.log(urlArr);
	  console.log("\n");

	  this.fetchJSONAsync(urlArr);
  }

  // Render item function
  _renderItem(item) {
		//<TouchableOpacity  onPress={() => this.props.navigation.navigate('ShopList')}>
		//<TouchableOpacity  onPress={() => this.props.navigation.navigate('ChaptersModal')}>
    return (
		<TouchableOpacity  onPress={() => this.props.navigation.navigate('FullPlayer')}>
		<Image key={item.ISBN} style={{width: 120, height: 180, marginRight: 10, marginTop: 12}} source={{uri: item.PHOTO_LOC}}/> 
		</TouchableOpacity>	
	)
  }

  render() {
	  let pic = {
        uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
      }; 
	
	  let dataSource = this.state.dataSource; 
	  let genreListArr = []; 
	  console.log("Genres:"); 
	  for (var i = 0; i < dataSource.length; i++) {
	  		//console.log(dataSource);
		  	console.log(dataSource[i].genreName);
	  }
	  console.log("\n");
	  
	  // Create FlatList views from the datasource of Genres
	  genreListArr = dataSource.map(dataObj => ( 
		 <View key={dataObj.genreName} style={styles.sectionListView}> 
		 <Text style={styles.sectionTitle}>{dataObj.genreName}</Text>  
		 <FlatList
			horizontal={true}	
			showsHorizontalScrollIndicator={false}	
			contentContainerStyle={{
				alignSelf: 'flex-start'
			}}
			renderItem={({item}) => this._renderItem(item)} 
			keyExtractor={({id}, index) => id}
			data={dataObj.books}
		  />
		 </View> 
	  ));
	  console.log("Book FlatList Arr:");
	  genreListArr.map(obj => { 
		  console.log(obj);
  	  });
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
		/*	
			 
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
	 	*/ 
		/* 
		  <View style={{flex: 1}}> 
	 	  </View> 
	 	*/ 
	  return (
		  <SafeAreaView style={styles.sectionContainer}>
		  <ScrollView bounces={false} style={styles.genreScrollView}>
		  	{genreListArr}
		  </ScrollView>
	 	  </SafeAreaView> 
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
  genreScrollView: {
	height: 100,	
	top: 20,
    marginBottom: 60, 
	paddingHorizontal: 24
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    flex: 1, 
	backgroundColor: Colors.lighter
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
