import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import style from "./style.module.less";
import logo from "../../../../assets/images/logo.png";
import { UserMenu } from '../user-menu/user-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faCog, faPlus } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Avatar } from '../avatar/avatar';
import { BoardType } from '../../../typings/board';

type PropsType = {
  board?: BoardType
  setBoardSettingOpen?: (value: boolean) => void
};

export const Header: React.FC<PropsType> = ({ board, setBoardSettingOpen }) => {

  const history = useNavigate();

  return (
    <>
      {!window.location.pathname.includes("/board/") && (
        <div className={style.header}>
          <img
            className={style.logo}
            src={logo}
            alt="logo"
            onClick={() => history("/boards")}
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
        </div>)}
      {board && setBoardSettingOpen && (<div className={style.header}>
        <div>
          <div className={style.boardInfo}>
            <FontAwesomeIcon
              icon={faAngleLeft as IconProp}
              size="lg"
              color="#474343"
              className={style.icon}
              onClick={() => history("/boards")}
            />
            <Avatar
              isSquare
              avatar=""
              id={board.id}
              firstName={board.title}
            />
            <div style={{ marginLeft: "10px" }}>
              <div>
                {board.title}
                <FontAwesomeIcon
                  icon={faCog as IconProp}
                  size="sm"
                  color="gray"
                  className={style.icon}
                  onClick={() =>
                    setBoardSettingOpen(true)
                  }
                />
              </div>
              <div className={style.boardCount}>#{board.boardsCount}</div>
            </div>
          </div>
        </div>
        <div className={style.users}>
          {board.users.map((user) => {
            return (
              <Avatar
                width={48}
                height={48}
                key={user.id}
                isSquare={false}
                avatar={user.avatar?.url}
                id={user.id}
                firstName={user.firstName}
                lastName={user.lastName}
              />
            );
          })}
          <FontAwesomeIcon
            icon={faPlus as IconProp}
            size="2x"
            color="gray"
            className={style.icon}
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("ссылка для приглашения скопирована!");
            }}
          />
        </div>
        <UserMenu />
      </div>)}
    </>
  )
}
