import React, {useRef, useState, useContext, useEffect} from 'react';
import EmojiPicker from 'emoji-picker-react';
import Textarea from 'react-textarea-autosize';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSmile} from '@fortawesome/free-regular-svg-icons';
import { Comment } from '../comment/comment';
import { IconProp } from "@fortawesome/fontawesome-svg-core";

// import { handleKeyPress } from '../../../utils/helpers';
import './style.less';
import { cardApi } from '../../api/card-api';

export const CommentsDropdown = ({id, comments, onClickClosed}: any) => {
  const controlElement = useRef<any>(null);
  const textInput = useRef<any>();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isError, setIsError] = useState(false);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    textInput.current && textInput?.current?.focus();
  }, []);

  const handleErrorSubmit = () => {
    setNewComment('');
    setIsError(true);
  };

  const handleSuccessSubmit = () => {
    setNewComment('');
    setIsError(false);
  };

  const handleSubmit = async () => {
    controlElement.current.disabled = true;
    try {
      const data = await cardApi.addComment({
        cardId: id,
        content: newComment
    });
      console.log(data)
      handleSuccessSubmit();
      
    } catch (error) {
      handleErrorSubmit();
    }
    controlElement.current.disabled = false;
    setShowEmojiPicker(false);
  };

  const handleSmileClick = () => {
    setShowEmojiPicker((isShown) => !isShown);
  };

  const handleEmojiPickerClick = (_: any, emoji: any) => {
    setNewComment((comment) => `${comment}${emoji?.emoji}`);
  };

  const handleCloseComments = () => {
    onClickClosed();
  };

  return (
    <div className="comments">
      <div className="comments__wrapper">
        {comments.map((item: any) => (
          <Comment
            key={item.id}
            id={item.id}
            comment={item}
            // editable={Boolean(user) && user.id === item.author.id}
          />
        ))}
      </div>
      {
        <>
          <div className="new-comment">
            <Textarea
              ref={textInput}
              className={`new-comment__textarea ${
                isError && 'new-comment__textarea--error'
              }`}
              value={newComment}
              onChange={(evt) => setNewComment(evt.target.value)}
              // onKeyDown={(evt) =>
              //   handleKeyPress(evt, handleSubmit, onClickClosed)
              // }
            />
            <a className="new-comment__smile" onClick={handleSmileClick}>
              <FontAwesomeIcon icon={faSmile as IconProp} />
            </a>
          </div>
          <div className="new-comment__buttons">
            <button
              type="button"
              className="new-comment__buttons__item new-comment__buttons__item--hide"
              onClick={handleCloseComments}
            >
              hide discussion
            </button>
            <button
              ref={controlElement}
              className="new-comment__buttons__item new-comment__buttons__item--add"
              type="button"
              onClick={handleSubmit}
            >
              post
            </button>
          </div>
          {showEmojiPicker && (
            <EmojiPicker onEmojiClick={handleEmojiPickerClick} />
          )}
        </>
      }
    </div>
  );
};
