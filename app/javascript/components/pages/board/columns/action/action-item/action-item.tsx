import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { actionItemsApi } from "../../../../../../api/action-items-api";
import { RootState } from "../../../../../../redux/store";
import { ACTION_ITEM_STATUS } from "../../../../../../typings/actionItem";
import { User } from "../../../../../../typings/user";
import { Linkify, linkifyOptions } from "../../../../../../utils/linkify";
import cardStyle from "../../card/card-body/style.module.less";
import styleCard from "../../card/style.module.less";
import { EditDropdown } from "../../../common/edit-dropdown/edit-dropdown";
import { CardUser } from "../../card/card-user/card-user";
import ActionItemAssignee from "../action-item-assigne/action-item-assignee";
import ActionItemEdit from "../action-item-edit/action-item-edit";
import ActionItemFooter from "../action-item-footer/action-item-footer";

type PropsType = {
  id: number
  body: string
  timesMoved: number
  assignee: User
  status: ACTION_ITEM_STATUS;
  users: User[]
  isPrevious?: boolean
  author: User;
  currentBoardSlug: string;
}

const ActionItem: React.FC<PropsType> = ({
  id,
  body,
  timesMoved,
  assignee,
  users,
  status,
  isPrevious,
  author,
  currentBoardSlug
}) => {
  const [actionItemBody, setActionItemBody] = useState(body);
  const [editMode, setEditMode] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [actionItemAssigneeId, setActionItemAssigneeId] = useState(
    assignee?.id ? `${assignee?.id}` : ''
  );

  useEffect(() => {
    if (!editMode) {
      setActionItemBody(body);
    }
  }, [body, editMode]);

  const handleDeleteClick = async () => {
    setShowDropdown(false);
    actionItemsApi.removeActionItems(id);
  };

  const handleEditClick = () => {
    editModeToggle();
    setShowDropdown(false);
  };

  const editModeToggle = () => {
    setEditMode(!editMode);
  };


  const handleSaveClick = () => {
    editModeToggle();
    actionItemsApi.updateActionItems(id, actionItemBody, actionItemAssigneeId)
  };

  const pickColorChevron = (number = 1) => {
    switch (true) {
      case [1, 2].includes(number):
        return "green";
      case [3].includes(number):
        return "yellow";
      default:
        return "red";
    }
  };


  const generateChevrons = () => {
    const chevrons = Array.from({ length: timesMoved }, (_, index) => (
      <i
        key={index}
        className={`fas fa-chevron-right ${pickColorChevron(timesMoved)}_font`}
      />
    ));
    return chevrons;
  };



  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const isStatusPending = status === 'pending';
  const editable = author?.id === currentUser?.id;
  const currentAssignee = useMemo(
    () =>
      users.find((user: User) => user.id.toString() === actionItemAssigneeId),
    [actionItemAssigneeId]
  );


  return (
    <div className={`${styleCard[status]} ${styleCard.card}`}>
      <div className={cardStyle.cardBody}>
        <div className={cardStyle.top}>
          {author && <CardUser {...author} />}

          <div className="card-chevrons">{generateChevrons()}</div>

          {editable && (
            <EditDropdown
              setShowDropdown={setShowDropdown}
              showDropdown={showDropdown}
              editMode={editMode}
              editable={editable}
              handleEditClick={handleEditClick}
              handleDelete={handleDeleteClick}
            />
          )}
        </div>

        {!editMode && (
          <div
            className={cardStyle.cardText}
            onDoubleClick={editable ? editModeToggle : undefined}
          >
            <Linkify options={linkifyOptions}> {body}</Linkify>
          </div>
        )}

        {editable && editMode && (
          <ActionItemEdit
            doNotAssign={() => setActionItemAssigneeId('')}
            users={users}
            submitHandler={handleSaveClick}
            cancelHandler={() => setEditMode(false)}
            body={actionItemBody}
            setBody={setActionItemBody}
            isOpened={editMode}
            setOpened={setEditMode}
            newActionItemAssigneeId={actionItemAssigneeId}
            setNewActionItemAssigneeId={setActionItemAssigneeId}
            currentAssignee={currentAssignee}
          />
        )}

        {assignee && (
          <ActionItemAssignee
            id={assignee.id}
            avatar={assignee.avatar?.thumb?.url}
            firstName={assignee.firstName}
            lastName={assignee.lastName}
            nickName={assignee.nickname}
          />
        )}
      </div>

      {Boolean(currentUser) && isPrevious && !editMode && (
        <ActionItemFooter
          id={id}
          isCompletable={isStatusPending}
          currentBoardSlug={currentBoardSlug}
        />
      )}
    </div>
  );
};

export default ActionItem;
