import React, { useState } from 'react'

interface SearchProps {
  onSearch: (query: string) => void
}

const SearchBar: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Pesquisar oportunidades..."
      style={{
        padding: '8px 12px',
        borderRadius: '8px',
        border: '1px solid #996FD6',
        width: '100%',
        maxWidth: '400px',
        marginBottom: '16px'
      }}
    />
  )
}

export default SearchBar
