import React, {useEffect, useState} from 'react';
import {boardApi} from './api/boards-api';
import Board from './board/board';
import ModalWindow from './board/modal/modal-window';
import './style.less';

const BoardsContainer = () => {
  const [startBoards, setStartBoards] = useState([]);
  const [historyBoards, setHistoryBoards] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    boardApi.getBoards().then((response) => {
      setStartBoards(response);
    });
  }, []);

  const boardElement = startBoards.map((board) => (
    <Board
      key={board.id}
      setModal={setModal}
      historyBoards={historyBoards}
      setBoards={setStartBoards}
      setHistoryBoards={setHistoryBoards}
      board={board}
      users={board.users}
    />
  ));

  const historyBoardElement = historyBoards.map((board) => (
    <Board
      key={board.id}
      setModal={setModal}
      historyBoards={historyBoards}
      setBoards={setStartBoards}
      setHistoryBoards={setHistoryBoards}
      board={board}
      users={board.users}
    />
  ));

  return (
    <div className="board-container">
      <ModalWindow
        visible={modal}
        setVisible={setModal}
        setHistoryBoards={setHistoryBoards}
      >
        {historyBoardElement}
      </ModalWindow>
      {boardElement}
    </div>
  );
};

export default BoardsContainer;
