import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import arrow from '../../images/undo_13';
import {getDate} from '../../utils/get-date';
import {boardApi} from '../api/boards-api';
import {Avatar} from '../avatar/avatar';
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
    if (boards) {
      setBoards(boards);
    }

    setIsOpenMenu(false);
  };

  const historyBoard = async () => {
    const boards = await boardApi.historyBoard(board.slug);
    if (boards) {
      setHistoryBoards(boards);
    }

    setIsOpenMenu(false);
    setIsModal(true);
  };

  const deleteBoard = async () => {
    const boards = await boardApi.deleteBoard(board.slug);
    if (boards) {
      setBoards(boards);
    }

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
        <Avatar isSquare avatar="" id={board.id} firstName={board.title} />
        <span className={style.title}>
          <NavLink to={`/board/${board.slug}`}>{board.title}</NavLink>
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
