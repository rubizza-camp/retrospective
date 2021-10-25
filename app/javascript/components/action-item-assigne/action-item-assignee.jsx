import React from 'react';
import {getFullnameOrNickname} from '../../utils/helpers';
import {Avatar} from '../avatar/avatar';
import style from './style.module.less';

const ActionItemAssignee = ({firstName, lastName, nickName, avatar, id}) => {
  return (
    <div className={style.assignee}>
      Assigned to
      <div className={style.assigneeUser}>
        <span className={style.assigneeName}>
          {getFullnameOrNickname(firstName, lastName, nickName)}
        </span>
        <div className={style.ava}>
          <Avatar
            avatar={avatar}
            id={id}
            isSquare={false}
            firstName={firstName}
            lastName={lastName}
          />
        </div>
      </div>
    </div>
  );
};

export default ActionItemAssignee;
