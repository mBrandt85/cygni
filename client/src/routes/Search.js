import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Box,
  Container,
  Divider,
  Typography,
  IconButton,
  Paper,
  InputBase
} from '@material-ui/core'
import {
  Search as SearchIcon,
  Clear as ClearIcon
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import { useArtist } from '../state'
import Page from '../components/Page'

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center'
  },
  search: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(4, 0)
  },
  input: {
    width: '100%',
    marginLeft: theme.spacing(2)
  },
  iconButton: {
    padding: theme.spacing(1.75)
  },
  history: {
    margin: theme.spacing(4, 0),
    textTransform: 'uppercase'
  }
}))

export default function Search() {
  const { artists, deleteArtist } = useArtist()
  const styles = useStyles()
  const history = useHistory()
  const [search, setSearch] = useState('')

  const handleChange = e => setSearch(e.target.value)

  const handleSubmit = async e => {
    e.preventDefault()
    history.push(`/artist/${search}`)
  }

  return (
    <Page>
      <Box my={6}>
        <Container maxWidth="sm">
          <Typography color="primary" className={styles.title} variant="h2" component="h1">
            Cygni
          </Typography>

          <Typography className={styles.title} variant="h4" component="h2">
            Hemuppgift
          </Typography>

          <Paper component="form" className={styles.search} onSubmit={handleSubmit}>
            <InputBase
              className={styles.input}
              placeholder="Search Artist by MBID"
              value={search}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'search artists by MBID' }}
            />

            {search.length > 0 && <IconButton onClick={() => setSearch('')} className={styles.iconButton} aria-label="search">
              <ClearIcon color="error" />
            </IconButton>}
            
            <IconButton type="submit" color="primary" className={styles.iconButton} aria-label="directions">
              <SearchIcon color="primary" />
            </IconButton>
          </Paper>

          <Divider />

          <Typography className={styles.history} variant="subtitle2" component="h3" gutterBottom>
            Search history
          </Typography>
        </Container>
      </Box>
    </Page>
  )
}