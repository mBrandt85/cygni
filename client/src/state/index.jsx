import React from 'react'
import Artist, { useArtist } from './Artist'

export default function State({ children }) {
  return (
    <Artist>
      {children}
    </Artist>
  )
}

export {
  useArtist
}