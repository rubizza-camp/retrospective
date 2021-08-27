import {formatRelative, subDays} from 'date-fns';
import React from 'react';
import arrow from '../../images/undo_13';
import {getInitialsTitleBoard} from '../../utils/helpers';
import {locale} from '../../utils/format-date';
import style from './style.module.less';
import './style.less';
import {GroupIcons} from './group-icons/group-icons';
import {MenuIcon} from './menu-icon/menu-icon';

const BoardCard = ({board, users}) => {
  const renderBoardAvatar = (boardAvatar, title) => {
    if (boardAvatar) {
      return (
        <img src={boardAvatar} className={style.ava} alt="ava" title={title} />
      );
    }

    const classes = `${style.ava} ${style.avatarText} ${
      style[`avatar${board.id % 10}`]
    }`;

    return <div className={classes}>{getInitialsTitleBoard(title)}</div>;
  };

  const backGroundArrow = {
    backgroundImage: `url(${arrow})`
  };

  let numberСhanges = board.title.split('#')[1];
  if (!numberСhanges) numberСhanges = 1;

  return (
    <div className="board">
      <div className="board__header">
        {renderBoardAvatar('', board.title)}
        <a href={`/boards/${board.slug}`} className="title">
          <span>{board.title}</span>
        </a>
        <MenuIcon boardSlug={board.slug} />
      </div>
      <div className="board__footer">
        <span className="textDate">
          <div style={backGroundArrow} className="arrowIcon">
            <span>{numberСhanges}</span>
          </div>
          {formatRelative(subDays(new Date(board.updated_at), 0), new Date(), {
            locale
          })}
        </span>
        <GroupIcons users={users} />
      </div>
    </div>
  );
};

export default BoardCard;
