import React, {useState} from 'react';
import arrow from '../../images/undo_13';
import {getDate} from '../../utils/get-date';
import {boardApi} from '../api/boards-api';
import {BoardAvatar} from './board-avatar';
import {GroupIcons} from './group-icons/group-icons';
import {MenuIcon} from './menu-icon/menu-icon';
import style from './style.module.less';

const Board = ({
  role,
  board,
  setBoards,
  setIsModal,
  setHistoryBoards,
  historyBoards,
  users
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const continueBoard = async () => {
    const boards = await boardApi.continueBoard(board.slug);
    setBoards(boards);
    setIsOpenMenu(false);
  };

  const historyBoard = async () => {
    const boards = await boardApi.historyBoard(board.slug);
    setIsOpenMenu(false);
    setHistoryBoards(boards);
    setIsModal(true);
  };

  const deleteBoard = async () => {
    const boards = await boardApi.deleteBoard();
    setBoards(boards);
    setIsOpenMenu(false);
  };

  const onClickHandler = (event) => {
    event.stopPropagation();
    setIsOpenMenu(false);
  };

  const backGroundArrow = {
    backgroundImage: `url(${arrow})`
  };

  return (
    <div className={style.board} onClick={onClickHandler}>
      <div className={style.header}>
        <BoardAvatar id={board.id} boardAvatar="" title={board.title} />
        <span className={style.title}>
          <a href={`/boards/${board.slug}`}>{board.title}</a>
        </span>
        {!historyBoards.length && (
          <MenuIcon
            role={role}
            continueBoard={continueBoard}
            deleteBoard={deleteBoard}
            historyBoard={historyBoard}
            isOpenMenu={isOpenMenu}
            setIsOpenMenu={setIsOpenMenu}
          />
        )}
      </div>
      <div className={style.footer}>
        <span className={style.textDate}>
          <div style={backGroundArrow} className={style.arrowIcon}>
            <span>{board.boardsCount}</span>
          </div>
          {getDate(board.createdAt)}
        </span>
        <GroupIcons users={users} totalUsersCount={board.usersCount} />
      </div>
    </div>
  );
};

export default Board;
