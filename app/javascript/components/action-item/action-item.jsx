import React, {useContext, useState, useEffect, useMemo} from 'react';
import {
  destroyActionItemMutation,
  updateActionItemMutation
} from './operations.gql';
import {useMutation} from '@apollo/react-hooks';
import {Linkify, linkifyOptions} from '../../utils/linkify';
import {CardUser} from '../card-user';
import cardStyle from '../card-body/style.module.less';
import {ActionItemFooter} from '../action-item-footer';
import {ActionItemAssignee} from '../action-item-assigne';
import UserContext from '../../utils/user-context';
import style from './style.module.less';
import styleCard from '../card/style.module.less';
import {ActionItemEdit} from '../action-item-edit';
import {handleKeyPress} from '../../utils/helpers';
import {CardEditDropdown} from '../card-edit-dropdown';

const ActionItem = ({
  id,
  body,
  status,
  timesMoved,
  assignee,
  users,
  isPrevious,
  author
}) => {
  const [actionItemBody, setActionItemBody] = useState(body);
  const [editMode, setEditMode] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [actionItemAssigneeId, setActionItemAssigneeId] = useState(
    assignee?.id
  );
  const [destroyActionItem] = useMutation(destroyActionItemMutation);
  const [updateActionItem] = useMutation(updateActionItemMutation);

  useEffect(() => {
    if (!editMode) {
      setActionItemBody(body);
    }
  }, [body, editMode]);

  const handleDeleteClick = async () => {
    setShowDropdown(false);
    const {data} = await destroyActionItem({
      variables: {
        id
      }
    });
    if (!data.destroyActionItem.id) {
      console.log(data.destroyActionItem.errors.fullMessages.join(' '));
    }
  };

  const handleEditClick = () => {
    editModeToggle();
    setShowDropdown(false);
  };

  const editModeToggle = () => {
    setEditMode(!editMode);
  };

  const resetTextChanges = () => {
    setActionItemBody(body);
  };

  const handleEnterClick = () => {
    editModeToggle();
    handleItemEdit(id, actionItemBody);
  };

  const handleItemEdit = async (id, body) => {
    const {data} = await updateActionItem({
      variables: {
        id,
        body,
        assigneeId: actionItemAssigneeId
      }
    });

    if (!data.updateActionItem.actionItem) {
      resetTextChanges();
      console.log(data.updateActionItem.errors.fullMessages.join(' '));
    }
  };

  const handleSaveClick = () => {
    editModeToggle();
    handleItemEdit(id, actionItemBody);
  };

  const pickColorChevron = (number) => {
    switch (true) {
      case [1, 2].includes(number):
        return 'green';
      case [3].includes(number):
        return 'yellow';
      default:
        return 'red';
    }
  };

  const generateChevrons = () => {
    const chevrons = Array.from({length: timesMoved}, (_, index) => (
      <i
        key={index}
        className={`fas fa-chevron-right ${pickColorChevron(timesMoved)}_font`}
      />
    ));
    return chevrons;
  };

  const pickColor = (number, isColor) => {
    if (isColor) {
      switch (number) {
        case 0:
          return style.green;
        case 1:
          return style.green;
        case 2:
          return style.green;
        case 3:
          return style.yellow;
        default:
          return style.red;
      }
    } else {
      return ``;
    }
  };

  const currentUser = useContext(UserContext);
  const isStatusPending = status === 'pending';
  const editable = currentUser.isCreator;
  const currentAssignee = useMemo(
    () => users.find((user) => user.id.toString() === actionItemAssigneeId),
    [actionItemAssigneeId, users]
  );

  return (
    <div className={`${pickColor(timesMoved, isPrevious)} ${styleCard.card}`}>
      <div className={cardStyle.cardBody}>
        <div className={cardStyle.top}>
          {author && <CardUser {...author} />}

          <div className="card-chevrons">{generateChevrons()}</div>

          {editable && (
            <CardEditDropdown
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
            users={users}
            submitHandler={handleSaveClick}
            cancelHandler={() => setEditMode(false)}
            body={actionItemBody}
            setBody={setActionItemBody}
            handleKeyPress={(evt) => handleKeyPress(evt, handleEnterClick)}
            isOpened={editMode}
            setOpened={setEditMode}
            newActionItemAssigneeId={actionItemAssigneeId}
            setNewActionItemAssigneeId={setActionItemAssigneeId}
            currentAssignee={currentAssignee || assignee}
          />
        )}

        {assignee && (
          <ActionItemAssignee
            avatar={assignee.avatar?.thumb?.url}
            firstName={assignee.firstName}
            lastName={assignee.lastName}
          />
        )}
      </div>

      {isPrevious && !editMode && (
        <ActionItemFooter
          id={id}
          isReopanable={currentUser.isCreator && !isStatusPending}
          isCompletable={currentUser.isCreator && isStatusPending}
        />
      )}
    </div>
  );
};

export default ActionItem;
