import React, { Component } from 'react';
import {
	View
} from 'react-native';

// Custom objects and models from other TypeScript files
import { AudioBookProps } from '../interfaces/props/AudioBookProps';
import { StackNavProps } from '../interfaces/props/StackNavProps';

// Import data objects or Types for the Book and Chapter models
import { Chapter, initializeChapter } from '../interfaces/models/Chapter';
import { Book, initializeBook } from '../interfaces/models/Book';

import MusicControl from 'react-native-music-control';
import ChapterDetails from 'src/screens/AudioPlayer/ChapterDetails';
import PlayerControlContainer from 'src/containers/PlayerControlContainer';

// Combine audio book and navigation props
interface PlayerControllerProps extends AudioBookProps, StackNavProps {};

/**
 * PlayeController handles all control functionality for the full player
 * as well as the embedded player -> sends state to the PlayerControlContainer
 */
export default class PlayerController extends Component<PlayerControllerProps, any> {

    // Common functions for changing player state for the FullPlayer and the BottomPlayer
    playBook = (book) => {

		// First set the state of a playing book (will this cause race condition)
        this.props.playerControlContainer.playingBook(book);

		// Issue query for the book chapters and set the foundChapters
		// TODO: This is where the API call to the chapters endpoint will come in
		// playerStore.foundChapters();
		// playerStore.setCurrentChapter(0);
		// this.playCurrentChapter();

    }

    // Play the current chapter (received from play, next, back, etc)
	playCurrentChapter = () => {
		const { chapterList, chapterIndex } = this.props.playerControlContainer.state;

		// Implement MusicControl method calls for playing a book
		let chapter = initializeChapter();

		// check that value is an array and is not empty
		if (Array.isArray(chapterList) && chapterList.length) {
			chapter = chapterList[chapterIndex];	// get the current chapter
		}

		console.log("Play Current Chapter:");
		console.log(chapter);
		console.log("\n");

		// Initialize all MusicControl properties and execute methods for playing

		// TODO: This needs to be a single blocking call rather than separate
		// // Set the duration of the chapter using the Chapter obj
		// this.setChapterDuration(chapter.DURATION);

		// // Set the pause to true
		// this.setPaused(false);

		// Set states for the current playing chapter
		this.props.playerControlContainer.playingCurrentChapter(chapter.DURATION, false);
    }

    // Play the previous chapter in the chapters list
    playPreviousChapter = () => {
		const { chapterIndex } = this.props.playerControlContainer.state;
		const newIndex = chapterIndex - 1;
		
		// First let the user know the chapter is changing
		this.props.playerControlContainer.setChanging(true);

		// Does this implement MusicControl

		// Update the states using local methods
		this.props.playerControlContainer.setCurrentPosition(0);
		this.props.playerControlContainer.setChanging(false);
		this.props.playerControlContainer.setCurrentChapter(newIndex < 0 ? 0 : newIndex);
		this.playCurrentChapter();
    }

    // Play the next chapter in the chapters lis                                                                                                                                                                                                          fff                                                         cxt
    playNextChapter = () => {
		// Get the state from the player control container
		const { chapterList, chapterIndex } = this.props.playerControlContainer.state;

		// let the user know the chapter is changing
		this.props.playerControlContainer.setChanging(true);

		// TODO: Does this implement MusicControl??

		// Update the states using local methods
		this.props.playerControlContainer.setCurrentPosition(0);
		this.props.playerControlContainer.setChanging(false);
		this.props.playerControlContainer.setCurrentChapter((chapterIndex+1) % (chapterList.length));
		this.playCurrentChapter();
    }

    // Pause the current chapter
    pauseCurrentChapter = () => {

		// Implement MusicControl update playback for pause

		// Set the player container state to paused
		this.props.playerControlContainer.setPaused(true);
    }

    // Update the play time of current chapter
    updatePlayTime = (currentTime) => {
		// Implement the MusicControl methods for updating times

		// Set the currentTime state in the container
		this.props.playerControlContainer.setCurrentTime(currentTime);
	}
}