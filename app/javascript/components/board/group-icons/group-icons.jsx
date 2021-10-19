import React from 'react';
import {Avatar} from '../../avatar/avatar';
import style from '../style.module.less';

export const GroupIcons = ({users, totalUsersCount}) => {
  return (
    <div className={style.card}>
      <div className={style.cardBottom}>
        <div className={style.avatarGroup}>
          {users.map((user) => (
            <Avatar
              key={user.id}
              avatar={user.avatar.url}
              id={user.id}
              isSquare={false}
              firstName={user.firstName}
              lastName={user.lastName}
            />
          ))}
        </div>
      </div>
      <span className={style.avaAddCount}>
        <span className={style.userCount}>{totalUsersCount}</span>
      </span>
    </div>
  );
};
