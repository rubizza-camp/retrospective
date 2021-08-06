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
      <div className={style.dot}>
        <span className={`${style.dotItem} ${style.dotItemRed}`} />
        <span className={`${style.dotItem} ${style.dotItemYellow}`} />
        <span className={`${style.dotItem} ${style.dotItemYellow}`} />
        <span className={`${style.dotItem} ${style.dotItemGreen}`} />
        <span className={`${style.dotItem} ${style.dotItemGreen}`} />
        <span className={`${style.dotItem} ${style.dotItemGreen}`} />
      </div>
    </div>
  );
};

export default BoardColumnHidden;
