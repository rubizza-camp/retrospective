import React from 'react';
import {getUserInitials} from '../../../utils/helpers';
import style from '../board-card.module.less';

export const GroupIcons = ({users}) => {
  const userIcon = users.map((user) => {
    const stylesForAvatarIcon = `${style.combatant} ${
      style[`avatar${user.id % 10}`]
    }`;

    if (user.avatar.url) {
      return (
        <img
          key={user.id}
          src={user.avatar.url}
          className={style.combatant}
          alt="ava"
        />
      );
    }

    return (
      <span key={user.id} className={style.avaContainer}>
        <span className={stylesForAvatarIcon}>
          {getUserInitials(user.first_name, user.last_name)}
        </span>
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
            <span className={stylesForUsersCount}>{users.length}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
