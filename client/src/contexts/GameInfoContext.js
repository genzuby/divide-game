import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { SocketContext } from './SocketContext';

export const GameInfoContext = createContext();

export const GameInfoProvider = ({ id, children }) => {
  const socket = useContext(SocketContext);

  const [gameInfo, setGameInfo] = useState({
    myid: '',
    winnerId: '',
    competitorid: '',
    gameNumber: 0,
    lastNumber: -1,
    isGameon: false,
    isAutoPlay: false,
    endGame: false,
  });
  const [invitation, setInvitation] = useState({});
  const [accept, setAccept] = useState({});
  const [contextPlayerList, setContextPlayerList] = useState([]);
  const [lastTurn, setLastTurn] = useState({});
  const [isMyTurn, setIsMyTurn] = useState({});
  const [gamehistory, setGameHistory] = useState([]);
  const [availableInput, setVailableInput] = useState(0);

  const gameReset = useCallback(
    type => {
      setInvitation({});
      setAccept({});
      setLastTurn({});
      setIsMyTurn({});
      setGameHistory([]);
      setGameInfo({});
      if (type === 'RESTART_GAME') {
        setGameInfo({ myid: gameInfo.myid });
      }
    },
    [
      gameInfo.myid,
      setInvitation,
      setAccept,
      setLastTurn,
      setIsMyTurn,
      setGameHistory,
      setGameInfo,
    ]
  );

  const setGameMessage = useCallback(
    receiveInfo => {
      // display reason bottom to top
      setGameHistory(prev => [receiveInfo, ...prev]);
      setLastTurn({
        whosTurn: receiveInfo.receiver,
        isReady: true,
      });
      setGameInfo(prev => ({ ...prev, lastNumber: receiveInfo.resultNum }));

      // check winner
      if (receiveInfo.resultNum === 0 || receiveInfo.resultNum === 1) {
        setGameInfo(prev => ({
          ...prev,
          endGame: true,
          winnerId: receiveInfo.player,
        }));
      }
    },
    [setGameHistory, setLastTurn]
  );

  const setInvitationMessage = useCallback(
    receiveInfo => {
      setInvitation(receiveInfo);
      setGameInfo(prev => ({
        ...prev,
        competitorid: receiveInfo.sender,
        gameNumber: receiveInfo.number,
      }));
    },
    [setInvitation, setGameInfo]
  );

  const setCancelGame = useCallback(() => {
    gameReset('RESTART_GAME');
  }, [gameReset]);

  const setAcceptMessage = useCallback(
    receiveInfo => {
      setAccept(receiveInfo);
      setGameInfo(prev => ({
        ...prev,
        competitorid: receiveInfo.isAccept ? receiveInfo.sender : '',
        isGameon: receiveInfo.isAccept,
      }));
      // the requester will be the first turn!!
      if (receiveInfo.isAccept)
        setLastTurn({ whosTurn: receiveInfo.receiver, isReady: true });
    },
    [setAccept, setGameInfo]
  );

  const sendGameMessage = (competitor, inputNumber, numFromComp) => {
    const resultValue = (inputNumber + numFromComp) / 3;
    socket.emit('send-game-message', {
      receiver: competitor,
      player: id,
      inputNumber,
      numFromComp,
      resultNum: resultValue,
    });
    setGameMessage({
      receiver: competitor,
      player: id,
      inputNumber,
      numFromComp,
      resultNum: resultValue,
    });
  };

  const sendInvitation = (competitor, number) => {
    console.log('send-invitation-client', competitor, number);
    socket.emit('send-invitation', { receiver: competitor, number });
    setInvitationMessage({ receiver: competitor, number, sender: id });
  };

  const sendRequestCancel = futureCompetitor => {
    socket.emit('cancel-request', { receiver: futureCompetitor });
    setCancelGame();
  };

  const acceptInvitation = (competitor, isAccept) => {
    socket.emit('accept-invitation', { receiver: competitor, isAccept });
    setAcceptMessage({ receiver: competitor, isAccept, sender: id });
  };

  //initial game user id(my id) setting
  useEffect(() => {
    setGameInfo(prev => ({ ...prev, myid: id }));
  }, [id]);

  // check who's turn
  useEffect(() => {
    const chkTurn = lastTurn.isReady && lastTurn.whosTurn === gameInfo.myid;
    setIsMyTurn(chkTurn);
  }, [lastTurn.isReady, lastTurn.whosTurn, gameInfo.myid]);

  // set available number
  useEffect(() => {
    const playNumber =
      gameInfo.lastNumber === -1 ? gameInfo.gameNumber : gameInfo.lastNumber;

    const value = [-1, 0, 1].filter(val => (val + playNumber) % 3 === 0);

    setVailableInput(value[0]);
  }, [gameInfo.lastNumber, gameInfo.gameNumber, setVailableInput]);

  //when user receive game message
  useEffect(() => {
    if (socket == null) return;

    socket.on('receive-game-message', setGameMessage);
    return () => socket.off('receive-game-message');
  }, [socket, setGameMessage]);

  //when user receive invitation
  useEffect(() => {
    if (socket == null) return;

    socket.on('receive-invitation', setInvitationMessage);
    return () => socket.off('receive-invitation');
  }, [socket, setInvitationMessage]);

  //when user receive game accept
  useEffect(() => {
    if (socket == null) return;

    socket.on('accept-gameon', setAcceptMessage);
    return () => socket.off('accept-gameon');
  }, [socket, setAcceptMessage]);

  //when user game cancel receive
  useEffect(() => {
    if (socket == null) return;

    socket.on('receive-cancel', setCancelGame);
    return () => socket.off('receive-cancel');
  }, [socket, setCancelGame]);

  //watch db change
  useEffect(() => {
    if (socket == null) return;
    console.log('add-newplayer');
    socket.on('add-newplayer', adduser =>
      setContextPlayerList(prev =>
        [...prev, adduser].sort((a, b) =>
          a.isAvailable < b.isAvailable
            ? 1
            : b.isAvailable < a.isAvailable
            ? -1
            : 0
        )
      )
    );
    // contextInfo update
    socket.on('update-player-info', updateplayer => {
      setContextPlayerList(prev => {
        const updatePlayerList = prev
          .reduce((cum, player) => {
            let updateSet = {};
            if (player._id === updateplayer._id) {
              updateSet = { ...player, isAvailable: updateplayer.isAvailable };
            } else {
              updateSet = { ...player };
            }
            cum.push(updateSet);
            return cum;
          }, [])
          .sort((a, b) =>
            a.isAvailable < b.isAvailable
              ? 1
              : b.isAvailable < a.isAvailable
              ? -1
              : 0
          );
        return updatePlayerList;
      });
    });

    return () => {
      socket.off('add-newplayer');
      socket.off('update-player-info');
    };
  }, [socket, setContextPlayerList]);

  const value = {
    gameInfo,
    setGameInfo,
    accept,
    setAccept,
    contextPlayerList,
    setContextPlayerList,
    lastTurn,
    setLastTurn,
    isMyTurn,
    gamehistory,
    setGameHistory,
    invitation,
    setInvitation,
    sendGameMessage,
    sendInvitation,
    sendRequestCancel,
    acceptInvitation,
    availableInput,
    setVailableInput,
    gameReset,
  };
  // console.log(value);

  return (
    <GameInfoContext.Provider value={value}>
      {children}
    </GameInfoContext.Provider>
  );
};
