import {formatRelative, subDays} from 'date-fns';
import {enGB} from 'date-fns/locale';
import React from 'react';
import arrow from '../../images/undo_13';
import {getInitialsTitleBoard} from '../../utils/helpers';
import style from './board-card.module.less';
import {GroupIcons} from './group-icons/group-icons';
import {MenuIcon} from './menu-icon/menu-icon';

const BoardCard = ({board, users}) => {
  const formatRelativeLocale = {
    lastWeek: "'Last' eeee, 'at' HH:mm",
    yesterday: "'Yesterday', 'at' HH:mm",
    today: "'Today', 'at' HH:mm",
    tomorrow: "'Tomorrow', 'at' HH:mm",
    nextWeek: "'Next', 'at' eeee",
    other: "dd.MM.yyyy, 'at' HH:mm"
  };

  const locale = {
    ...enGB,
    formatRelative: (token) => formatRelativeLocale[token]
  };

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
    <div className={style.board}>
      <div className={style.header}>
        {renderBoardAvatar('', board.title)}
        <a href={`/boards/${board.slug}`} className={style.title}>
          <span>{board.title}</span>
        </a>
        <MenuIcon boardSlug={board.slug} />
      </div>
      <div className={style.footer}>
        <span className={style.textDate}>
          <div style={backGroundArrow} className={style.arrowIcon}>
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
