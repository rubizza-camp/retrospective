import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {boardApi} from './api/boards-api';
import Board from './board/board';
import ModalWindow from './board/modal/modal-window';
import {CreateBoard} from './create-board/create-board';
import style from './board/style.module.less';
import './style.less';

const BoardsContainer = () => {
  const [startBoards, setStartBoards] = useState([]);
  const [historyBoards, setHistoryBoards] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [role, setRole] = useState('creator');
  const [isCreateBoardOpen, setCreateBoardOpen] = useState(false);

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
      <button
        className={style.createButton}
        type="button"
        onClick={() => {
          setCreateBoardOpen(true);
        }}
      >
        <FontAwesomeIcon
          icon={faPlus}
          size="sm"
          color="#474343"
          style={{marginRight: '8px'}}
        />
        New board
      </button>
      <div className={style.buttons}>
        <button
          className={
            role === 'creator'
              ? `${style.activeButton} ${style.button}`
              : style.button
          }
          type="button"
          onClick={() => setRole('creator')}
        >
          My Boards
        </button>
        <button
          className={
            role === 'participating'
              ? `${style.activeButton} ${style.button}`
              : style.button
          }
          type="button"
          onClick={() => setRole('participating')}
        >
          Boards where I am
        </button>
      </div>
      <div className={style.boards}>
        {startBoards.map((board) => (
          <Board
            key={board.id}
            role={role}
            setIsModal={setIsModal}
            historyBoards={historyBoards}
            setBoards={setStartBoards}
            setHistoryBoards={setHistoryBoards}
            board={board}
          />
        ))}
      </div>
      <CreateBoard
        isCreateBoardOpen={isCreateBoardOpen}
        setCreateBoardOpen={setCreateBoardOpen}
      />
    </div>
  );
};

export default BoardsContainer;
