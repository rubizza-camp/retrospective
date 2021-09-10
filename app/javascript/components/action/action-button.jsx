import React from 'react';
import {actionItemsApi} from '../api/action-items-api';
import style from './style.module.less';

export const ActionButton = ({id, type, title}) => {
  const onClickHandler = () => {
    switch (type) {
      case 'close':
        actionItemsApi.closeActionItem(id);
        break;
      case 'complete':
        actionItemsApi.completeActionItem(id);
        break;
      case 'reopen':
        actionItemsApi.reopenActionItem(id);
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
