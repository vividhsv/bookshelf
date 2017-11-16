import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'

const ListBookShelf = (props) => {
    const {books, onUpdate} = props
    return(
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <Bookshelf title="Currently Reading" books={books.filter(book => ( book.shelf === "currentlyReading"))} onUpdate={onUpdate}/>
                    <Bookshelf title="Want to Read" books={books.filter(book => ( book.shelf === "wantToRead"))} onUpdate={onUpdate}/>
                    <Bookshelf title="Read" books={books.filter(book => ( book.shelf === "read"))} onUpdate={onUpdate}/>
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    )
}

ListBookShelf.PropTypes = {
    books: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired
}
export default ListBookShelf
