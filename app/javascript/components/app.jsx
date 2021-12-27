import React from 'react';
import {Navigate, NavLink, Route, Routes} from 'react-router-dom';
import ActionItemsContainer from './action-items-container';
import BoardsContainer from './boards-container';
import style from './style.module.css';
import './style.less';

export const App = () => {
  return (
    <div>
      <div className={style.header}>
        <NavLink to="/">
          <div className={style.link}>CARDS</div>
        </NavLink>
        <NavLink to="/boards">
          <div className={style.link}> BOARDS </div>
        </NavLink>
        <NavLink to="/settings">
          <div className={style.link}> SETTINGS </div>
        </NavLink>
      </div>
      <div>
        <Routes>
          <Route exact path="/" element={<ActionItemsContainer />} />
          <Route
            exact
            path="/boards"
            element={<BoardsContainer role="creator" />}
          />
          <Route
            exact
            path="/board/:boardSlug"
            element={
              <div>
                <NavLink to="/settings:boardSlug">
                  <div className={style.link}> SETTINGS </div>
                </NavLink>
                /board/:boardSlug
              </div>
            }
          />
          <Route exact path="/settings" element={<div> settings</div>} />
          <Route
            exact
            path="/settings:boardSlug"
            element={<div> /settings:boardSlug</div>}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};
