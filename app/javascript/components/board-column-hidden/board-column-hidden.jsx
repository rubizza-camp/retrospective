import React from 'react';
import style from './style.module.less';
import RightArrow from '../../images/right-arrow.svg';

const BoardColumnHidden = ({toggleOpen, isLeft}) => {
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
    </div>
  );
};

export default BoardColumnHidden;
