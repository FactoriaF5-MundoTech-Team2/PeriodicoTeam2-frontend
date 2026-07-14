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
        aria-label={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
      />
      {query && (
        <button type="button" className="search-clear" aria-label="Limpiar búsqueda" onClick={() => {
          setQuery('')
          onSearch('')
        }}>
          <i className="bi bi-x" aria-hidden="true"></i>
        </button>
      )}
    </form>
  )
}

export default SearchBar