import './App.css';

import { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView';
import ArtistView from './components/ArtistView';

function App() {
  let [searchTerm, setSearchTerm] = useState('')
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState([])

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
    if (searchTerm) {
      const fetchData = async () => {
        document.title = `${searchTerm} Music`
        const response = await fetch(API_URL + searchTerm)
        const resData = await response.json()
        if (resData.results.length > 0) {
          setData(resData.results)
        } else {
          setMessage('Not Found')
        }
      }
      fetchData()
    }
  }, [searchTerm, API_URL])


  const handleSearch = (e, term) => {
    e.preventDefault()
    term = toTitleCase(term)
    setSearchTerm(term)
  }

  return (
    <div>
      {message}
      <Router>
        <Routes>
          <Route path="/" element={
            <Fragment>
              <SearchBar handleSearch={handleSearch} />
              <Gallery data={data} />
            </Fragment>
          } />
          <Route path="/album/:id" element={<AlbumView />} />
          <Route path="/artist/:id" element={<ArtistView />} />
        </Routes>
      </Router>
    </div>
  )

}

export default App
