import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const Bookshelf = (props) => {
    const { title, books, onUpdate } = props
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => (
                        <li key={book.id}>
                            <Book book={book} onUpdate={onUpdate}/>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

Bookshelf.PropTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired,
}

export default Bookshelf
