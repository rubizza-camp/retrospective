import React from 'react';
import style from './style.module.less';
import RightArrow from '../../images/right-arrow.svg';
import {LineForAction} from '../action-item-header/line-for-action';

const BoardColumnHidden = ({toggleOpen, isLeft, items}) => {
  return (
    <div className={`${style.sideMenu} ${isLeft && style.sideMenuLeft}`}>
      <button
        type="button"
        className={`${style.openButton} ${!isLeft && style.openButtonRotated}`}
        onClick={toggleOpen}
      >
        <RightArrow />
        <RightArrow />
      </button>
      {items && <LineForAction hiddenActionItem prevActionItems={items} />}
    </div>
  );
};

export default BoardColumnHidden;
