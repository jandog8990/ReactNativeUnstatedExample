import React, { Component } from 'react';

// Custom objects and models from other TypeScript files
import { AudioBookProps } from '../interfaces/props/AudioBookProps';
import { StackNavProps } from '../interfaces/props/StackNavProps';

// Import data objects or Types for the Book and Chapter models
import { Chapter, initializeChapter } from '../interfaces/models/Chapter';
import { Book, initializeBook } from '../interfaces/models/Book';

import MusicControl from 'react-native-music-control';
import ChapterDetails from 'src/screens/AudioPlayer/ChapterDetails';

// Combine audio book and navigation props
interface PlayerControllerProps extends AudioBookProps, StackNavProps {};

// Initialize the player control states, note that this is a combination
// of the MusicControl states as well as the FullPlayer states
interface PlayerControllerState {
	isLoading: boolean,
	isChanging: boolean,
	audioBook: Book,
	chapterList: Chapter[], 
	rate: number, 
	currentPosition: number,
	volume: number,
	chapterDuration: number,
	controls: boolean
  }

export default class PlayerController extends Component<PlayerControllerProps, PlayerControllerState> {

	// Set the state for this component
	state = {
		isLoading: true,
		isChanging: false,
		audioBook: initializeBook(),
		chapterList: [], 
		rate: 1, 
		currentPosition: 0,
		volume: 1,
		chapterDuration: 0.0,
		controls: false
	}

    // Common functions for changing player state for the FullPlayer and the BottomPlayer
    playBook = (book) => {
		const playerControlContainer = this.props.playerControlContainer;
        playerControlContainer.playingBook(book);

		// Issue query for the book chapters and set the foundChapters
		// TODO: This is where the API call to the chapters endpoint will come in
		// playerControlContainer.foundChapters();
		// playerControlContainer.setCurrentChapter(0);
		// this.playCurrentChapter();

    }

    // Play the current chapter (received from play, next, back, etc)
    playCurrentChapter = () => {
		const { book, chapterMap, chapterIndex } = this.props.playerControlContainer.state;
		const ISBN = book.ISBN;

		// Implement MusicControl method calls for playing a book
		let chapter = initializeChapter();

		// Check that we have a book loaded and the song index is real
		if (book != null && chapterIndex >= 0) {
			// first check that the chapter map exists and is not null
			if (chapterMap.get(ISBN)) {
				const chapters = chapterMap.get(book.ISBN);
				// check that value is an array and is not empty
				if (Array.isArray(chapters) && chapters.length) {
					chapter = chapters[chapterIndex];	// get the current chapter
				}
			}
		}

		// Initialize all MusicControl properties and execute methods for playing

		// Set the duration of the chapter using the Chapter obj
		this.setChapterDuration(chapter.DURATION);

		// Set the pause to true
		this.setPaused(false);
    }

    // Play the next chapter in the chapters lis                                                                                                                                                                                                          fff                                                         cxt
    playNextChapter = () => {
		// Get the state from the player control container
		const { book, chapterMap, chapterIndex } = this.props.playerControlContainer.state;
		const chapters = chapterMap[book.ISBN];

		// First let the user know the chapter is changing
		this.setChanging(true);

		// Does this implement MusicControl

		// Update the states using local methods
		this.setChanging(false);
		this.setCurrentPosition(0);
		this.setCurrentChapter((chapterIndex+1) % (chapters.length));
		this.playCurrentChapter();
    }

    // Play the previous chapter in the chapters list
    playPreviousChapter = () => {
		const chapterIndex = this.props.playerControlContainer.state.chapterIndex;
		const newIndex = chapterIndex - 1;

		// First let the user know the chapter is changing
		this.setChanging(true);

		// Does this implement MusicControl

		// Update the states using local methods
		this.setChanging(false);
		this.setCurrentPosition(0);
		this.setCurrentChapter(newIndex < 0 ? 0 : newIndex);
		this.playCurrentChapter();
    }

    // Pause the current chapter
    pauseCurrentChapter = () => {

		// Implement MusicControl update playback for pause

		// Set the player container state to paused
		this.setPaused(true);
    }

    // Update the play time of current chapter
    updatePlayTime = (currentTime) => {
		// Implement the MusicControl methods for updating times

		// Set the currentTime state in the container
		this.setPlayTime(currentTime);
	}

	/**
	 * Set the states for all of the player control container elems
	 */

	// Set the current chapter by setting state in the control container
	setCurrentChapter = (index) => {
		this.props.playerControlContainer.setCurrentChapter(index);
	}

	// Set the current book to ended (this may want to restart or go to the next book)
	setBookEnded = (ended) => {
		this.props.playerControlContainer.setBookEnded(ended);
	}

	// Set the paused state in the container
	setPaused = (paused) => {
		this.props.playerControlContainer.setPaused(paused);
	}

	// Set the playtime for the current chapter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
	setPlayTime = (currentTime) => {
		this.props.playerControlContainer.setPlayTime(currentTime);
	}

	// Set the isChanging state for the current controller
	setChanging = (changing) => {
		this.setState({ isChanging: changing });
	}

	// Set the chapter duration for the current chapter
	setChapterDuration = (duration) => {
		this.setState({ chapterDuration: duration });
	}

	// Set the current position of the chapter (used in FullPlayer)
	setCurrentPosition = (currentTime) => {
		this.setState({currentPosition: currentTime});
	}
}