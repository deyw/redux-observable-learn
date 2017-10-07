import React from 'react';

const Search = ({ defaultValue, onChange, errorMessage, loading, cancel }) => [
  <input
    style={{ marginBottom: '20px' }}
    type="search"
    defaultValue={defaultValue}
    placeholder="Search some beer..."
    key="SearchInput"
    onChange={ev => onChange(ev.target.value)}
  />,
  <div key="cancelButtonArea">
    {loading && (
      <button key="cancelButton" type="button" onClick={cancel}>
        Cancel
      </button>
    )}
  </div>,
  <small
    style={{ color: 'red', display: 'block', marginTop: '10px' }}
    key="errorMessage"
  >
    {errorMessage}
  </small>
];

export default Search;
