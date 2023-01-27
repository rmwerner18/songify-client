import React, { useState, useRef, useEffect } from 'react';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchBar = (props) => {
  let [active, setActive] = useState(false);
  const searchInput = useRef(null);

  useEffect(() => {
    searchInput.current.focus();
  }, [active]);

  return (
    <div className={active ? 'search active' : 'search'}>
      <input
        className='search-bar'
        type='search'
        ref={searchInput}
        onChange={props.handleSearch}
        value={props.searchInput}
      />
      <FontAwesomeIcon
        className='search-icon'
        icon={solid('magnifying-glass')}
        onClick={() => setActive(!active)}
      />
    </div>
  );
};

export default SearchBar;
