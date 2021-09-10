import React from 'react';
import {getInitials} from '../../utils/helpers';
import style from '../board-card/style.module.less';

export const UserIcon = ({users}) => {
  const avatar = users.map((user) => {
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
          {getInitials(user.first_name, user.last_name)}
        </span>
      </span>
    );
  });

  return avatar;
};
