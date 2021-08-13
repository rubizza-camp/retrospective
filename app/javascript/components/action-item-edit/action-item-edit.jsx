import React from 'react';
import style from './style.module.less';
import Textarea from 'react-textarea-autosize';
import {ActionItemAssignee} from '../action-item-assigne';
import {CardUserAvatar} from '../card-user-avatar';

const ActionItemEdit = ({
  users,
  submitHandler,
  cancelHandler,
  body,
  setBody,
  handleKeyPress,
  isOpened,
  setOpened,
  newActionItemAssigneeId,
  setNewActionItemAssigneeId,
  currentAssignee,
  doNotAssign
}) => {
  return (
    <form onSubmit={submitHandler}>
      <Textarea
        autoFocus
        className={style.newActionItemInput}
        value={body}
        placeholder="Let’s do something about it"
        onChange={(evt) => setBody(evt.target.value)}
        onKeyDown={handleKeyPress}
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
            {users.map((user) => {
              return (
                <li
                  key={user.id}
                  data-user={user.id}
                  className={style.selectItem}
                  onClick={(evt) => {
                    setNewActionItemAssigneeId(evt.currentTarget.dataset.user);
                  }}
                >
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                  <CardUserAvatar
                    avatar={user.avatar?.thumb?.url}
                    firstName={user.firstName}
                    lastName={user.lastName}
                  />
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

      {newActionItemAssigneeId && (
        <ActionItemAssignee
          firstName={currentAssignee.firstName}
          lastName={currentAssignee.lastName}
          avatar={currentAssignee.avatar?.thumb?.url}
        />
      )}

      <div className={style.newActionItemButtons}>
        <button
          className={`${style.button} ${style.newActionItemSave}`}
          type="submit"
          onSubmit={submitHandler}
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
