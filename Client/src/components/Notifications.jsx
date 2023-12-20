import React from 'react';
import { Button } from '@material-ui/core';
import { useSocket } from '../SocketContext';
import { Phone } from '@material-ui/icons';

const Notifications = () => {

    const { answerCall, callAccepted, call } = useSocket();

    return (
        <>
            
            { call.isReceivingCall && !callAccepted && (
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <h1> {call.name} is Calling: </h1>
                    <Button variant='contained' color='primary' onClick={answerCall}>
                        Answer
                    </Button>
                </div>
            )}
        
        </>
    );
}

export default Notifications;
