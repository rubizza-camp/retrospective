import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const MenuIcon = ({
  role,
  setIsOpenMenu,
  isOpenMenu,
  historyBoard,
  deleteBoard,
  continueBoard,
}) => {
  const onClickHandler = (event) => {
    event.stopPropagation();
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <div onMouseLeave={() => setIsOpenMenu(false)}>
      <div className="menu-button" onClick={onClickHandler}>
        <FontAwesomeIcon icon={faEllipsisH} size="lg" color="#C6C6C4" />
      </div>
      <div className={isOpenMenu ? "opened" : "closed"}>
        <ul>
          {role === "creator" && (
            <li className="list-item" onClick={continueBoard}>
              Continue
            </li>
          )}
          <li className="list-item" onClick={historyBoard}>
            History
          </li>
          {role === "creator" && (
            <li className="list-item" onClick={deleteBoard}>
              Delete
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
