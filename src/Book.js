import React, {Component} from 'react'
import Selector from './Selector'

class Book extends Component {
    state = {
        shelf: 'none'
    }

    componentDidMount = () => {
        this.setState({shelf: this.props.book.shelf})
    }

    handleUpdate = (value) => {
        this.setState({shelf: value})
        this.props.onUpdate(this.props.book, value)
    }

    render(){
        const { book } = this.props
        return(
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                    <Selector value={this.state.shelf} onUpdate={this.handleUpdate}/>
                </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
        )
    }
}

export default Book