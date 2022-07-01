import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../redux/store";
import { ActionItemType } from "../../../../../../typings/actionItem";
import { User } from "../../../../../../typings/user";
import ActionItemHeader from "../action-item-header/action-item-header";
import ActionItem from "../action-item/action-item";
import NewActionItem from "../new-action-item/new-action-item";

type PropsType = {
  users: User[]
  initItems: ActionItemType[]
  handleToggleClick: () => void
  boardSlug: string
  nextBoardSlug: string | null
}

export const ActionItemColumn: React.FC<PropsType> = ({
  users,
  initItems,
  handleToggleClick,
  boardSlug,
  nextBoardSlug
}) => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  return (
    <>
      <ActionItemHeader
        nextBoardSlug={nextBoardSlug}
        actionItems={initItems}
        handleToggleClick={handleToggleClick}
      />
      {!!currentUser && <NewActionItem boardSlug={boardSlug} users={users} />}
      {initItems?.map((item: ActionItemType) => {
        return <ActionItem key={item.id} {...item} users={users} />;
      })}
    </>
  );
};
