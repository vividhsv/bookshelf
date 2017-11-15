import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import _ from 'lodash'
import './App.css'


class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  handleAddBookshelf = (book, value) => {
    BooksAPI.update(book, value).then(() => {
      this.setState((state) => {
        const existingBook = state.books.find((b) => (b.id === book.id))
        if(existingBook){
          existingBook.shelf = value
        }
        return {books: state.books }
      })
    })
  }

  handleUpdateBookshelf = (book, value) => {
    BooksAPI.update(book, value).then(() => {
      this.setState((state) => {
        book.shelf = value
        state.books.push(book)
        return {books: state.books }
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks shelfBooks={this.state.books} onUpdate={this.handleUpdateBookshelf}/>
        )}/>
        <Route exact path="/" render={() => (
          <ListBooks books={this.state.books} onUpdate={this.handleAddBookshelf}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
