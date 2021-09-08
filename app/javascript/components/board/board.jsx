import {formatRelative, subDays} from 'date-fns';
import React, {useState} from 'react';
import arrow from '../../images/undo_13';
import {getInitialsTitleBoard} from '../../utils/helpers';
import {locale} from '../../utils/format-date';
import style from './style.module.less';
import {GroupIcons} from './group-icons/group-icons';
import {MenuIcon} from './menu-icon/menu-icon';

const Board = ({
  board,
  setBoards,
  setModal,
  setHistoryBoards,
  historyBoards,
  users
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

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
    <div
      className={style.board}
      onClick={(event) => {
        event.stopPropagation();
        setIsOpenMenu(false);
      }}
    >
      <div className={style.header}>
        {renderBoardAvatar('', board.title)}
        <span className={style.title}>
          <a href={`/boards/${board.slug}`}>{board.title}</a>
        </span>
        {!historyBoards.length && (
          <MenuIcon
            historyBoards={historyBoards}
            setHistoryBoards={setHistoryBoards}
            setModal={setModal}
            setBoards={setBoards}
            isOpenMenu={isOpenMenu}
            setIsOpenMenu={setIsOpenMenu}
            boardSlug={board.slug}
          />
        )}
      </div>
      <div className={style.footer}>
        <span className={style.textDate}>
          <div style={backGroundArrow} className={style.arrowIcon}>
            <span>{numberСhanges}</span>
          </div>
          {formatRelative(
            subDays(new Date(board.created_at || board.createdAt), 0),
            new Date(),
            {
              locale
            }
          )}
        </span>
        <GroupIcons users={users} usersCount={board.usersCount} />
      </div>
    </div>
  );
};

export default Board;
