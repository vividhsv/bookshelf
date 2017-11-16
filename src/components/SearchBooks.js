import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'

class SearchBooks extends Component {
    state = {
        query: '',
        books: []
    }

    // read query input and update the query state
    updateQuery = (query) => {
        query = query.trim()
        this.setState({query})
        this.queryBooks(query)
    }

    // Make the API call with debounce and get the list of books for the provided query string
    queryBooks = _.debounce((query) => {
        const {shelfBooks} = this.props

        if(query) {
            BooksAPI.search(query, 10)
                .then((res) => {
                    if(res.error){
                        this.setState({books: []})
                    }
                    else {
                        const books = res.map((book) => {
                            const shelfBook = shelfBooks.find((b) => (b.id === book.id))
                            book.shelf = shelfBook ? shelfBook.shelf : 'none'
                            return book
                        })
                        this.setState({books})
                    }
                }).catch((e) => {
                this.setState({books: []})
            })
        }
        else {
            this.setState({books: []})
            return
        }
    }, 100)

    // Handler to update the state if book already exsits or add the book to the state
    handleUpdate = (book, value) => {
        const {onUpdate} = this.props

        onUpdate(book,value)
        this.setState((state) => {
            const existingBook = state.books.find((b) => (b.id === book.id))
            existingBook.shelf = value
            return {books: state.books}
        })

    }

    render(){
        const {books, query} = this.state

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(e) => {this.updateQuery(e.target.value)}}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.id}>
                                <Book book={book} onUpdate={this.handleUpdate}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

SearchBooks.PropTypes = {
    shelfBooks: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired
}

export default SearchBooks
