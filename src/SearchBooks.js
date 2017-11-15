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
        this.updateBooks(query)
    }

    updateBooks = _.debounce((query) => {
        if(query === ''){
            this.setState({books: []})
            return
        } 
        else {
            BooksAPI.search(query, 10)
            .then((books) => {
                if(books.error){
                    this.setState({books: []})
                } else {
                    this.setState({books})
                }
            }).catch((e) => {
                this.setState({books: []})
            })
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
                    <Book book={book}/>
                  </li>
              ))}
              </ol>
            </div>
        </div>
        )
    }
}

export default SearchBooks