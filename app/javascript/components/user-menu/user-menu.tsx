import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCog, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { getFullnameOrNickname } from '../../utils/helpers';
import { Avatar } from "../avatar/avatar";
import { RootState } from '../../redux/store';
import style from "./style.module.less";


export const UserMenu: React.FC = () => {
  const history = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);


  return (
    <div
      onMouseLeave={() => {
        setIsOpenMenu(false);
      }}
    >
      {currentUser && <div
        className={style.userMenu}
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      >
        <div className={style.userName}>
          {getFullnameOrNickname(
            currentUser.firstName,
            currentUser.lastName,
            currentUser.nickname
          )}
        </div>
        <Avatar
          isSquare
          avatar={currentUser.avatar.url}
          id={currentUser.id}
          firstName={currentUser.firstName}
          lastName={currentUser.lastName}
        />
      </div>}
      <div className={isOpenMenu ? `${style.opened} opened` : "closed"}>
        <ul>
          <li
            className="list-item"
            onClick={() => {
              history("settings");
              setIsOpenMenu(false);
            }}
          >
            <FontAwesomeIcon
              icon={faCog as IconProp}
              size="sm"
              color="#474343"
              style={{ marginRight: "12px" }}
            />
            Settings
          </li>
          <li
            className="list-item"
            onClick={() => {
              setIsOpenMenu(false);
              document.getElementById("logoutBtn")?.click()
            }}
          >
            <FontAwesomeIcon
              icon={faSignInAlt as IconProp}
              size="sm"
              color="#474343"
              style={{ marginRight: "12px" }}
            />
            Log out
          </li>
        </ul>
      </div>
    </div>
  );
};
