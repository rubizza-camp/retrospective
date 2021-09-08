import {faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {boardApi} from '../../api/boards-api';
import style from './style.module.less';

export const MenuIcon = ({
  boardSlug,
  setIsOpenMenu,
  isOpenMenu,
  setBoards,
  setModal,
  setHistoryBoards
}) => {
  const continueHandler = async () => {
    await boardApi.continueBoard(boardSlug);
    const response = await boardApi.getBoards();
    setBoards(response);
    setIsOpenMenu(false);
  };

  const historyHandler = async () => {
    const response = await boardApi.historyBoard(boardSlug);
    setIsOpenMenu(false);
    setHistoryBoards(response);
    setModal(true);
  };

  const deleteHandler = async () => {
    await boardApi.deleteBoard(boardSlug);
    const response = await boardApi.getBoards();
    setBoards(response);
    setIsOpenMenu(false);
  };

  return (
    <div className={style.dropdown}>
      <FontAwesomeIcon
        icon={faEllipsisH}
        size="lg"
        color="#C6C6C4"
        onClick={(event) => {
          event.stopPropagation();
          setIsOpenMenu(!isOpenMenu);
        }}
      />
      <div className={isOpenMenu ? style.openMenu : style.items}>
        <div className={style.item} onClick={continueHandler}>
          continue
        </div>
        <div className={style.item} onClick={historyHandler}>
          history
        </div>
        <div className={style.item} onClick={deleteHandler}>
          delete
        </div>
      </div>
    </div>
  );
};
