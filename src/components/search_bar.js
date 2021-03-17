import React from 'react'

const SearchBar = props => {
    return (
        <input className='search-bar' type="text" onChange={props.handleSearch} value={props.searchInput} />
    )
}

export default SearchBar