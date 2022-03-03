import React from 'react';
import { Navigate, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import ActionItemsContainer from './action-items-container';
import BoardsContainer from './boards-container';
import { SettingsPage } from './settings-page/settings-page';
import './style.less';
import style from './style.module.less';
import { UserMenu } from './user-menu/user-menu';

export const App = () => {
  const history = useNavigate();
  return (
    <div>
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
          <UserMenu />
        </div>
      </div>
      <div>
        <Routes>
          <Route path="/boards" element={<BoardsContainer />} />
          <Route path="/cards" element={<ActionItemsContainer />} />
          <Route
            path="/board/:boardId"
            element={
              <div style={{ display: 'flex' }}>
                <NavLink
                  style={{ margin: '20px' }}
                  to="/board/settings/:boardId"
                >
                  <div className={style.button}>Board settings</div>
                </NavLink>
              </div>
            }
          />
          <Route path="/settings" element={<SettingsPage />} />
          <Route
            path="/board/settings/:boardId"
            element={<h1> board settings</h1>}
          />
          <Route path="*" element={<Navigate to="/boards" />} />
        </Routes>
      </div>
    </div>
  );
};
