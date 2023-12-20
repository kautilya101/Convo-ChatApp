import { useState } from 'react'
import { Typography, AppBar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import VideoPlayer from './components/VideoPlayer'
import Options from './components/Options'
import Notifications from './components/Notifications'


const useStyle = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '20px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '300px',
    fontFamily: " monospace",
    textShadow: " ",
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },

  typography: {
    fontFamily: "roboto",
  }
}));

function App() {
  const [count, setCount] = useState(0)
  const classes = useStyle();

  return (
    <div className={classes.wrapper}>
      <AppBar position='static' color='inherit' className={classes.appBar}>
        <Typography align='center' variant='h2' className={classes.typography} >
          Convo
        </Typography>
      </AppBar>

      <VideoPlayer/>
      <Options>
        <Notifications/>
      </Options>
    </div>
  )
}

export default App
