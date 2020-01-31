import {Container} from 'unstated'

/**
 * Chapter container contains the list of chapters for current book
 */
export default class ChapterContainer extends Container {
	constructor(props) {
		super(props);

		this.state = {
			chapters: []
		};
	}
}
