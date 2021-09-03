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
  isCommentsShown
}) => {
  const handleOpenComments = () => {
    onCommentButtonClick();
  };

  const handleCloseComments = () => {
    onClickClosed();
  };

  return (
    <div className="card-footer">
      <div className="card-footer__likes">
        <Likes isCard id={id} likes={likes} type={type} />
      </div>
      {isCommentsShown ? (
        <div className="card-footer__comments">
          <a onClick={handleCloseComments}>hide comments</a>
        </div>
      ) : (
        <div className="card-footer__comments">
          <a onClick={handleOpenComments}>
            {commentsNumber > 0
              ? `see ${commentsNumber} comments`
              : `add a comment`}
          </a>
        </div>
      )}
    </div>
  );
};

export default CardFooter;
