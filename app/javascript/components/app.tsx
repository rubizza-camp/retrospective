import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import ActionItemsContainer from './action-items-container';
import { BoardPage } from './board-page/board-page';
import BoardsContainer from './boards-container';
import { SettingsPage } from './settings-page/settings-page';
import { UserMenu } from './user-menu/user-menu';
import { RootState } from '../redux/store';
import { userApi } from './api/user-api';
import { actions } from '../redux/user/slice';
import './style.less';
import style from './style.module.less';

export const App = () => {
  const history = useNavigate();
  const dispatch = useDispatch()

  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    dispatch(actions.pending());
    try {
      userApi.getUser().then((user) => {
        dispatch(actions.setCurrentUser(user));
      });
    } catch {
      dispatch(actions.rejected());
    }
  }, []);

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
            <UserMenu />
          </div>
        </div>}
      <div>
        <Routes>
          <Route path="/boards" element={<BoardsContainer />} />
          <Route path="/cards" element={<ActionItemsContainer />} />
          <Route path="/board/:boardSlug" element={<BoardPage />} />
          <Route path="/settings" element={currentUser && <SettingsPage user={currentUser} />} />
          <Route path="*" element={<Navigate to="/boards" />} />
        </Routes>
      </div>
    </div>
  );
};
