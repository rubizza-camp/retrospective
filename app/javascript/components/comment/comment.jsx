import React, {useState} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import {CardUser} from '../card-user';
import {Linkify, linkifyOptions} from '../../utils/linkify';
import style from './style.module.less';
import {destroyCommentMutation, updateCommentMutation} from './operations.gql';
import {useMutation} from '@apollo/react-hooks';
import Likes from '../likes/likes';

const Comment = ({id, comment, editable}) => {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(comment.content);
  const [destroyComment] = useMutation(destroyCommentMutation);
  const [updateComment] = useMutation(updateCommentMutation);

  const handleChange = (evt) => {
    setInputValue(evt.target.value);
  };

  const handleItemEdit = async (id, content) => {
    const {data} = await updateComment({
      variables: {
        id,
        content
      }
    });
    if (data.updateActionItem.actionItem) {
      setInputValue(content);
    }

    if (!data.updateActionItem.actionItem) {
      resetTextChanges();
      console.log(data.updateActionItem.errors.fullMessages.join(' '));
    }
  };

  const handleSaveClick = () => {
    setEditMode(false);
    handleItemEdit(id, inputValue);
  };

  const resetTextChanges = () => {
    setEditMode(false);
    setInputValue(comment.content);
  };

  const handleDeleteClick = async () => {
    const {data} = await destroyComment({
      variables: {
        id
      }
    });
    if (!data.destroyComment.id) {
      console.log(data.destroyComment.errors.fullMessages.join(' '));
    }
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
            <div className={style.commentText}>
              <Linkify options={linkifyOptions}>{comment.content}</Linkify>
              <div className={style.commentLike}>
                <Likes id={comment.id} likes={comment.likes} />
              </div>
            </div>
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

export default Comment;
