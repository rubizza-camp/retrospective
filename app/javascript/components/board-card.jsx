import {faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {formatRelative, subDays} from 'date-fns';
import React from 'react';
import {getInitialsTitleBoard} from '../utils/helpers';
import style from './board-card.module.less';
import {GroupIcons} from './group-icons/group-icons';
import arrow from '../../assets/images/undo_13';

const BoardCard = ({board, boards}) => {
  const renderBoardAvatar = (boardAvatar, title) => {
    if (boardAvatar) {
      return (
        <img src={boardAvatar} className={style.ava} alt="ava" title={title} />
      );
    }

    console.log(boards);

    const classes = `${style.ava} ${style.avatarText} ${
      style[`avatar${board.id % 10}`]
    }`;

    return <div className={classes}>{getInitialsTitleBoard(title)}</div>;
  };

  const ar = {
    backgroundImage: `url(${arrow})`
  };

  return (
    <div className={style.board}>
      <div className={style.header}>
        {renderBoardAvatar('', board.title)}
        <div className={style.title}>
          <span>{board.title}</span>
        </div>
        <div className={style.ellipsisIcon}>
          <FontAwesomeIcon icon={faEllipsisH} size="lg" color="#C6C6C4" />
        </div>
      </div>
      <div className={style.footer}>
        <span className={style.textDate}>
          <div style={ar} className={style.arrowIcon}>
            <span>9</span>
          </div>
          {formatRelative(subDays(new Date(board.updated_at), 0), new Date())}
        </span>
        <GroupIcons board={board} />
      </div>
    </div>
  );
};

export default BoardCard;
