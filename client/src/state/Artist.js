import { createContext, useContext, useEffect, useReducer } from 'react'

const Context = createContext()

function Reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        init: true
      }

    case 'SET_ARTISTS':
      return {
        ...state,
        artists: action.artists
      }

    case 'CREATE_ARTIST':
      const createArtists = [action.artist, ...state.artists]

      localStorage.setItem('artists', JSON.stringify(createArtists))

      return {
        ...state,
        artists: createArtists
      }

    case 'DELETE_ARTIST':
      const deleteArtists = state.artists.filter(artist => artist.mbid !== action.mbid)

      localStorage.setItem('artists', JSON.stringify(deleteArtists))

      return {
        ...state,
        artists: deleteArtists
      }

    default:
      return {
        ...state
      }
  }
}

export default function Artist({ children }) {
  const [state, dispatch] = useReducer(Reducer, {
    init: false,
    artists: []
  })

  const createArtist = artist => {
    dispatch({
      type: 'CREATE_ARTIST',
      artist
    })
  }

  const deleteArtist = mbid => dispatch({
    type: 'DELETE_ARTIST',
    mbid
  })

  const loadLocalStorage = () => {
    const localData = JSON.parse(localStorage.getItem('artists'))
    if (localData) {
      let artists = []
      localData && localData.map(i => artists = [...artists, i])
      dispatch({
        type: 'SET_ARTISTS',
        artists
      })
    }
    dispatch({ type: 'INIT' })
  }

  useEffect(() => loadLocalStorage(), [])

  return <Context.Provider value={{
    init: state.init,
    artists: state.artists,
    createArtist,
    deleteArtist
  }}>
    {children}
  </Context.Provider>
}

export function useArtist() {
  return useContext(Context)
}