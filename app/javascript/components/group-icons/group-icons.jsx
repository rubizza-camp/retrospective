import React from 'react';
import {getInitials} from '../../utils/helpers';
import style from '../board-card.module.less';

export const GroupIcons = ({board}) => {
  const userIcon = [...new Array(board.users_count)].map((index) => {
    const stylesForAvatarIcon = `${style.combatant} ${
      style[`avatar${index % 10}`]
    }`;

    return (
      <span key={index} className={style.avaContainer}>
        <span className={stylesForAvatarIcon}>{getInitials(board.title)}</span>
      </span>
    );
  });

  const stylesForUsersCount = `${style.combatant} ${style.userCount}`;

  return (
    <div className={style.card}>
      <div className={style.cardBottom}>
        <div className={style.avatarGroup}>
          {userIcon}
          <span className={style.avaAddCount}>
            <span className={stylesForUsersCount}>{board.users_count}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
