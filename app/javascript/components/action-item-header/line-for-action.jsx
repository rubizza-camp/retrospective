import React from 'react';
import style from '../prev-action-item-column/style.module.less';

export const LineForAction = ({status}) => {
  const itemStyle = {
    pending: `${style.itemRed}`,
    done: `${style.itemGreen}`,
    closed: `${style.itemGray}`
  };

  return <div className={itemStyle[status]} />;
};
