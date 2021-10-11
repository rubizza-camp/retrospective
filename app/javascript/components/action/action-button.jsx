import React from 'react';
import {actionItemsApi} from '../api/action-items-api';
import style from './style.module.less';

export const ActionButton = ({id, type, title, setActionItems}) => {
  const onClickHandler = async () => {
    switch (type) {
      case 'close':
        setActionItems(await actionItemsApi.closeActionItem(id));
        break;
      case 'complete':
        setActionItems(await actionItemsApi.completeActionItem(id));
        break;
      case 'reopen':
        setActionItems(await actionItemsApi.reopenActionItem(id));
        break;
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
