import React from 'react';
import CardBody from '../CardBody';
import CommentsDropdown from '../CommentsDropdown';
// Import Card from "../../index.js";

import './card-popup.css';

const CardPopup = ({
  id,
  body,
  deletable,
  editable,
  comments,
  onClickClosed
}) => {
  // {id, body, deletable, editable, comments, onClickClosed}
  // {id, body, deletable, editable, author, avatar, commentsNumber, likes, type, onCommentButtonClick, comments, onClickClosed}
  const handlePopupClosed = e => {
    if (e.target.classList.contains('card-popup')) {
      console.log("I'm trying to close");
      onClickClosed();
    }
  };

  return (
    <div className="card-popup" onClick={handlePopupClosed}>
      <div className="card-popup__inner">
        {/* <Card
        id={id}
        editable={editable}
        deletable={deletable}
        body={body}
        id={id}
        author={author}
        avatar={avatar}
        likes={likes}
        type={type}
        commentsNumber = {commentsNumber}
        onCommentButtonClick = {onCommentButtonClick}
            /> */}
        <div className="box">
          <CardBody
            id={id}
            editable={editable}
            deletable={deletable}
            body={body}
          />
          <CommentsDropdown id={id} comments={comments} />
        </div>
      </div>
    </div>
  );
};

export default CardPopup;
