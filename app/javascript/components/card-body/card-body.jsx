import React, {useEffect, useState} from 'react';
import Textarea from 'react-textarea-autosize';
import {useMutation} from '@apollo/react-hooks';
import {updateCardMutation, destroyCardMutation} from './operations.gql';
import {CardUser} from '../card-user';
import style from './style.module.less';
import styleButton from '../../less/button.module.less';
import {Linkify, linkifyOptions} from '../../utils/linkify';
import {handleKeyPress} from '../../utils/helpers';
import {CardEditDropdown} from '../card-edit-dropdown';

const CardBody = ({author, id, editable, body, deletable}) => {
  const [inputValue, setInputValue] = useState(body);
  const [editMode, setEditMode] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [editCard] = useMutation(updateCardMutation);
  const [destroyCard] = useMutation(destroyCardMutation);

  useEffect(() => {
    setInputValue(body);
  }, [body]);

  const handleEditClick = () => {
    editModeToggle();
    setShowDropdown(false);
  };

  const editModeToggle = () => {
    setEditMode((isEdited) => !isEdited);
  };

  const handleChange = (evt) => {
    setInputValue(evt.target.value);
  };

  const handleSaveClick = async () => {
    editModeToggle();
    const {data} = await editCard({
      variables: {
        id,
        body: inputValue
      }
    });

    if (!data.updateCard.card) {
      console.log(data.updateCard.errors.fullMessages.join(' '));
    }
  };

  const handleCancel = (evt) => {
    evt.preventDefault();
    setEditMode(false);
    setInputValue(body);
  };

  const handleDelete = async () => {
    const {data} = await destroyCard({
      variables: {
        id
      }
    });

    if (!data.destroyCard.id) {
      console.log(data.destroyCard.errors.fullMessages.join(' '));
    }
  };

  return (
    <div className={style.cardBody}>
      <div className={style.top}>
        <CardUser {...author} />

        {deletable && (
          <CardEditDropdown
            setShowDropdown={setShowDropdown}
            showDropdown={showDropdown}
            editMode={editMode}
            editable={editable}
            handleEditClick={handleEditClick}
            handleDelete={handleDelete}
          />
        )}
      </div>
      <div
        className={style.cardText}
        hidden={editMode}
        onDoubleClick={editable ? editModeToggle : undefined}
      >
        <Linkify options={linkifyOptions}> {body} </Linkify>
      </div>
      {editMode && (
        <>
          <Textarea
            autoFocus
            className={style.textarea}
            value={inputValue}
            onChange={handleChange}
            onKeyDown={(evt) => handleKeyPress(evt, handleSaveClick)}
          />
          <div className={styleButton.buttons}>
            <button
              className={styleButton.buttonCancel}
              type="button"
              onClick={handleCancel}
            >
              cancel
            </button>
            <button
              className={styleButton.buttonPost}
              type="button"
              onClick={handleSaveClick}
            >
              post
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CardBody;
