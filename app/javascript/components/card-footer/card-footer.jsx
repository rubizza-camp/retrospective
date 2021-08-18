import React from 'react';
import {Likes} from '../likes';
import './style.less';

const CardFooter = ({
  id,
  likes,
  type,
  commentsNumber,
  onCommentButtonClick,
  onClickClosed,
  isOpen,
  setIsOpen
}) => {
  const handleOpenComments = () => {
    onCommentButtonClick();
    setIsOpen(!isOpen);
  };

  const handleCloseComments = () => {
    onClickClosed();
    setIsOpen(!isOpen);
  };

  return (
    <div className="card-footer">
      <div className="card-footer__likes">
        <Likes id={id} likes={likes} type={type} />
      </div>
      {isOpen ? (
        <div className="card-footer__comments">
          <a onClick={handleOpenComments}>
            {commentsNumber > 0
              ? `see ${commentsNumber} comments`
              : `add a comment`}
          </a>
        </div>
      ) : (
        <div className="card-footer__comments">
          <a onClick={handleCloseComments}>hide comments</a>
        </div>
      )}
    </div>
  );
};

export default CardFooter;
