import React from 'react';
import {ActionButton} from './action-button';
import {GenerateChevrons} from './generate-chevrons';
import style from './style.module.less';
import {UsersAvatars} from './users-avatars';

export const ActionItem = ({item, setActionItems}) => {
  const users = [item.author, item.assignee];
  return (
    <div className={style.item}>
      <div className={style.header}>
        <div className={style.avatars}>
          <UsersAvatars users={users} />
        </div>
        <div className={style.title}>{item.author.name}</div>
        <div className={style.icon}>
          <GenerateChevrons timesMoved={item.timesMoved} />
        </div>
      </div>
      <div className={style.content}>{item.body}</div>
      {item.status === 'pending' ? (
        <div className={style.footer}>
          <ActionButton
            id={item.id}
            setActionItems={setActionItems}
            type="complete"
            title="Complete"
          />
          <ActionButton
            id={item.id}
            setActionItems={setActionItems}
            type="close"
            title="Discard task"
          />
        </div>
      ) : (
        <div className={style.footer}>
          <ActionButton
            id={item.id}
            setActionItems={setActionItems}
            type="reopen"
            title="Reopen"
          />
        </div>
      )}
    </div>
  );
};
