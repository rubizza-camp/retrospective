import React from 'react';
import {BoardColumnHidden} from '../board-column-hidden';

import style from '../prev-action-item-column/style.module.less';

const ActionItemHeader = ({handleToggleClick}) => {
  return (
    <>
      <div className={style.header}>
        <BoardColumnHidden isLeft toggleOpen={handleToggleClick} />
        <h2 className={style.title}>ACTION ITEMS</h2>
      </div>

      <hr className={style.lineYellow} />
    </>
  );
};

export default ActionItemHeader;
