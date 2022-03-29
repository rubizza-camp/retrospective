import React, { useEffect, useState } from 'react';
import { Navigate, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { User } from '../typings/user';
import ActionItemsContainer from './action-items-container';
import { userApi } from './api/user-api';
import { BoardPage } from './board-page/board-page';
import BoardsContainer from './boards-container';
import { SettingsPage } from './settings-page/settings-page';
import './style.less';
import style from './style.module.less';
import { UserMenu } from './user-menu/user-menu';

export const App = () => {
  const history = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    userApi.getUser().then((response) => {
      setUser(response)
    });
  }, [])

  return (
    <div>
      {!window.location.pathname.includes('/board/') &&
        <div className={style.header}>
          <img
            className={style.logo}
            src={logo}
            alt="logo"
            onClick={() => history('/boards')}
          />
          <div className={style.buttons}>
            <NavLink to="/boards">
              <div className={style.button}> Boards</div>
            </NavLink>
            <NavLink to="/cards">
              <div className={style.button}>Cards</div>
            </NavLink>
          </div>
          <div>
            {user && <UserMenu user={user} />}
          </div>
        </div>}
      <div>
        <Routes>
          <Route path="/boards" element={<BoardsContainer />} />
          <Route path="/cards" element={<ActionItemsContainer />} />
          <Route path="/board/:boardSlug" element={user && <BoardPage user={user} />} />
          <Route path="/settings" element={user && <SettingsPage user={user} setUser={setUser} />} />
          <Route path="*" element={<Navigate to="/boards" />} />
        </Routes>
      </div>
    </div>
  );
};
