import {Container} from 'unstated';
import { Book, initializeBook } from '../interfaces/models/Book';
import { Chapter } from 'src/interfaces/models/Chapter';

// Player control states for interacting with player
    // book: Book,
	// isChanging: boolean,
interface PlayerControlState {
	audioBook: Book,
	chapterList: Chapter[], 
	rate: number, 
    paused: boolean,
    ended: boolean,
    totalLength: number, 
    currentTime: number,
	currentPosition: number,
	chapterDuration: number,
    chapterIndex: number,
    isLoading: boolean,
}

/**
 * Contains all of the actions for the player control such as play, pause, next song, previous, etc...
 * NOTE: These are the global states for both the FullPlayer and the embedded MusicControl
 */
export default class PlayerControlContainer extends Container<PlayerControlState> {
    state: PlayerControlState = {
        book: initializeBook(),
        chapterMap: new Map<number, Chapter[]>(),
        chapterIndex: 0,
        paused: true,
        ended: false,
        currentTime: 0.0,
        isLoading: true,
		isChanging: false,
		audioBook: initializeBook(),
		chapterList: [], 
		rate: 1, 
		currentPosition: 0,
		chapterDuration: 0.0
    }

    // TODO: See the FullPlayer.tsx file for actions and state 
    
    // Found chapters to the selected book (when user selects book from library)
    // This should issue a query to the database for the Chapter list using ISBN
	foundChapters = (newLoading: boolean, newBook: Book, newChapterList: Chapter[]) => {
		// const chapterMap = {...this.state.chapterMap};
        // chapterMap.set(audioBook.ISBN, chapterList);
        // this.state.chapterMap[audioBook.ISBN] = chapterList;
        // let chapterMap = new Map<number, Chapter[]>();
        const newChapterMap = new Map<number, Chapter[]>(this.state.chapterMap);
        // chapterMap.set(audioBook.ISBN, chapterList);
        newChapterMap[newBook.ISBN] = newChapterList;

        // let oldBook = {...}

        console.log("Chapter Map:");
        console.log(newChapterMap);
        console.log("\n");
        
        // audioBook: audioBook
        // const audioBook
        //const dbBook = {...this.state.audioBook, ...newBook};

        /*
        this.setState(prevState => ({
            audioBook: {
                ...prevState.audioBook,
                ISBN: newBook.ISBN
            }
        }));
        */
    //    delete this.state.audioBook;
    console.log("PlayerControlContainer: setState()!");
    this.setState({
           isLoading: newLoading, 
           audioBook: newBook, 
           chapterList: newChapterList,
           chapterMap: newChapterMap
       });
       /*
       () => {
           console.log("Updated State:");
           console.log(this.state);
           console.log("\n");
           return {...this.state };
       });
       */
	}

    // Play book is updated from the last book. Sets:
    // 1. Sets all State values above for current chapter
    // 2. foundChapters() method in LibraryContainer
    // 3. setChapterIndex -> playCurrentChpater
    playingBook = (book: Book) => {
        // Set the state for the current Book 
        // setting paused to true => play chapter will set to true
        this.setState({
            book: book,
            paused: true,
            currentTime: 0.0
        })
    }

    // Playing current chapter sets the states for the current play
    playingCurrentChapter = (duration: number, paused: boolean) => {
        this.setState({
            chapterDuration: duration,
            paused: paused
        })
    }

    // Playing the queued chapter (previous/next actions)
    playingQueuedChapter = (isChanging: boolean, position: number) => {
        this.setState({
            isChanging: isChanging,
            currentPosition: position
        })
    }

    // Set the book ended boolean when we finish audio
    setBookEnded = (ended) => {
        this.setState({ ended: ended });
    }

    // Set the current Chapter using index from the action (back, next, current)
    setCurrentChapter = (index) => {
        this.setState({ chapterIndex: index });
    }

    // Set the current Chapter to paused or not paused
    setPaused = (paused) => {
        this.setState({ paused: paused });
    }

    // Set the current play time of the current chapter
    setCurrentTime = (currentTime) => {
        this.setState({ currentTime: currentTime });
    }

    // Set the isLoading state
	setLoading = (loading) => {
		this.setState({ isLoading: loading });
	}

	// Set the isChanging state for the current controller
	setChanging = (changing) => {
		this.setState({ isChanging: changing });
    }
    
	// Set audio book object
	setAudioBook = (audioBook) => {
		this.setState({ audioBook: audioBook });
		console.log("Set AudioBook:");
		console.log(this.state.audioBook);
		console.log("\n");
    }
    
    // Set chapter list of Chapter objs
	setChapterList = (chapterList) => {
		this.setState({ chapterList: chapterList });
		console.log("Set ChapterList:");
		console.log(this.state.chapterList);
		console.log("\n");
    }
    
    // Set the rate of the full player component
	setRate = (rate) => {
		this.setState({ rate: rate });
	}

	// Set the current position of the chapter (used in FullPlayer)
	setCurrentPosition = (currentTime) => {
		this.setState({currentPosition: currentTime});
	}

	// Set the chapter duration for the current chapter
	setChapterDuration = (duration) => {
		this.setState({ chapterDuration: duration });
	}
}