import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { CardComment } from "../../../../../../typings/board";
import { CardUser } from "../card-user/card-user";
import style from "./style.module.less";
// import Likes from '../likes/likes';


type PropsType = {
  id: number
  comment: CardComment
  editable: boolean
}

export const Comment: React.FC<PropsType> = ({ id, comment, editable }) => {  //! fix
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(comment.content);

  const handleChange = (evt:any) => {
    setInputValue(evt.target.value);
  };

  const handleItemEdit = async () => {
    // const {data} = await updateComment({
    //   variables: {
    //     id,
    //     content
    //   }
    // });
    // if (data.updateActionItem.actionItem) {
    //   setInputValue(content);
    // }
    // if (!data.updateActionItem.actionItem) {
    //   resetTextChanges();
    //   console.log(data.updateActionItem.errors.fullMessages.join(' '));
    // }
  };

  const handleSaveClick = () => {
    // setEditMode(false);
    // handleItemEdit(id, inputValue);
  };

  const resetTextChanges = () => {
    // setEditMode(false);
    // setInputValue(comment.content);
  };

  const handleDeleteClick = async () => {
    // const {data} = await destroyComment({
    //   variables: {
    //     id
    //   }
    // });
    // if (!data.destroyComment.id) {
    //   console.log(data.destroyComment.errors.fullMessages.join(' '));
    // }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  return (
    <>
      <div className="comment-user">
        <CardUser {...comment.author} />
      </div>
      <div className={style.commentBlock}>
        {editMode ? (
          <>
            <TextareaAutosize
              className={style.commentInput}
              value={inputValue}
              onChange={handleChange}
            />
            <div className={style.commentButtons}>
              <button type="button" onClick={handleSaveClick}>
                Save
              </button>
              <button type="button" onClick={resetTextChanges}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={style.commentText}>{comment.content}</div>
            {editable && (
              <div className={style.commentButtons}>
                <button type="button" onClick={handleEditClick}>
                  Edit
                </button>
                <button type="button" onClick={handleDeleteClick}>
                  Delete
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
