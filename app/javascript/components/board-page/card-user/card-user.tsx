import React from 'react';
import {getFullnameOrNickname} from '../../../utils/helpers';
import {Avatar} from '../../avatar/avatar';
import './style.less';

export const CardUser = ({firstName, lastName, nickname, avatar, id}: any) => {
  const url = avatar?.thumb?.url;
  return (
    <div className="avatar__container">
      <Avatar
        avatar={url}
        id={id}
        isSquare={false}
        firstName={firstName}
        lastName={lastName}
      />
      <span className="avatar__nickname">
        {getFullnameOrNickname(firstName, lastName, nickname)}
      </span>
    </div>
  );
};
