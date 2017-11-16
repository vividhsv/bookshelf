import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBookShelf from './components/ListBookShelf'
import SearchBooks from './components/SearchBooks'
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

    // Handler to update the state if book already exsits or add the book to the state
    handleUpdateBookshelf = (book, value) => {
        BooksAPI.update(book, value).then(() => {
            this.setState((state) => {
                const existingBook = state.books.find((b) => (b.id === book.id))
                if(existingBook){
                    existingBook.shelf = value
                }
                else {
                    book.shelf = value
                    state.books.push(book)
                }
                return {books: state.books }
            })
        })
    }

    render() {
        const {books} = this.state
        return (
            <div className="app">
                <Route path="/search" render={() => (
                    <SearchBooks shelfBooks={books} onUpdate={this.handleUpdateBookshelf}/>
                )}/>
                <Route exact path="/" render={() => (
                    <ListBookShelf books={books} onUpdate={this.handleUpdateBookshelf}/>
                )}/>
            </div>
        )
    }
}

export default BooksApp
