import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmojiPicker, { IEmojiData } from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Textarea from "react-textarea-autosize";
import { cardApi } from "../../../../../../../api/card-api";
import { RootState } from "../../../../../../../redux/store";
import { CardComment } from "../../../../../../../typings/board";
import { handleKeyPress } from "../../../../../../../utils/helpers";
import { Comment } from "../comment";
import "./style.less";

type PropsType = {
  id: number
  comments: CardComment[]
  onClickClosed: () => void
  reloadBoard: () => void
  
}

export const CommentsDropdown: React.FC<PropsType> = ({ id, comments, onClickClosed, reloadBoard }) => {
  const controlElement = useRef(null) as React.MutableRefObject<HTMLButtonElement | null>;
  const textInput = useRef(null) as React.MutableRefObject<HTMLTextAreaElement | null>;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isError, setIsError] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { currentBoard } = useSelector(
    (state: RootState) => state.board
  );

  useEffect(() => {
    textInput.current && textInput?.current?.focus();
  }, []);

  const handleErrorSubmit = () => {
    setNewComment("");
    setIsError(true);
  };

  const handleSuccessSubmit = () => {
    setNewComment("");
    console.log('handleSuccessSubmit')
    reloadBoard();
    setIsError(false);
  };

  const handleSubmit = async () => {
    controlElement.current && (controlElement.current.disabled = true);
    try {
      const data = await cardApi.addComment({
        cardId: id,
        content: newComment,
      });
      console.log(data);
      handleSuccessSubmit();
    } catch (error) {
      handleErrorSubmit();
    }
    controlElement.current && (controlElement.current.disabled = false);
    setShowEmojiPicker(false);
  };

  const handleSmileClick = () => {
    setShowEmojiPicker((isShown) => !isShown);
  };

  const handleEmojiPickerClick = (event: React.MouseEvent, emoji: IEmojiData) => {
    setNewComment((comment) => `${comment}${emoji?.emoji}`);
  };

  const handleCloseComments = () => {
    onClickClosed();
  };

  return (
    <div className="comments">
      <div className="comments__wrapper">
        {comments.map((item: CardComment) => (
          <Comment
            key={item.id}
            id={item.id}
            comment={item}
            editable={Boolean(currentBoard) && currentBoard?.id === item.author.id}
          />
        ))}
      </div>
      {
        <>
          <div className="new-comment">
            <Textarea
              ref={textInput}
              className={`new-comment__textarea ${isError && "new-comment__textarea--error"
                }`}
              value={newComment}
              onChange={(evt) => setNewComment(evt.target.value)}
              onKeyDown={(evt) =>
                handleKeyPress(evt, handleSubmit, onClickClosed)
              }
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
