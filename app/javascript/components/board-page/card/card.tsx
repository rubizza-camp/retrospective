import React, {useState, useMemo} from 'react';
import { CardBody } from '../card-body/card-body';
import {CardFooter} from '../card-footer/card-footer';
import {CommentsDropdown} from '../comments-dropdown/comments-dropdown';
import style from './style.module.less';

export const Card = ({
  id,
  body,
  author,
  comments,
  likes,
  type,
  onClickClosed,
  onCommentButtonClick
}: any) => {
  const [isCommentsShown, setIsCommentsShown] = useState(false)

  // const isTemporaryId = (id) => {
  //   return id.toString().startsWith('tmp-');
  // };

  // const isCurrentUserAuthor =
  //   Boolean(currentUser) && currentUser.id.toString() === author.id.toString(); // Temporary solution for matching data types (after edit card it will still availible to edit)

  // const editable = useMemo(() => !isTemporaryId(id) && isCurrentUserAuthor, [
  //   id,
  //   isCurrentUserAuthor
  // ]);

  // const deletable = useMemo(
  //   () =>
  //     !isTemporaryId(id) &&
  //     (isCurrentUserAuthor || (Boolean(currentUser) && currentUser.isCreator)),
  //   [id, currentUser, isCurrentUserAuthor]
  // );

  return (
    <div className={`${style.card} ${style.cardColor}`}>
      <CardBody
        author={author}
        id={id}
        body={body}
      />
      <CardFooter
        id={id}
        likes={likes}
        type={type}
        comments={comments}
        onClickClosed={onClickClosed}
        setIsCommentsShown={setIsCommentsShown}
        isCommentsShown={isCommentsShown}
        onCommentButtonClick={onCommentButtonClick}
      />

      
      {isCommentsShown && (
        <CommentsDropdown
          id={id}
          comments={comments}
          onClickClosed={onClickClosed}
        />
      )}
    </div>
  );
};
