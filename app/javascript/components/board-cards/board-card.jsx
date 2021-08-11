import React from 'react';
import style from './style.module.less';

const BoardCard = (props) => {
  return <div className={style.app}>{props.id}</div>;
};

export default BoardCard;
