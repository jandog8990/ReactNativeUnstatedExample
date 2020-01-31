import {Container} from 'unstated'

/**
 * Library container containing all purchased books for the current
 * user, this will be used when browsing
 */
export default class LibraryContainer extends Container {
	constructor(props) {
		super(props);
		this.state = {
			books: [],
			showBooks: true
		};
	}

	// Add book to the library (select purchased book in the library)
	addBook = book => {
		const books = [...this.state.books]
		books.push(book)
		this.setState({ books });
	}

	// Show all books in the list (select the Library icon)
	toggleVisibility = () => {
		this.setState({
			showBooks: !this.state.showBooks
		})
	}
}
