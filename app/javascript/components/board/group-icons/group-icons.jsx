import React from 'react';
import {getInitials} from '../../../utils/helpers';
import style from '../style.module.less';

export const GroupIcons = ({users, totalUsersCount}) => {
  const userIcon = users.map((user) => {
    const stylesForAvatarIcon = `${style.combatant} ${
      style[`avatar${user.id % 10}`]
    }`;

    if (user.avatar.url) {
      return (
        <div key={user.id} className={style.combatant}>
          <img src={user.avatar.url} className={style.img} alt="ava" />
        </div>
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
        <span className={style.userCount}>{totalUsersCount}</span>
      </span>
    </div>
  );
};
