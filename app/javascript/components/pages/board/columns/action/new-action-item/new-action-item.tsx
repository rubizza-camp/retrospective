import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { actionItemsApi } from "../../../../../../api/action-items-api";
import { RootState } from "../../../../../../redux/store";
import { User } from "../../../../../../typings/user";
import { CardUser } from "../../card/card-user/card-user";
import ActionItemEdit from "../action-item-edit/action-item-edit";
import style from "./style.module.less";

type PropsType = {
  users: User[]
  boardSlug: string
}

const NewActionItem: React.FC<PropsType> = ({ users, boardSlug }) => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [isOpened, setOpened] = useState(false);
  const [newActionItemBody, setNewActionItemBody] = useState("");
  const [newActionItemAssigneeId, setNewActionItemAssigneeId] = useState("");

  const cancelHandler = () => {
    setOpened(false);
    setNewActionItemBody("");
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await actionItemsApi.createActionItems(
      boardSlug,
      newActionItemAssigneeId,
      newActionItemBody
    );
    setNewActionItemBody("");
  };

  const currentAssignee = useMemo(
    () =>
      users?.find(
        (user: User) => user.id.toString() === newActionItemAssigneeId
      ),
    [newActionItemAssigneeId]
  );
  return (
    <div className={style.newActionItem}>
      {currentUser && <CardUser
        id={currentUser?.id}
        firstName={currentUser?.firstName}
        lastName={currentUser?.lastName}
        nickname={currentUser?.nickname}
        avatar={currentUser?.avatar}
      />}
      <ActionItemEdit
        users={users}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
        body={newActionItemBody}
        setBody={setNewActionItemBody}
        isOpened={isOpened}
        setOpened={setOpened}
        newActionItemAssigneeId={newActionItemAssigneeId}
        setNewActionItemAssigneeId={setNewActionItemAssigneeId}
        currentAssignee={currentAssignee}
        doNotAssign={() => {
          setNewActionItemAssigneeId("");
          setOpened(false);
        }}
      />
    </div>
  );
};

export default NewActionItem;
