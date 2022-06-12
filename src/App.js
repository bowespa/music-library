import './App.css';

import { useEffect, useState, Suspense } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { createResource as fetchData } from './helper'
import Spinner from './components/Spinner';


function App() {
  let [searchTerm, setSearchTerm] = useState('')
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState(null)

  const API_URL = 'https://itunes.apple.com/search?term='

  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  useEffect(() => {
    document.title = `${searchTerm} Music`
    if (searchTerm) {
      setData(fetchData(searchTerm))
      console.log(searchTerm)
    }
  }, [searchTerm])


  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearchTerm(term)
  }

  const renderGallery = () => {
    if (data) {
      return (
        <Suspense fallback={<Spinner />}>
          <Gallery data={data} />
        </Suspense>
      )
    }
  }


  return (
    <div className='App'>
      <SearchBar handleSearch={handleSearch} />
      {message}
      {renderGallery()}
    </div>
  )

}

export default App
