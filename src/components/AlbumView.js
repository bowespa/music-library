import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const AlbumView = () => {
    const { id } = useParams()
    const [albumData, setAlbumData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const API_URL = `http://localhost:3000/song/${id}`
            const response = await fetch(API_URL)
            const resData = await response.json()
            setAlbumData(resData.results)
        }
        fetchData()
    }, [id])

    const justSongs = albumData.filter(entry => entry.wrapperType === 'track')

    const renderSongs = justSongs.map((song, i) => {
        return (
            <div key={i}>
                <p>{song.trackName}</p>
            </div >
        )
    })

    const navButtons = () => {
        return (
            <div>
                <button onClick={() => navigate(-1)}>Back</button>
                |
                <button onClick={() => navigate('/')}>Home</button>
            </div>
        )
    }

    return (
        <div>
            {albumData.length > 0 ? <h2>{albumData[0].albumName}</h2> : <h2>Loading...</h2>}
            {navButtons()}
            {renderSongs}
        </div>
    )
}

export default AlbumView
