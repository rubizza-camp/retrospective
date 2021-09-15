import React, {useState, useEffect} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {likeCardMutation, likeCommentMutation} from './operations.gql';
import style from './style.module.less';
const EMOJIES = {
  mad: '😡',
  sad: '😔',
  glad: '🤗',
  universal: '👍'
};

const Likes = ({type, likes, id, isCard}) => {
  const [likeCard] = useMutation(likeCardMutation);
  const [likeComment] = useMutation(likeCommentMutation);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    return function () {
      clearInterval(timer);
    };
  }, [timer]);

  const addLike = async () => {
    if (isCard) {
      const {data} = await likeCard({
        variables: {
          id
        }
      });

      if (!data.likeCard.card) {
        console.log(data.likeCard.errors.fullMessages.join(' '));
      }
    } else {
      const {data} = await likeComment({
        variables: {
          id
        }
      });

      if (!data.likeComment.comment) {
        console.log(data.likeComment.errors.fullMessages.join(' '));
      }
    }
  };

  const handleMouseClick = () => {
    addLike();
  };

  return (
    <div
      className={style.likesWrapper}
      onClick={handleMouseClick}
    >
      <div>{EMOJIES[type] || EMOJIES.universal}</div>
      <span> {likes} </span>
    </div>
  );
};

export default Likes;
