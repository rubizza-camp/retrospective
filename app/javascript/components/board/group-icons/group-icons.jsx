import React from 'react';
import {getInitials} from '../../../utils/helpers';
import style from '../style.module.less';

export const GroupIcons = ({users, usersCount}) => {
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
      <span key={user.id} className={stylesForAvatarIcon}>
        {getInitials(user.firstName, user.lastName)}
      </span>
    );
  });

  return (
    <div className={style.card}>
      <div className={style.cardBottom}>
        <div className={style.avatarGroup}>{userIcon}</div>
      </div>
      <span className={style.avaAddCount}>
        <span className={style.userCount}>{usersCount}</span>
      </span>
    </div>
  );
};
