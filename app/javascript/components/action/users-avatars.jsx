import React from 'react';
import {getInitials} from '../../utils/helpers';
import style from '../board/style.module.less';

export const UsersAvatars = ({users}) => {
  return (
    <>
      {users.map((user) => {
        const stylesForAvatarIcon = `${style.combatant} ${
          style[`avatar${user.id % 10}`]
        }`;

        if (user.avatar.url) {
          return (
            <img
              key={user.id}
              src={user.avatar.url}
              className={style.combatant}
              alt="avatar"
            />
          );
        }

        return (
          <span key={user.id} className={style.avaContainer}>
            <span className={stylesForAvatarIcon}>
              {getInitials(user.firstName, user.lastName)}
            </span>
          </span>
        );
      })}
    </>
  );
};
