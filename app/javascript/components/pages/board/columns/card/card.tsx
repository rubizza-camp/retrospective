import React, { useState } from "react";
import { CardComment } from "../../../../../typings/board";
import { User } from "../../../../../typings/user";
import { CardBody } from "./card-body/card-body";
import { CardFooter } from "./card-footer/card-footer";
import { CommentsDropdown } from "./comment/comments-dropdown/comments-dropdown";
import style from "./style.module.less";


type PropsType = {
  id: number
  body: string
  author: User
  comments: CardComment[]
  smile: string
  likes: number
  reloadBoard: () => void;
}

export const Card: React.FC<PropsType> = ({
  id,
  body,
  author,
  comments,
  smile,
  likes,
  reloadBoard
}) => {
  const [isCommentsShown, setIsCommentsShown] = useState(false);

  return (
    <div className={`${style.card} ${style.cardColor}`}>
      <CardBody author={author} id={id} body={body} />
      <CardFooter
        id={id}
        smile={smile}
        likes={likes}
        comments={comments}
        setIsCommentsShown={setIsCommentsShown}
        isCommentsShown={isCommentsShown}
      />

      {isCommentsShown && (
        <CommentsDropdown
          id={id}
          comments={comments}
          onClickClosed={() => setIsCommentsShown(false)}
          reloadBoard={reloadBoard}
        />
      )}
    </div>
  );
};
