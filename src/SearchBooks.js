import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import _ from 'lodash'
import * as BooksAPI from './BooksAPI'
import Book from './Book'


class SearchBooks extends Component {
    state = {
        query: '',
        books: []
    }

    updateQuery = (query) => {
        query = query.trim()
        this.setState({query})
        this.queryBooks(query)
    }

    queryBooks = _.debounce((query) => {
        if(query) {
            BooksAPI.search(query, 10)
            .then((res) => {
                if(res.error){
                    this.setState({books: []})
                }
                else {
                    const books = res.map((book) => {
                        const shelfBook = this.props.shelfBooks.find((b) => (b.id === book.id))
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

    render(){
        return (
            <div className="search-books">
                <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    <input 
                    type="text" 
                    placeholder="Search by title or author"
                    value={this.state.query}
                    onChange={(e) => {this.updateQuery(e.target.value)}}/>
                </div>
                </div>
                <div className="search-books-results">
                <ol className="books-grid">
                {this.state.books.map((book) => (
                    <li key={book.id}>
                        <Book book={book} onUpdate={this.props.onUpdate}/>
                    </li>
                ))}
                </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks