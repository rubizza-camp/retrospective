import React from 'react';

import style from './style.module.less';

import {CardUserAvatar} from '../card-user-avatar';

const ActionItemAssignee = ({firstName, lastName, avatar}) => {
  return (
    <div className={style.assignee}>
      Assigned to
      <div className={style.assigneeUser}>
        <span className={style.assigneeName}>
          {firstName} {lastName}
        </span>
        <CardUserAvatar
          avatar={avatar}
          firstName={firstName}
          lastName={lastName}
        />
      </div>
    </div>
  );
};

export default ActionItemAssignee;
