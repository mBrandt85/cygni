import React, { useEffect, useState } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  Container,
  IconButton,
  Typography
} from '@material-ui/core'
import {
  ChevronLeft as ChevronLeftIcon
} from '@material-ui/icons'

import { useArtist } from '../state'
import Page from '../components/Page'
import FetchLoading from '../components/FetchLoading'
import ArtistError from '../components/ArtistError'
import ArtistData from '../components/ArtistData'

const useStyles = makeStyles(theme => ({
  loading: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  action: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  }
}))

export default function Artist() {
  const { artists, createArtist } = useArtist()
  const styles = useStyles()
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [artist, setArtist] = useState({
    error: null,
    data: null
  })

  const fetchArtist = async () => {
    try {
      const stateArtist = artists.filter(i => i.mbid === id)[0]
      if (!!stateArtist) {
        setArtist({ ...artist, data: stateArtist })
      } else {
        const res = await fetch(`/api/artist/${id}`)
        if (res.status !== 200) throw new Error('Invalid MBID')
        const data = await res.json()
        setArtist({ ...artist, data })
        createArtist(data)
      }
      setLoading(false)
    } catch ({ message: error }) {
      setArtist({ ...artist, error })
      setLoading(false)
    }
  }

  useEffect(() => fetchArtist(), [])

  if (loading) return <FetchLoading />

  return (
    <Page key="artist" title="Artist">
      <Box my={2}>
        <Container maxWidth="lg">
          <Box className={styles.action}>
            <IconButton component={RouterLink} to="/">
              <ChevronLeftIcon />
            </IconButton>

            <Typography color="textSecondary">
              Back to search
            </Typography>
          </Box>

          {artist.error ? <ArtistError error={artist.error} /> : artist.data && <ArtistData data={artist.data} />}
        </Container>
      </Box>
    </Page>
  )
}