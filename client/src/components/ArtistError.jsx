import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  Typography
} from '@material-ui/core'
import {
  Error as ErrorIcon
} from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  error: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  errorIcon: {
    marginBottom: theme.spacing(1),
    fontSize: 60
  }
}))

export default function ArtistError({ error }) {
  const styles = useStyles()

  return (
    <Box className={styles.error}>
      <ErrorIcon color="error" className={styles.errorIcon} />

      <Typography component="h1" variant="h5" color="error" gutterBottom>
        Ops... Something went wrong!
      </Typography>

      <Typography component="p" variant="body1" color="textSecondary" gutterBottom>
        {error}
      </Typography>
    </Box>
  )
}
