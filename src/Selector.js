import React, {Component} from 'react'

class Selector extends Component {
    state = {
        value: 'none'
    }

    componentDidMount = () => {
        this.setState({value: this.props.value})
    }

    handleChange = (event) => {
        const value = event.target.value
        this.setState({value})
        this.props.onUpdate(value)
    }

    render(){
        return(
            <select value={this.state.value} onChange={this.handleChange}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        )
    }
}

export default Selector