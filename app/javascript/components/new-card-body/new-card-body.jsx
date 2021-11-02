import {nanoid} from 'nanoid';
import React, {useState, useContext, useEffect, useRef} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {addCardMutation} from './operations.gql';
import BoardSlugContext from '../../utils/board-slug-context';
import UserContext from '../../utils/user-context';
import {handleKeyPress} from '../../utils/helpers';
import style from './style.module.less';
import styleButton from '../../less/button.module.less';

const NewCardBody = ({kind, smile, handleCardAdd, handleGetNewCardID}) => {
  const textInput = useRef();
  const [isEdit, setIsEdit] = useState(false);
  const [newCard, setNewCard] = useState('');
  const [addCard] = useMutation(addCardMutation);

  const boardSlug = useContext(BoardSlugContext);
  const currentUser = useContext(UserContext);
  const editable = Boolean(currentUser);

  const toggleOpen = () => setIsEdit(!isEdit);

  useEffect(() => {
    if (isEdit) {
      textInput.current.focus();
    }
  }, [isEdit]);

  const cancelHandler = (evt) => {
    evt.preventDefault();
    setIsEdit(!isEdit);
    setNewCard('');
  };

  const buildNewCard = () => ({
    likes: 0,
    comments: [],
    kind,
    author: currentUser,
    body: newCard,
    id: `tmp-${nanoid()}`
  });

  const submitHandler = async (evt) => {
    const card = buildNewCard();
    evt.preventDefault();

    handleCardAdd(card);
    cancelHandler(evt);
    const {data} = await addCard({
      variables: {
        boardSlug,
        kind,
        body: newCard
      }
    });

    if (data.addCard.card) {
      handleGetNewCardID(card.id, data.addCard.card.id);
      setNewCard('');
    } else {
      console.log(data.addCard.errors.fullMessages.join(' '));
    }
  };

  const handleEscapeClick = (evt) => {
    cancelHandler(evt);
    setIsEdit(!isEdit);
    setNewCard('');
  };

  return (
    <div className={style.header}>
      <div className={style.smile}>{smile}</div>
      <div className={style.wrapper}>
        <h2 className={style.title} onDoubleClick={toggleOpen}>
          {kind}
        </h2>
        {editable && isEdit && (
          <form onSubmit={submitHandler}>
            <textarea
              ref={textInput}
              className={style.input}
              autoComplete="off"
              id={`card_${kind}_body`}
              value={newCard}
              placeholder="Express yourself"
              onChange={(evt) => setNewCard(evt.target.value)}
              onKeyDown={(evt) =>
                handleKeyPress(evt, submitHandler, handleEscapeClick)
              }
            />
            <div className={styleButton.buttons}>
              <button
                className={styleButton.buttonCancel}
                type="reset"
                onClick={cancelHandler}
              >
                cancel
              </button>
              {newCard && (
                <button
                  className={styleButton.buttonPost}
                  type="submit"
                  onSubmit={submitHandler}
                >
                  post
                </button>
              )}
            </div>
          </form>
        )}
      </div>
      {editable && (
        <div
          className={isEdit ? style.buttonClose : style.buttonPlus}
          onClick={isEdit ? cancelHandler : toggleOpen}
        >
          +
        </div>
      )}
    </div>
  );
};

export default NewCardBody;
