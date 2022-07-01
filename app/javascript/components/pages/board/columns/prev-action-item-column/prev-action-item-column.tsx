import React from "react";

import style from "./style.module.less";

import { NavLink } from "react-router-dom";
import { BoardColumnHidden } from "../../common/board-column-hidden/board-column-hidden";
import { User } from "../../../../../typings/user";
import { ActionItemType } from "../../../../../typings/actionItem";
import { LinesForAction } from "../action/action-item-header/lines-for-action";
import ActionItem from "../action/action-item/action-item";

type PropsType = {
  users: User[]
  initItems?: ActionItemType[]
  handleToggleClick: () => void
  previousBoardSlug: string | null
  currentBoardSlug: string;
}

const PreviousActionItemColumn: React.FC<PropsType> = ({
  users,
  initItems,
  handleToggleClick,
  previousBoardSlug,
  currentBoardSlug
}) => {

  return (
    <>
      <div className={style.header}>
        <h2 className={style.title}>Past Actions</h2>
        {previousBoardSlug && (
          <NavLink to={`/board/${previousBoardSlug}`}>Previous retro</NavLink>
        )}
        <BoardColumnHidden toggleOpen={handleToggleClick} />
      </div>
      <LinesForAction prevActionItems={initItems} />
      {initItems?.map((item: ActionItemType) => (
        <ActionItem key={item.id} isPrevious users={users} currentBoardSlug={currentBoardSlug} {...item} />
      ))}
    </>
  );
};

export default PreviousActionItemColumn;
