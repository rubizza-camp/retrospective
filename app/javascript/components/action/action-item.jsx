import React from 'react';
import {ActionButton} from './action-button';
import {GenerateChevrons} from './generate-chevrons';
import style from './style.module.less';
import {UserIcon} from './user-avatars';

export const ActionItem = ({item}) => {
  const users = [
    {
      id: 1,
      first_name: 'artem',
      last_name: 'gaev',
      avatar: {url: 'https://klike.net/uploads/posts/2020-04/1587719791_1.jpg'}
    },
    {
      id: 2,
      first_name: 'bob',
      last_name: 'rich',
      avatar: {url: ''}
    }
  ];

  return (
    <div className={style.item}>
      <div className={style.header}>
        <div className={style.avatars}>
          <UserIcon users={users} />
        </div>
        <div className={style.title}>Author Name</div>
        <div className={style.icon}>
          <GenerateChevrons timesMoved={item.times_moved} />
        </div>
      </div>
      <div className={style.content}>{item.body}</div>
      {item.status === 'pending' ? (
        <div className={style.footer}>
          <ActionButton id={item.id} type="complete" title="Complete" />

          <ActionButton id={item.id} type="close" title="Discard task" />
        </div>
      ) : (
        <div className={style.footer}>
          <ActionButton id={item.id} type="reopen" title="Reopen" />
        </div>
      )}
    </div>
  );
};
