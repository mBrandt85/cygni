import { createMuiTheme } from '@material-ui/core/styles'
import { red, grey, blueGrey, deepPurple } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[600],
    },
    secondary: {
      main: deepPurple[500],
    },
    error: {
      main: red[400],
    },
    background: {
      default: grey[100],
    },
  },
})

export default theme