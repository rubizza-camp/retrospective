import React, {useEffect, useState} from 'react';
import {boardApi} from './api/boards-api';
import Board from './board/board';
import ModalWindow from './board/modal/modal-window';
import './style.less';

const BoardsContainer = ({role}) => {
  const [startBoards, setStartBoards] = useState([]);
  const [historyBoards, setHistoryBoards] = useState([]);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    if (role === 'creator') {
      boardApi.getBoards().then((response) => {
        setStartBoards(response);
      });
    } else {
      boardApi.getBoardsWhereIAm().then((response) => {
        setStartBoards(response);
      });
    }
  }, [role]);

  return (
    <div className="board-container">
      <ModalWindow
        visible={isModal}
        setVisible={setIsModal}
        setHistoryBoards={setHistoryBoards}
      >
        {historyBoards.map((board) => (
          <Board
            key={board.id}
            role={role}
            setIsModal={setIsModal}
            historyBoards={historyBoards}
            setBoards={setStartBoards}
            setHistoryBoards={setHistoryBoards}
            board={board}
            users={board.users}
          />
        ))}
      </ModalWindow>
      {startBoards.map((board) => (
        <Board
          key={board.id}
          role={role}
          setIsModal={setIsModal}
          historyBoards={historyBoards}
          setBoards={setStartBoards}
          setHistoryBoards={setHistoryBoards}
          board={board}
          users={board.users}
        />
      ))}
    </div>
  );
};

export default BoardsContainer;
