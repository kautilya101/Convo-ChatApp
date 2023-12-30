import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import { io } from "socket.io-client";
const SimplePeer = window.SimplePeer;
const SocketContext = createContext();

const socket = io("https://convo-server.onrender.com/");

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [calldeclined, setCalldeclined] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      });

    socket.on("me", (id) => setMe(id));
    socket.on('calluser', ({ from, name: callerName, signal }) => {
        setCall({ isReceivingCall: true, from, name: callerName, signal });
      });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);
    <script src="/node_modules/simple-peer/simplepeer.min.js"></script>;
    const peer = new SimplePeer({ initiator: false, trickle: false, stream: stream });

    console.log(call.from, "call");
    peer.on("signal", (data) => {
      socket.emit("answercall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const makeCall = (id) => {

    const peer = new SimplePeer({ initiator: true, trickle: false, stream: stream });

    peer.on("signal", (data) => {
      socket.emit("calluser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const declineCall = () => {
    setCalldeclined(true);

    connectionRef.current.destroy();

    // window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        calldeclined,
        me,
        setMe,
        makeCall,
        declineCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => {
  return useContext(SocketContext);
};

export { ContextProvider, SocketContext, useSocket };
