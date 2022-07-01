import React from "react";
import { BoardColumnHidden } from "../../../common/board-column-hidden/board-column-hidden";

import style from "./style.module.less";
import { LinesForAction } from "./lines-for-action";
import { ActionItemType } from "../../../../../../typings/actionItem";
import { NavLink } from "react-router-dom";

type PropsType = {
  handleToggleClick: () => void
  actionItems: ActionItemType[]
  nextBoardSlug: string | null
}

const ActionItemHeader: React.FC<PropsType> = ({ handleToggleClick, actionItems, nextBoardSlug }) => {
  return (
    <>
      <div className={style.header}>
        <BoardColumnHidden isLeft toggleOpen={handleToggleClick} />
        {nextBoardSlug && (
          <NavLink to={`/board/${nextBoardSlug}`}>Next retro</NavLink>
        )}
        <h2 className={style.title}>ACTION ITEMS</h2>
      </div>
      <LinesForAction actionItems={actionItems} />
    </>
  );
};

export default ActionItemHeader;
