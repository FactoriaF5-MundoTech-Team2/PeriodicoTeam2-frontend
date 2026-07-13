import { useState } from 'react';
import './SearchBar.scss';

const SearchBar = ({ onSearch, placeholder = 'Busca el artículo...' }) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <i className="bi bi-search"></i>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
      />
      {query && (
        <button type="button" className="search-clear" onClick={() => {
          setQuery('')
          onSearch('')
        }}>
          <i className="bi bi-x"></i>
        </button>
      )}
    </form>
  )
}

export default SearchBar