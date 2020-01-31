/**
 * React Native Navigation Example 
 */
import React from 'react';
import { createAppContainer, } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'; 
import Home from './src/screens/Home';
//import ShopList from './src/screens/ShopList';
import ChapterListModal from './src/screens/AudioPlayer/ChapterListModal';
import FullPlayer from './src/screens/AudioPlayer/FullPlayer';

// import the Unstated module for state management and component connection
import { Subscribe, Provider } from 'unstated';
import PlayerContainer from './src/containers/PlayerContainer';
import ChapterContainer from './src/containers/ChapterContainer';
import LibraryContainer from './src/containers/LibraryContainer';

// Create an interface for the stack navigation props
interface StackNavProps {
	playerStore: PlayerContainer,
	chapterStore: ChapterContainer,
	libraryStore: LibraryContainer
}

// Class for the StackNavigation that takes props through an interface
class StackNav extends React.Component<StackNavProps, any> {

	// Main stack for controlling the entire navigation stack for the app
	// Each screen in the stack will get its own Store depending on what it subscribes to	
	MainStack = createStackNavigator({
		Home: {
			screen: props => 
				<Home
					{...props} 
					playerStore={this.props.playerStore} 
				/>
		},
		FullPlayer: {
			screen: props => 
				<FullPlayer
					{...props} 
					playerStore={this.props.playerStore}
					chapterStore={this.props.chapterStore}
					libraryStore={this.props.libraryStore} 
				/>
		}, 
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
	RootStack = createStackNavigator(
		{
			Main: {
				screen: MainStack,
			},
			ChaptersModal: {
				screen: ChapterListModal, 
			}
		},
		{
			headerMode: 'none',
			mode: 'modal',
		}
	);
	
	// Render the root stack navigator with the containers as props
	render() {
		return <this.RootStack /> 
	}
}	// End of StackNav

// More control over root component (export component that renders MainStack)
// How is this done using unstated??
//export default createAppContainer(MainStack);
//const Tabs = createBottomTabNavigator({ RootStack });
// const AppContainer = createAppContainer(RootStack);

//export default class App extends React.Component {
export default App = () => ( 
	/**
	 * Subscribe passes state from Container to Component
	 * 1: When state changes the components re-render
	 * 2: Container methods are called here => available in the AppContainer
	 * 3: How do we access state outside of the main AppContainer?
	 * 4: If I change state in another Component does it get propagated from the
	 * 		local Container to the global Container here in AppContainer
	 */

	//return <AppContainer/>;
	//render() {
	//return (	
	<Provider>
		<Subscribe to={[PlayerContainer, ChapterContainer, LibraryContainer]}>
			{(playerStore, chapterStore, libraryStore) => (
				<StackNav
					playerStore={playerStore}
					chapterStore={chapterStore}
					libraryStore={libraryStore}
				/>	
			)}
		</Subscribe>
	</Provider>
	//	);	
	//}
)	
