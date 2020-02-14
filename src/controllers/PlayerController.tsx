import React, { Component } from 'react';

// Custom objects and models from other TypeScript files
import { AudioBookProps } from '../interfaces/props/AudioBookProps';
import { StackNavProps } from '../interfaces/props/StackNavProps';

// Import data objects or Types for the Book and Chapter models
import { Chapter } from '../interfaces/models/Chapter';
import { Book, initializeBook } from '../interfaces/models/Book';

// Combine audio book and navigation props
interface PlayerControllerProps extends AudioBookProps, StackNavProps {};

// Initialize the Full player State
interface PlayerControllerState {
	isLoading: boolean,
	isChanging: boolean,
	audioBook: Book,
	chapterList: Chapter[], 
	rate: number, 
	paused: boolean,
	ended: boolean,
	totalLength: number,
	currentPosition: number,
	selectedChapter: number,
	volume: number,
	duration: number,
	currentTime: number,
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
		paused: true,
		ended: false,
		totalLength: 1,
		currentPosition: 0,
		selectedChapter: 0,
		volume: 1,
		duration: 0.0,
		currentTime: 0.0,
		controls: false
    }

    // Common functions for changing player state for the FullPlayer and the BottomPlayer
    playBook = (book) => {
        this.props.playerControlContainer.playingBook(book);

        // Issue query for the book chapters and set the foundChapters
    }

    // Play the current chapter (received from play, next, back, etc)
    playCurrentChapter = () => {

    }

    // Play the next chapter in the chapters lis                                                                                                                                                                                                          fff                                                         cxt
    playNextChapter = () => {

    }

    // Play the previous chapter in the chapters list
    playPreviousChapter = () => {

    }

    // Pause the current chapter
    pauseCurrentChapter = () => {

    }

    // Update the play time of current chapter
    updatePlayTime = (currentTime) => {
    }
}