import React from "react";
import Textarea from "react-textarea-autosize";
import { User } from "../../../../../../typings/user";
import { getFullnameOrNickname } from "../../../../../../utils/helpers";
import { Avatar } from "../../../../../common/avatar/avatar";
import ActionItemAssignee from "../action-item-assigne/action-item-assignee";
import style from "./style.module.less";

type PropsType = {
  users: User[]
  submitHandler: (event: React.FormEvent<HTMLFormElement>) => void
  cancelHandler: () => void
  body: string
  setBody: (body: string) => void
  isOpened: boolean
  setOpened: (isOpened: boolean) => void
  newActionItemAssigneeId: string
  setNewActionItemAssigneeId: (id: string) => void
  currentAssignee?: User
  doNotAssign: () => void
}

const ActionItemEdit: React.FC<PropsType> = ({
  users,
  submitHandler,
  cancelHandler,
  body,
  setBody,
  isOpened,
  setOpened,
  newActionItemAssigneeId,
  setNewActionItemAssigneeId,
  currentAssignee,
  doNotAssign,
}) => {
  return (
    <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => submitHandler(event)}>
      <Textarea
        autoFocus
        className={style.newActionItemInput}
        value={body}
        placeholder="Let’s do something about it"
        onChange={(evt) => setBody(evt.target.value)}
      />

      {isOpened ? (
        <>
          <button
            type="button"
            className={`${style.button} ${style.newActionItemCancel}`}
            onClick={doNotAssign}
          >
            Do not assign
          </button>
          <ul className={style.select}>
            {users?.map((user: User) => {
              return (
                <li
                  key={user.id}
                  data-user={user.id}
                  className={style.selectItem}
                  onClick={(evt) => {
                    if (evt.currentTarget.dataset.user) {
                      setNewActionItemAssigneeId(evt.currentTarget.dataset.user)
                    }
                  }}
                >
                  <span>
                    {getFullnameOrNickname(
                      user.firstName,
                      user.lastName,
                      user.nickname
                    )}
                  </span>
                  <div className={style.ava}>
                    <Avatar
                      id={user.id}
                      isSquare={false}
                      avatar={user.avatar?.url}
                      firstName={user.firstName}
                      lastName={user.lastName}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <button
          className={`${style.button} ${style.newActionItemCancel}`}
          type="button"
          onClick={() => setOpened(true)}
        >
          Assign?
        </button>
      )}

      {newActionItemAssigneeId && currentAssignee && (
        <ActionItemAssignee
          firstName={currentAssignee.firstName}
          lastName={currentAssignee.lastName}
          nickName={currentAssignee.nickname}
          avatar={currentAssignee.avatar?.url}
          id={currentAssignee.id}
        />
      )}

      <div className={style.newActionItemButtons}>
        <button
          className={`${style.button} ${style.newActionItemSave}`}
          type="submit"
        >
          Add
        </button>
        <button
          className={`${style.button} ${style.newActionItemCancel}`}
          type="reset"
          onClick={cancelHandler}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ActionItemEdit;
