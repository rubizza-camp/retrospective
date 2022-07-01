import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type Props = {
  role: string;
  isOpenMenu: boolean;
  setIsOpenMenu: (isOpenMenu: boolean) => void;
  setMenuButtonVisisble: (isMenuButtonVisisble: boolean) => void;
  historyBoard: () => void;
  deleteBoard: () => void;
  continueBoard: () => void;
};

export const MenuIcon: React.FC<Props> = ({
  role,
  setIsOpenMenu,
  isOpenMenu,
  historyBoard,
  deleteBoard,
  continueBoard,
  setMenuButtonVisisble,
}) => {
  const onClickHandler = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <div
      onMouseLeave={(e) => {
        e.stopPropagation();
        setIsOpenMenu(false);
        setMenuButtonVisisble(false);
      }}
    >
      <div className="menu-button" onClick={onClickHandler}>
        <FontAwesomeIcon
          icon={faEllipsisH as IconProp}
          size="lg"
          color="#C6C6C4"
        />
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
