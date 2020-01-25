/**
 * React Native Navigation Example 
 */
import React from 'react';
import { createAppContainer, } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'; 
import Home from './src/screens/Home';
import ShopList from './src/screens/ShopList';
import ChapterListModal from './src/screens/ChapterListModal';

const MainStack = createStackNavigator({
	Home: Home,
	ShopList: ShopList
}, {
	initialRouteParams: Home,
	// Header config from home screen
	defaultNavigationOptions: {
		headerStyle: {
			//backgroundColor: '#000',
			backgroundColor: 'white',
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			color: 'black',	
			fontWeight: 'bold',
		},
	},
	navigationOptions: {
		tabBarLabel: 'Home'
	},
});

// Root stack for the audio player to the chapter list modal
// We can hae multiple root stacks for each page with modals
// TODO Convert this call to use the book player rather than home page
const RootStack = createStackNavigator(
	{
		Main: {
			screen: MainStack,
		},
		MyModal: {
			screen: ChapterListModal, 
		}
	},
	{
		mode: 'modal',
    	headerMode: 'none',
	}
);

// More control over root component (export component that renders MainStack)
//export default createAppContainer(MainStack);
const Tabs = createBottomTabNavigator({ RootStack });
const AppContainer = createAppContainer(Tabs);

export default class App extends React.Component {
	render() {
		return <AppContainer/>;
	}
}
