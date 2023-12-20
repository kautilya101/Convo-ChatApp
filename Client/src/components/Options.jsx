import React, { useRef, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Phone, PhoneDisabled } from "@material-ui/icons";
import { SocketContext, useSocket } from "../SocketContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  gridContainer: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  container: {
    width: "600px",
    margin: "35px 0",
    padding: 0,
    [theme.breakpoints.down("xs")]: {
      width: "80%",
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: "10px 20px",
  },
}));

const Options = ({ children }) => {
  const {
    me,
    setMe,
    callAccepted,
    name,
    setName,
    calldeclined,
    declineCall,
    makeCall,
  } = useSocket();
  const classes = useStyles();
  const [idToCall, setIdToCall] = useState("");
  const nameRef = useRef();

  const validateName = () => {
    if(nameRef.current.value == ""){
      nameRef.current.focus();
    }
  }

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper} elevation={10}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid className={classes.gridContainer} container>
            <Grid item className={classes.padding} xs={12} md={6}>
              <Typography gutterBottom variant="h6">
                Account Info
              </Typography>
              <TextField
                inputRef={nameRef}
                label="Name*"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                autoComplete="off"
              />
              <CopyToClipboard
                text={me}
                className={classes.margin}
              >
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<Assignment fontSize="large" />}
                >
                  Copy
                </Button>
              </CopyToClipboard>
            </Grid>
            <Grid item className={classes.padding} xs={12} md={6}>
              <Typography gutterBottom variant="h6">
                Make a Call
              </Typography>
              <TextField
                label="ID to Call"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
                fullWidth
              />
              {callAccepted && !calldeclined ? (
                <Button
                  variant="contained"
                  className={classes.margin}
                  color="primary"
                  onClick={declineCall}
                  fullWidth
                  startIcon={<PhoneDisabled fontSize="large" />}
                >
                  Hang Up
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.margin}
                  onClick={() => { name !== "" ? makeCall(idToCall) : validateName() }}
                  fullWidth
                  startIcon={<Phone fontSize="large" />}
                >
                  Call
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>

      
    </Container>
  );
};

export default Options;
