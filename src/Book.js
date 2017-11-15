import React, {Component} from 'react'
import Selector from './Selector'

class Book extends Component {
    render(){
        const { book } = this.props
        return(
            <div className="book">
            <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
                <Selector value={book.shelf} onUpdate={()=>{}}/>
            </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
        </div>
        )
    }
}

export default Book