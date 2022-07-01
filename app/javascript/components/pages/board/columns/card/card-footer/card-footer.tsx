import React from "react";
import { CardComment } from "../../../../../../typings/board";
import { Likes } from "../../../common/likes/likes";
import "./style.less";

type PropsType = {
  id: number
  likes: number
  smile: string
  setIsCommentsShown: (value: boolean) => void
  isCommentsShown: boolean
  comments: CardComment[]
}

export const CardFooter: React.FC<PropsType> = ({
  id,
  likes,
  smile,
  setIsCommentsShown,
  isCommentsShown,
  comments,
}) => {
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
            {comments.length > 0
              ? `see ${comments.length} comments`
              : "add a comment"}
          </a>
        </div>
      )}
      <div className="card-footer__likes">
        <Likes isCard smile={smile} id={id} likes={likes} />
      </div>
    </div>
  );
};
