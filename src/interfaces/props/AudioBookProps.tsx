import LibraryContainer from '../../containers/LibraryContainer';
import PlayerControlContainer from '../../containers/LibraryContainer';

/**
 * Audiobook props for the library and player for audio playback
 */
export interface AudioBookProps {
	libraryContainer: LibraryContainer
	playerControlContainer: PlayerControlContainer,
}