import React from "react";
import style from "./style.module.less";
import { LinesForAction } from "../../columns/action/action-item-header/lines-for-action";
import { ActionItemType } from "../../../../../typings/actionItem";

type PropsType = {
  toggleOpen: () => void
  isLeft?: boolean
  items?: ActionItemType[]
}

export const BoardColumnHidden: React.FC<PropsType> = ({ toggleOpen, isLeft, items }) => {
  return (
    <div className={`${style.sideMenu} ${isLeft && style.sideMenuLeft}`}>
      <button
        type="button"
        className={`${style.openButton} ${!isLeft && style.openButtonRotated}`}
        onClick={toggleOpen}
      >
        <svg
          width="15"
          height="10"
          viewBox="0 0 5 10"
          fill="black"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 9L4.5 5L0.5 1"
            stroke="#C6C6C4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {items && <LinesForAction hiddenActionItem={true} prevActionItems={items} />}
    </div>
  );
};
