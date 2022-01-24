import React from 'react';
import {Navigate, NavLink, Route, Routes, useNavigate} from 'react-router-dom';
import logo from '../../assets/images/logo';
import ActionItemsContainer from './action-items-container';
import BoardsContainer from './boards-container';
import {SettingsPage} from './settings-page/settings-page';
import './style.less';
import style from './style.module.css';
import {UserMenu} from './user-menu/user-menu';

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
          <Route exact path="/boards" element={<BoardsContainer />} />
          <Route exact path="/cards" element={<ActionItemsContainer />} />
          <Route
            exact
            path="/board/:boardSlug"
            element={
              <div style={{display: 'flex'}}>
                <NavLink
                  style={{margin: '20px'}}
                  to="/board/settings/:boardSlug"
                >
                  <div className={style.button}>Board settings</div>
                </NavLink>
              </div>
            }
          />
          <Route exact path="/settings" element={<SettingsPage />} />
          <Route
            exact
            path="/board/settings/:boardSlug"
            element={<h1> board settings</h1>}
          />
          <Route path="*" element={<Navigate to="/boards" />} />
        </Routes>
      </div>
    </div>
  );
};
