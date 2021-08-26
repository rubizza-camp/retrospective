import React from 'react';
import {getFullnameOrNickname} from '../../utils/helpers';
import style from './style.module.less';

import {CardUserAvatar} from '../card-user-avatar';

const ActionItemAssignee = ({firstName, lastName, nickName, avatar}) => {
  return (
    <div className={style.assignee}>
      Assigned to
      <div className={style.assigneeUser}>
        <span className={style.assigneeName}>
          {getFullnameOrNickname(firstName, lastName, nickName)}
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
