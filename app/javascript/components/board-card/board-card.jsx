import {faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {formatRelative, subDays} from 'date-fns';
import React from 'react';
// Import { useMutation } from 'react-apollo';
import arrow from '../../images/undo_13';
import {getInitialsTitleBoard} from '../../utils/helpers';
import {GroupIcons} from './group-icons/group-icons';
import style from './board-card.module.less';
// Import { destroyBoardMutation } from './operations.gql';

const BoardCard = ({board, users}) => {
  // Const [destroyBoard] = useMutation(destroyBoardMutation)

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
          <div style={backGroundArrow} className={style.arrowIcon}>
            <span>?</span>
          </div>
          {formatRelative(subDays(new Date(board.updated_at), 0), new Date())}
        </span>
        <GroupIcons users={users} />
      </div>
    </div>
  );
};

export default BoardCard;
