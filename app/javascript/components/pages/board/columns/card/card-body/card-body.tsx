import React, { useState } from "react";
import { useSelector } from "react-redux";
import { cardApi } from "../../../../../../api/card-api";
import { RootState } from "../../../../../../redux/store";
import { User } from "../../../../../../typings/user";
import { EditDropdown } from "../../../common/edit-dropdown/edit-dropdown";
import { CardUser } from "../card-user/card-user";
import style from "./style.module.less";
import styleButton from '../../../../../../less/button.module.less';
import Textarea from 'react-textarea-autosize';
import { handleKeyPress } from "../../../../../../utils/helpers";

type PropsType = {
  author: User
  id: number
  body: string
}

export const CardBody: React.FC<PropsType> = ({ author, id, body }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(body);
  const [showDropdown, setShowDropdown] = useState(false);
  const { currentUser } = useSelector(
    (state: RootState) => state.user
  );


  const handleDeleteClick = () => {
    setShowDropdown(false);
    cardApi.removeCard(id);
  };

  const handleEditClick = () => {
    editModeToggle();
    setShowDropdown(false);
  };

  const editModeToggle = () => {
    setEditMode(!editMode);
  };

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(evt.target.value);
  };

  const handleCancel = () => {
    setEditMode(false);
    setInputValue(body);
  };

  const handleSaveClick = (event: React.FormEvent) => {
    event.preventDefault();
    editModeToggle();
    cardApi.updateCard(id, inputValue)
  };




  return (
    <div className={style.cardBody}>
      <div className={style.top}>
        <CardUser {...author} />
        {author.id === currentUser?.id && (
          <EditDropdown
            setShowDropdown={setShowDropdown}
            showDropdown={showDropdown}
            editMode={editMode}
            editable={true}
            handleEditClick={handleEditClick}
            handleDelete={handleDeleteClick}
          />
        )}
      </div>
      {!editMode ? <div className={isHidden ? style.content : style.showContent}>{body}</div> :
        <form className={style.newCard} onSubmit={handleSaveClick}>
          <Textarea
            autoFocus
            className={style.textarea}
            value={inputValue}
            onChange={handleChange}
            onKeyDown={(evt) => handleKeyPress(evt, handleSaveClick, handleCancel)}
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
              type="submit"
            >
              post
            </button>
          </div>
        </form>
      }
      {isHidden
        ? body.length >= 155 && (
          <div className={style.text} onClick={() => setIsHidden(false)}>
            hide
          </div>
        )
        : body.length >= 155 && (
          <div className={style.text} onClick={() => setIsHidden(true)}>
            see more
          </div>
        )}
    </div>
  );
};
