import React from 'react'
import PropTypes from 'prop-types'
import Selector from './Selector'


const Book = (props) => {
    const { book, onUpdate } = props
    return(
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                    <Selector value={book.shelf || 'none'} onUpdate={(value) => onUpdate(book, value)}/>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
        </div>
    )
}

Book.PropTypes = {
    book: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired
}

export default Book
