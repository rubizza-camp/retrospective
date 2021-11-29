import React from 'react';
import style from '../prev-action-item-column/style.module.less';
import {LineForAction} from './line-for-action';

export const LinesForAction = ({
  actionItems,
  prevActionItems,
  hiddenActionItem
}) => {
  if (prevActionItems) {
    return (
      <div className={hiddenActionItem ? style.hiddenItems : style.items}>
        {prevActionItems.map((element) => (
          <LineForAction key={element.id} status={element.status} />
        ))}
      </div>
    );
  }

  return (
    <div className={style.items}>
      {actionItems.map((element) => (
        <LineForAction key={element.id} status={element.status} />
      ))}
    </div>
  );
};
