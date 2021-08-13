import React from 'react';
import style from './board-card.module.less';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons';

const useGettingDateTime = (dateData) => {
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  const date = new Date(dateData);

  const day = days[date.getDay() - 1];
  let hour = date.getHours();
  let minute = date.getMinutes();

  hour = hour < 10 ? '0' + hour : hour;
  minute = minute < 10 ? '0' + minute : minute;

  return {day, hour, minute};
};

const GroupIcons = (props) => {
  const element = [...new Array(props.board.users_count)].map((index) => {
    const colors = [
      '#DB6622',
      '#DBAA22',
      '#85DB22',
      '#22DB8B',
      '#22DBCF',
      '#22A3DB',
      '#6C22DB',
      '#B022DB',
      '#DB22C2',
      '#DB229D'
    ];
    const selfRandom = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const getBigFirstLetters = (string) => {
      return (
        String(string).toUpperCase().charAt(0) +
        String(string).toUpperCase().charAt(1)
      );
    };

    const getInitials = (title) => {
      return title ? getBigFirstLetters(title) : '';
    };

    return (
      <span key={index} className={style.avaContainer}>
        <span
          style={{
            backgroundColor: colors[selfRandom(0, 9)],
            color: 'white'
          }}
          className={style.combatant}
        >
          {getInitials(props.board.title)}
        </span>
      </span>
    );
  });

  return (
    <div className={style.card}>
      <div className={style.cardBottom}>
        <div className={style.avatarGroup}>
          {element}
          <span className={style.avaAddCount}>
            <span style={{fontSize: '20px'}} className={style.combatant}>
              {props.board.users_count}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

const BoardCard = (props) => {
  const {day, hour, minute} = useGettingDateTime(props.board.updated_at);

  const getBigFirstLetters = (string) => {
    return string.toUpperCase().charAt(0) + string.toUpperCase().charAt(1);
  };

  const getCardInitials = (title) => {
    return title ? getBigFirstLetters(title) : '';
  };

  const renderCardAvatar = (cardAvatar, title) => {
    if (cardAvatar) {
      return (
        <img
          src={cardAvatar} //! пока стоит заглушка
          className={style.ava}
          alt="ava"
          title={title}
        />
      );
    }

    const classes = `${style.ava} ${style.avatarText}
  ${style[`avatar-${props.board.id % 10}`]}`;

    return <div className={classes}>{getCardInitials(title)}</div>;
  };

  return (
    <div className={style.app}>
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '80%'
        }}
      >
        {renderCardAvatar('', props.board.title)}
        {/* //! пустую строку нужно будет заменить на Url аватарки */}
        <div className={style.title}>
          <span>{props.board.title}</span>
        </div>
        <div
          style={{
            height: '30%',
            display: 'flex'
          }}
        >
          <FontAwesomeIcon icon={faEllipsisH} size="lg" color="#C6C6C4" />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginRight: '5%'
        }}
      >
        <span
          className={style.textDate}
        >{`Last ${day}, at ${hour}:${minute}`}</span>
        <GroupIcons board={props.board} />
      </div>
    </div>
  );
};

export default BoardCard;
