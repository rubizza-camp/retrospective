import React, {useState} from 'react';
import style from './menu-icon.module.less';
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {boardApi} from '../../api/boards-api';

export const MenuIcon = ({boardSlug}) => {
  const [isOpen, setIsOpen] = useState(false);

  const continueHandler = () => {
    boardApi.continueBoard(boardSlug);
    setIsOpen(false);
  };

  const historyHandler = () => {
    boardApi.historyBoard(boardSlug);
    setIsOpen(false);
  };

  const deleteHandler = () => {
    boardApi.deleteBoard(boardSlug);
    setIsOpen(false);
  };

  return (
    <div className={style.dropdown}>
      <FontAwesomeIcon
        icon={faEllipsisH}
        size="lg"
        color="#C6C6C4"
        onClick={() => setIsOpen(!isOpen)}
      />
      <div className={isOpen ? style.openMenu : style.items}>
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
