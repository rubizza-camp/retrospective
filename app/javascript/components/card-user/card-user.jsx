import React from 'react';
import {CardUserAvatar} from '../card-user-avatar';
import './style.less';

const CardUser = ({firstName, lastName, nickname, avatar}) => {
  const url = avatar?.thumb?.url;
  return (
    <div className="avatar__container">
      <CardUserAvatar avatar={url} firstName={firstName} lastName={lastName} />
      <span className="avatar__nickname">
        {firstName ? `${firstName} ${lastName}` : nickname}
      </span>
    </div>
  );
};

export default CardUser;
