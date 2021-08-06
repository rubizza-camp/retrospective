import React, {useState, useEffect} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import EmojiPicker from 'emoji-picker-react';
import {CardUser} from '../card-user';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSmile} from '@fortawesome/free-regular-svg-icons';
import {Linkify, linkifyOptions} from '../../utils/linkify';
import style from './style.module.less';

const Comment = ({comment, editable}) => {
  const [editMode, setEditMode] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [inputValue, setInputValue] = useState(comment.content);

  useEffect(() => {
    if (inputValue !== comment.content) {
      setInputValue(comment.content);
    }
  }, [comment.content]);

  const editModeToggle = () => {
    setEditMode(!editMode);
  };

  const handleChange = (evt) => {
    setInputValue(evt.target.value);
  };

  const handleSmileClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiPickerClick = (_, emoji) => {
    setInputValue((comment) => `${comment}${emoji.emoji}`);
  };

  return (
    <>
      {!editMode && (
        <div
          className={style.comment}
          onDoubleClick={editable ? editModeToggle : undefined}
        >
          <div className="comment-user">
            <CardUser {...comment.author} />
          </div>
          <div className={style.commentText}>
            <Linkify options={linkifyOptions}> {comment.content} </Linkify>
          </div>
        </div>
      )}
      {editMode && (
        <>
          <TextareaAutosize
            value={inputValue}
            hidden={!editMode}
            onChange={handleChange}
          />
          <a className="has-text-info" onClick={handleSmileClick}>
            <FontAwesomeIcon icon={faSmile} />
          </a>
        </>
      )}
      {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiPickerClick} />}
    </>
  );
};

export default Comment;
