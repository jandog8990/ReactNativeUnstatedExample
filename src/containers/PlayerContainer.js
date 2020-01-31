import {Container} from 'unstated'

export default class PlayerContainer extends Container {
	constructor(props) {
		super(props);

		this.state = {
			book: {},
			chapterIndex: -1,
			paused: false
		};
	}
}
