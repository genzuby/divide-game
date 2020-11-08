import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

export const SocketContext = React.createContext();

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io('http://localhost:5000', { query: { id } });
    setSocket(newSocket);

    //  clean socket
    return () => newSocket.close();
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
