import React from 'react'
import PropTypes from 'prop-types'

const Selector = (props) => {
    const { value, onUpdate } = props
    return (
        <select value={value} onChange={(event) => {onUpdate(event.target.value)}}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
        </select>
    )
}

Selector.PropTypes = {
    value: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired
}

export default Selector