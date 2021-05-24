import { createContext, useContext, useReducer } from 'react'

const Context = createContext()

function Reducer(state, action) {
  switch (action.type) {
    case 'CREATE_ARTIST':
      return {
        ...state,
        artists: [action.artist, ...state.artists]
      }

    case 'DELETE_ARTIST':
      return {
        ...state,
        artists: state.artists.filter(artist => artist.mbid !== action.mbid)
      }

    default:
      return {
        ...state
      }
  }
}

export default function Artist({ children }) {
  const [state, dispatch] = useReducer(Reducer, {
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
    id
  })

  return <Context.Provider value={{
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