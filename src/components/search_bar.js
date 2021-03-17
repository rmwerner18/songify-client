import React from 'react'

const SearchBar = props => {
    return (
        <input type="text" onChange={props.handleSearch} value={props.searchInput} />
    )
}

export default SearchBar