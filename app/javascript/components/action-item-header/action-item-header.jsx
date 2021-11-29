import React from 'react';
import {BoardColumnHidden} from '../board-column-hidden';

import style from '../prev-action-item-column/style.module.less';
import {LinesForAction} from './lines-for-action';

const ActionItemHeader = ({handleToggleClick, actionItems}) => {
  return (
    <>
      <div className={style.header}>
        <BoardColumnHidden isLeft toggleOpen={handleToggleClick} />
        <h2 className={style.title}>ACTION ITEMS</h2>
      </div>
      <LinesForAction actionItems={actionItems} />
    </>
  );
};

export default ActionItemHeader;
