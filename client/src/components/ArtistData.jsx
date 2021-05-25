import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Paper,
  Box,
  Typography,
  Divider,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import {
  Warning as WarningIcon,
  Link as LinkIcon
} from '@material-ui/icons'
import { grey } from '@material-ui/core/colors'
import Flag from 'react-world-flags'

const useStyles = makeStyles(theme => ({
  gridItem: {
    padding: theme.spacing(1.5)
  },
  bodyDivider: {
    margin: theme.spacing(1, 0)
  },
  lifeSpan: {
    marginLeft: theme.spacing(1)
  },
  albumItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: 240,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  albumInfo: {
    padding: theme.spacing(1),
    backgroundColor: grey[900],
    opacity: 0.9,
    color: theme.palette.getContrastText(grey[900])
  },
  albumNoImage: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  albumNoImageIcon: {
    marginBottom: theme.spacing(1),
    fontSize: 50
  },
  flag: {
    marginLeft: theme.spacing(1) 
  }
}))

export default function ArtistData({ data: { mbid, name, lifeSpan, country, description, albums, officialHomepage, wikipediaHomepage }}) {
  const styles = useStyles()

  let date = new Date(lifeSpan.begin).getFullYear()
  if (lifeSpan.ended) date = `${date} - ${new Date(lifeSpan.end).getFullYear()}`

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={9}>
        <Paper className={styles.gridItem}>
          <Typography component="h1" variant="h5">
            {name}

            <Typography className={styles.lifeSpan} component="span" color="textSecondary" variant="subtitle1">
              ({date})
            </Typography>
            
            {!!country && <Flag code={country.toLowerCase()} height="16" className={styles.flag} />}
          </Typography>

          <Divider className={styles.bodyDivider} />

          <Typography component="article" variant="body1" dangerouslySetInnerHTML={{ __html: description }} />
        </Paper>
      </Grid>

      <Grid item xs={12} lg={3}>
        <Paper>
          <List component="div" subheader={<ListSubheader disableSticky>Links</ListSubheader>}>
            <ListItem button onClick={() => window.location.href = officialHomepage}>
              <ListItemIcon>
                <LinkIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Official Homepage" />
            </ListItem>
            
            <ListItem button onClick={() => window.location.href = `https://musicbrainz.org/artist/${mbid}`}>
              <ListItemIcon>
                <LinkIcon color="secondary"  />
              </ListItemIcon>
              <ListItemText primary="MusicBrainz" />
            </ListItem>

            <ListItem button onClick={() => window.location.href = wikipediaHomepage}>
              <ListItemIcon>
                <LinkIcon color="secondary"  />
              </ListItemIcon>
              <ListItemText primary="Wikipedia" />
            </ListItem>
          </List>
        </Paper>
      </Grid>

      {albums.length > 0 && <Grid item xs={12}>
        <Typography component="h2" variant="overline" color="textSecondary">
          Albums
        </Typography>

        <Divider light />
      </Grid>}

      {albums.sort((a, b) => a.releaseDate > b.releaseDate ? 1 : -1).map(({ id, title, releaseDate, thumbnail }) => (    
        <Grid key={id} item xs={6} sm={4} md={3}>
          <Paper className={styles.albumItem} style={thumbnail && { backgroundImage: `url(${thumbnail})` }}>
            {!thumbnail && <Box className={styles.albumNoImage}>
              <WarningIcon color="error" className={styles.albumNoImageIcon} />

              <Typography component="h6" color="error" variant="body2">
                Image unavailable!
              </Typography>
            </Box>}

            <Box className={styles.albumInfo}>
              <Typography component="h5" color="inherit" variant="body1">
                {title}
              </Typography>

              <Typography component="h6" color="inherit" variant="body2">
                {new Date(releaseDate).getFullYear()}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}
