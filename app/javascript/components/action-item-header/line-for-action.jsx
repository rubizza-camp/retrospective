import React from 'react';
import style from '../prev-action-item-column/style.module.less';

export const LineForAction = ({
  actionItems,
  prevActionItems,
  hiddenActionItem
}) => {
  if (prevActionItems) {
    const itemStyle = {
      pending: `${style.itemYellow}`,
      done: `${style.itemGreen}`,
      closed: `${style.itemRed}`
    };

    return (
      <div className={hiddenActionItem ? style.hiddenItems : style.items}>
        {prevActionItems.map((element) => {
          return <div key={element.id} className={itemStyle[element.status]} />;
        })}
      </div>
    );
  }

  return (
    <div className={style.items}>
      {actionItems.map((element) => (
        <div key={element.id} className={style.itemYellow} />
      ))}
    </div>
  );
};
