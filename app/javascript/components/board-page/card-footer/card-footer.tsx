import React, {useState} from 'react';
import {Likes} from '../likes/likes';
import './style.less';

export const CardFooter = ({
  id,
  likes,
  type,
  setIsCommentsShown,
  isCommentsShown,
  comments
}: any) => {
  // const currentUser = useContext(UserContext);
  const handleOpenComments = () => {
    setIsCommentsShown(true);
  };

  const handleCloseComments = () => {
    setIsCommentsShown(false);
  };

  return (
    <div className="card-footer">
      {isCommentsShown ? (
        <div className="card-footer__comments">
          <a onClick={handleCloseComments}>hide comments</a>
        </div>
      ) : (
        <div className="card-footer__comments">
          <a onClick={handleOpenComments}>
            {comments.length > 0 ? `see ${comments.length} comments` : 'add a comment'}
          </a>
        </div>
      )}
       <div className="card-footer__likes">
        <Likes isCard id={id} likes={likes} type={type} />
      </div>
    </div>
  );
};

