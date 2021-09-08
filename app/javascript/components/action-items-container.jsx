import React from 'react';
import {getInitials} from '../utils/helpers';
import style from './board-card/style.module.less';
import './style.less';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const ActionItemsContainer = ({actionItems, actionItemsResolved}) => {
  console.log(actionItems);
  console.log(actionItemsResolved);

  const userIcon = [
    {
      id: 1,
      first_name: 'artem',
      last_name: 'gaev',
      avatar: {url: ''}
    },
    {
      id: 2,
      first_name: 'bob',
      last_name: 'rich',
      avatar: {url: ''}
    }
  ].map((user) => {
    const stylesForAvatarIcon = `${style.combatant} ${
      style[`avatar${user.id % 10}`]
    }`;

    if (user.avatar.url) {
      return (
        <img
          key={user.id}
          src={user.avatar.url}
          className={style.combatant}
          alt="ava"
        />
      );
    }

    return (
      <span key={user.id} className={style.avaContainer}>
        <span className={stylesForAvatarIcon}>
          {getInitials(user.first_name, user.last_name)}
        </span>
      </span>
    );
  });

  const actiomItemElement = [...actionItems, ...actionItemsResolved].map(
    (item) => {
      const generateChevrons = () => {
        const chevrons = Array.from({length: item.times_moved}, (_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={faChevronRight}
            size="sm"
            color="#ff000d"
            className="chevron-right"
          />
        ));
        return chevrons;
      };

      return (
        <div key={item.id} className="item">
          <div className="item__header">
            <div className="header__avatars">{userIcon}</div>
            <div className="header__title">Author Name</div>
            <div className="header__icon">{generateChevrons()}</div>
          </div>
          <div className="item__content">{item.body}</div>
          {item.status === 'pending' && (
            <div className="item__footer">
              <button type="button" onClick={() => alert('Complete')}>
                Complete
              </button>
              <button type="button" onClick={() => alert('Move to next week')}>
                Move to next week
                <span>{generateChevrons()}</span>
              </button>
              <span onClick={() => alert('Discard task')}>Discard task</span>
            </div>
          )}
        </div>
      );
    }
  );

  return <div className="items-container">{actiomItemElement}</div>;
};

export default ActionItemsContainer;
