import React, {useRef, useState, useContext, useEffect} from 'react';
import EmojiPicker from 'emoji-picker-react';
import Textarea from 'react-textarea-autosize';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSmile} from '@fortawesome/free-regular-svg-icons';
import UserContext from '../../utils/user-context';
import {Comment} from '../comment';
import {useMutation} from '@apollo/react-hooks';
import {addCommentMutation} from './operations.gql';
import {handleKeyPress} from '../../utils/helpers';
import './style.less';

const CommentsDropdown = ({id, comments, onClickClosed}) => {
  const controlElement = useRef(null);
  const textInput = useRef();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isError, setIsError] = useState(false);
  const user = useContext(UserContext);
  const [newComment, setNewComment] = useState('');
  const [addComment] = useMutation(addCommentMutation);

  useEffect(() => {
    textInput.current.focus();
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
    const {data} = await addComment({
      variables: {
        cardId: id,
        content: newComment
      }
    });

    if (data.addComment.comment) {
      handleSuccessSubmit();
    } else {
      console.log(data.addComment.errors.fullMessages.join(' '));
      handleErrorSubmit();
    }

    controlElement.current.disabled = false;
    setShowEmojiPicker(false);
  };

  const handleSmileClick = () => {
    setShowEmojiPicker((isShown) => !isShown);
  };

  const handleEmojiPickerClick = (_, emoji) => {
    setNewComment((comment) => `${comment}${emoji.emoji}`);
  };

  return (
    <div className="comments">
      <div className="comments__wrapper">
        {comments.map((item) => (
          <Comment
            key={item.id}
            id={item.id}
            comment={item}
            editable={user.id === item.author.id}
          />
        ))}
      </div>
      <div className="new-comment">
        <Textarea
          ref={textInput}
          className={`new-comment__textarea ${
            isError && 'new-comment__textarea--error'
          }`}
          value={newComment}
          onChange={(evt) => setNewComment(evt.target.value)}
          onKeyDown={(evt) => handleKeyPress(evt, handleSubmit, onClickClosed)}
        />
        <a className="new-comment__smile" onClick={handleSmileClick}>
          <FontAwesomeIcon icon={faSmile} />
        </a>
      </div>
      <div className="new-comment__buttons">
        <button
          type="button"
          className="new-comment__buttons__item new-comment__buttons__item--hide"
          onClick={() => onClickClosed()}
        >
          hide discussion
        </button>
        <button
          ref={controlElement}
          className="new-comment__buttons__item new-comment__buttons__item--add"
          type="button"
          onClick={() => handleSubmit(newComment)}
        >
          post
        </button>
      </div>
      {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiPickerClick} />}
    </div>
  );
};

export default CommentsDropdown;
