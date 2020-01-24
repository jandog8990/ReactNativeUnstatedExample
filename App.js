/**
 * React Native Navigation Example 
 */
import React from 'react';
import { createAppContainer, } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'; 
import Home from './src/screens/Home';
import ShopList from './src/screens/ShopList';

const AppNavigator = createStackNavigator({
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

// More control over root component (export component that renders AppNavigator)
//export default createAppContainer(AppNavigator);
const Tabs = createBottomTabNavigator({ AppNavigator });
const AppContainer = createAppContainer(Tabs);

export default class App extends React.Component {
	render() {
		return <AppContainer/>;
	}
}
