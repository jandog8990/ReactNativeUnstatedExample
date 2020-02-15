import {Container} from 'unstated';
import { Book, initializeBook } from '../interfaces/models/Book';
import { Chapter } from 'src/interfaces/models/Chapter';

// Player control states for interacting with player
interface PlayerControlState {
    book: Book,
    chapterMap: Map<number, Chapter[]>,
    chapterIndex: number,
    paused: boolean,
    ended: boolean,
    currentTime: number
}

/**
 * Contains all of the actions for the player control such as play, pause, next song, previous, etc...
 * NOTE: These are the global states for both the FullPlayer and the embedded MusicControl
 */
export default class PlayerControlContainer extends Container<PlayerControlState> {
    state: PlayerControlState = {
        book: initializeBook(),
        chapterMap: new Map<number, Chapter[]>(),
        chapterIndex: -1,
        paused: true,
        ended: false,
        currentTime: 0.0
    }

    // TODO: See the FullPlayer.tsx file for actions and state 
    
    // Found chapters to the selected book (when user selects book from library)
    // This should issue a query to the database for the Chapter list using ISBN
	foundChapters = (book: Book, chapterList: Chapter[]) => {
		const chapterMap = {...this.state.chapterMap};
		chapterMap.set(book.ISBN, chapterList);
	}

    // Play book is updated from the last book. Sets:
    // 1. Sets all State values above for current chapter
    // 2. foundChapters() method in LibraryContainer
    // 3. setChapterIndex -> playCurrentChpater
    playingBook = (book: Book) => {
        // Set the state for the current Book
        this.setState({
            book: book,
            paused: false,
            currentTime: 0.0
        })
    }

    // Set the book ended boolean when we finish audio
    setBookEnded = (ended) => {
        this.setState({
            ended: ended
        });
    }

    // Set the current Chapter using index from the action (back, next, current)
    setCurrentChapter = (index) => {
        this.setState({
            chapterIndex: index
        });
    }

    // Set the current Chapter to paused or not paused
    setPaused = (paused) => {
        this.setState({
            paused: paused
        });
    }

    // Set the current play time of the current chapter
    setPlayTime = (currentTime) => {
        this.setState({
            currentTime: currentTime
        });
    }

    /**
     * All of the controller actions will be set in their own file
     * particularly a PlayerController class (for onPlay, onNext, onBack, etc...)
     */

     /*
    // Play the current chapter. Uses from FullPlayer:
    // 1. onPlay() -> onForward() -> setChapterIndex
    playCurrentChapter = () => {
        // This has a lot of intricate shit for playing a chapter
    }

    // Pause the currently playing song. Uses from FullPlayer:
    // 1. onPause() -> setPaused(true)
    pauseCurrentChapter = () => {

    }

    // Play the next chapter. Uses:
    // 1. onForward() -> chapter state.currentlyPlaying 
    //      -> playCurrentChapter(chapterIndex++)
    playNextChapter = () => {

    }

    // Play the previous chapter:
    // 1. onPrevious() -> chapter state.currentlyPlaying 
    //      -> playCurrentChapter(chapterIndex--)
    playPreviousChapter = () => {

    }

    // Update the play time for the current chpater
    // 1. setTime()/setDuration()/onSeek() -> setCurrentTime
    updatePlayTime = (currentTime: number) => {

    }
    */
}