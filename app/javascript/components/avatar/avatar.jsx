import React from 'react';
import {getInitials} from '../../utils/helpers';
import style from './style.module.less';

export const Avatar = ({
  avatar,
  id,
  isSquare,
  firstName,
  lastName,
  width,
  height
}) => {
  if (avatar) {
    if (isSquare) {
      return <img src={avatar} className={style.squareAvatar} />;
    }

    return (
      <div className={style.roundAvatarContainer}>
        <img src={avatar} className={style.roundAvatar} />
      </div>
    );
  }

  const classes = isSquare
    ? `${style.squareAvatar} ${style.squareAvatarText} ${
        style[`avatar-${id % 10}`]
      }`
    : `${style.roundAvatarContainer} ${style.roundAvatarText} ${
        style[`avatar-${id % 10}`]
      }`;

  return (
    <div
      style={{width: `${width}px`, height: `${height}px`}}
      className={classes}
    >
      {getInitials(firstName, lastName)}
    </div>
  );
};
