/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
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

//const App: () => React$Node = () => {
export default class UnstatedApp extends Component {
  
  // Constructor props and state init
  constructor(props) {
    super(props);
	this.state = { isLoading: true }
  }

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

  // Component did mount -> fetch network
  componentDidMount() {
    let url = 'https://facebook.github.io/react-native/movies.json';
	this.fetchJSONAsync(url);
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

	  return (
		<View style={{alignItems: 'center', top: 50}}>
		<View style={styles.sectionContainer}>
		  <FlatList
			data={this.state.dataSource}
			renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
			keyExtractor={({id}, index) => id}
		  />
		</View>
		</View>
	  );
  }
}

	
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

/*
		  <SafeAreaView>
			<ScrollView
			  contentInsetAdjustmentBehavior="automatic"
			  style={styles.scrollView}>
			  <Header />
			  {global.HermesInternal == null ? null : (
				<View style={styles.engine}>
				  <Text style={styles.footer}>Engine: Hermes</Text>
				</View>
			  )}
			  <View style={{alignItems: 'center', top: 50}}>
				<View style={styles.sectionContainer}>
				  <Text style={styles.sectionTitle}>Step One</Text>
				  <Text style={styles.sectionDescription}>
					Edit <Text style={styles.highlight}>App.js</Text> to change this
					screen and then come back to see your edits.
				  </Text>
				</View>
				<View style={styles.sectionContainer}>
				  <Text style={styles.sectionTitle}>See Your Changes</Text>
				  <Text style={styles.sectionDescription}>
					<ReloadInstructions />
				  </Text>
				</View>
				<View style={styles.sectionContainer}>
				  <Text style={styles.sectionTitle}>Debug</Text>
				  <Text style={styles.sectionDescription}>
					<DebugInstructions />
				  </Text>
				</View>
				<View style={styles.sectionContainer}>
				  <Text style={styles.sectionTitle}>Learn More</Text>
				  <Text style={styles.sectionDescription}>
					Read the docs to discover what to do next:
				  </Text>
				</View>
				<LearnMoreLinks />
			  </View>
			</ScrollView>
		  </SafeAreaView>
*/

/*
class Blink extends Component {

  componentDidMount(){
    // Toggle the state every second
    setInterval(() => (
      this.setState(previousState => (
        { isShowingText: !previousState.isShowingText }
      ))
    ), 1000);
  }

  //state object
  state = { isShowingText: true };

  render() {
    if (!this.state.isShowingText) {
      return null;
    }

    return (
      <Text>{this.props.text}</Text>
    );
  }
}
*/

/*
class Greeting extends Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Text>Hello {this.props.name}!</Text>
      </View> 
    );
  }
}
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

//export default App;
/*
<View style={{alignItems: 'center', top: 50}}>
  <Greeting name='Rexxar' />
  <Greeting name='Jaina' />
  <Greeting name='Valeera' />
</View>
*/	
/*	
<View>
  <Blink text='I love to blink' />
  <Blink text='Yes blinking is so great' />
  <Blink text='Why did they ever take this out of HTML' />
  <Blink text='Look at me look at me look at me' />
</View>	
*/	
