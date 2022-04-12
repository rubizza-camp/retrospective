import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCog, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../typings/user";
import { getFullnameOrNickname } from '../../utils/helpers';
import { Avatar } from "../avatar/avatar";
import style from "./style.module.less";
type PropsType = {
  user: User
}

export const UserMenu: React.FC<PropsType> = ({ user }) => {
  const history = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <div
      onMouseLeave={() => {
        setIsOpenMenu(false);
      }}
    >
      {user && <div
        className={style.userMenu}
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      >
        <div className={style.userName}>
          {getFullnameOrNickname(
            user.firstName,
            user.lastName,
            user.nickname
          )}
        </div>
        <Avatar
          isSquare
          avatar={user.avatar.url}
          id={user.id}
          firstName={user.firstName}
          lastName={user.lastName}
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
