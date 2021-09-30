import React from 'react';
import {getInitialsTitleBoard} from '../../utils/helpers';
import style from './style.module.less';

export const BoardAvatar = ({id, boardAvatar, title}) => {
  if (boardAvatar) {
    return (
      <img src={boardAvatar} className={style.ava} alt="ava" title={title} />
    );
  }

  const classes = `${style.ava} ${style.avatarText} ${
    style[`avatar${id % 10}`]
  }`;

  return <div className={classes}>{getInitialsTitleBoard(title)}</div>;
};
