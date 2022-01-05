import {faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import style from './style.module.less';

export const MenuIcon = ({
  role,
  setIsOpenMenu,
  isOpenMenu,
  historyBoard,
  deleteBoard,
  continueBoard
}) => {
  const onClickHandler = (event) => {
    event.stopPropagation();
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <div className={style.dropdown} onMouseLeave={() => setIsOpenMenu(false)}>
      <FontAwesomeIcon
        icon={faEllipsisH}
        size="lg"
        color="#C6C6C4"
        onClick={onClickHandler}
      />
      <div className={isOpenMenu ? style.openMenu : style.items}>
        {role === 'creator' && (
          <div className={style.item} onClick={continueBoard}>
            continue
          </div>
        )}
        <div className={style.item} onClick={historyBoard}>
          history
        </div>
        {role === 'creator' && (
          <div className={style.item} onClick={deleteBoard}>
            delete
          </div>
        )}
      </div>
    </div>
  );
};
