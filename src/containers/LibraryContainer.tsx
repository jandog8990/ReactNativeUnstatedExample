import { Container } from 'unstated'
import { Book } from '../interfaces/models/Book';

interface LibraryState {
	books: Book[],
	showBooks: boolean
}

/**
 * Library container controls all of the book and chapter
 * information needed for playing each book
 */
export default class LibraryContainer extends Container<LibraryState> {
	state: LibraryState = {
		books: [],
		showBooks: false
	}

	// Add book to the library (select purchased book in the library)
	addBook = (book: Book) => {
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
