import React from 'react';
import { Typography, Paper, Grid, colors } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useSocket } from '../SocketContext';
import { cyan } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    video: {
        width: '550px',
        [theme.breakpoints.down('xs')]: {
          width: '300px',
        },
      },
      gridContainer: {
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
          flexDirection: 'column',
        },
      },
      paper: {
        backgroundColor: colors.indigo[100],
        padding: '10px',
        margin: '10px',
      }
    })
);

const VideoPlayer = () => {
    
    const { name, callAccepted, myVideo, userVideo, calldeclined, stream, call } = useSocket();
    const classes = useStyles();

    return (
        <Grid container className={classes.gridContainer}>
            {/* my video */}
            {stream && (<Paper className={classes.paper}>
                <Grid item xs={12} md={6}>
                <Typography variant='h5' gutterBottom={true} >{name || 'You'}</Typography>
                    <video playsInline muted ref={myVideo} autoPlay className={classes.video}/>
                    
                </Grid>
            </Paper>)}
            {/* usevideo */}
            { callAccepted && !calldeclined && (<Paper className={classes.paper}>
                <Grid item xs={12} md={6}>
                  <Typography variant='h5' gutterBottom={true} >{call.name || 'User'}</Typography>
                  <video playsInline ref={userVideo} autoPlay className={classes.video}/>
                    
                </Grid>
            </Paper>)}
        </Grid>
    );
}

export default VideoPlayer;
