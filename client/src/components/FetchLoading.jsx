import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  CircularProgress,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  loading: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

export default function FetchLoading() {
  const styles = useStyles()

  return (
    <Box component="main" className={styles.loading}>
      <Typography component="h1" variant="h6" color="primary" gutterBottom>
        Fetching data
      </Typography>

      <CircularProgress color="primary" />
    </Box>
  )
}