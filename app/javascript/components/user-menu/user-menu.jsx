import {faCog, faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Avatar} from '../avatar/avatar';
import style from './style.module.css';

export const UserMenu = () => {
  const history = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <div
      onMouseLeave={() => {
        setIsOpenMenu(false);
      }}
    >
      <div
        className={style.userMenu}
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      >
        <div className={style.userName}>Name user</div>
        <Avatar
          isSquare
          avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqHEFKxyLryJi0Xsr6eXPOR8dPmRF_fFdN1w&usqp=CAU"
          id={2}
          firstName="firstName"
          lastName="lastName"
        />
      </div>
      <div className={isOpenMenu ? style.openMenu : style.items}>
        <div
          className={style.item}
          onClick={() => {
            history('settings');
            setIsOpenMenu(false);
          }}
        >
          <FontAwesomeIcon
            icon={faCog}
            size="sm"
            color="#474343"
            style={{marginRight: '12px'}}
          />
          Settings
        </div>
        <div
          className={style.item}
          onClick={() => {
            setIsOpenMenu(false);
            alert('log out');
          }}
        >
          <FontAwesomeIcon
            icon={faSignInAlt}
            size="sm"
            color="#474343"
            style={{marginRight: '12px'}}
          />
          Log out
        </div>
      </div>
    </div>
  );
};
