import {Container} from 'unstated';
import { Book, initializeBook } from '../interfaces/models/Book';

// Player control states for interacting with player
interface PlayerControlState {
    book: Book,
    chapterIndex: number,
    paused: boolean
}

/**
 * Contains all of the actions for the player control
 * such as play, pause, next song, previous, etc...
 */
export default class PlayerControlContainer extends Container<PlayerControlState> {
    state: PlayerControlState = {
        book: initializeBook(),
        chapterIndex: -1,
        paused: false
    }
}