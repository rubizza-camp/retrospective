import React from 'react';
import {actionItemsApi} from '../api/action-items-api';
import style from './style.module.less';

export const ActionButton = ({id, type, title, setActionItems}) => {
  const onClickHandler = async () => {
    let actionItems;
    switch (type) {
      case 'close':
        actionItems = await actionItemsApi.closeActionItem(id);
        break;
      case 'complete':
        actionItems = await actionItemsApi.completeActionItem(id);
        break;
      case 'reopen':
        actionItems = await actionItemsApi.reopenActionItem(id);
        break;
    }

    if (actionItems) {
      setActionItems(actionItems);
    }
  };

  return (
    <div className={style.buttonContainer}>
      {type === 'close' ? (
        <span onClick={onClickHandler}>{title}</span>
      ) : (
        <button type="button" className={style.button} onClick={onClickHandler}>
          {title}
        </button>
      )}
    </div>
  );
};
