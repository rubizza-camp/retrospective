import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { cardApi } from "../../../../../../api/card-api";
import styleButton from "../../../../../../less/button.module.less";
import { RootState } from "../../../../../../redux/store";
import { handleKeyPress } from "../../../../../../utils/helpers";
import style from "./style.module.less";

type PropsType = {
  kind: string
  boardSlug: string
  smile: string
}

const NewCardBody: React.FC<PropsType> = ({ kind, smile, boardSlug }) => {
  const textInput = useRef(null) as React.MutableRefObject<HTMLTextAreaElement | null>;
  const [isEdit, setIsEdit] = useState(false);
  const [newCard, setNewCard] = useState("");
  const { currentUser } = useSelector(
    (state: RootState) => state.user
  );


  const editable = Boolean(currentUser);

  const toggleOpen = () => setIsEdit(!isEdit);

  useEffect(() => {
    if (isEdit && textInput.current) {
      textInput.current.focus();
    }
  }, [isEdit]);

  const cancelHandler = () => {
    setIsEdit(!isEdit);
    setNewCard("");
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    cancelHandler();

    cardApi.createCard({
      body: newCard,
      kind,
      board_slug: boardSlug,
    });
  };

  const handleEscapeClick = () => {
    cancelHandler();
    setIsEdit(!isEdit);
    setNewCard("");
  };

  return (
    <div className={style.header}>
      <div className={style.smile}>{smile}</div>
      <div className={style.wrapper}>
        <h2 className={style.title} onDoubleClick={toggleOpen}>
          {kind}
        </h2>
        {editable && isEdit && (
          <form className={style.newCard} onSubmit={submitHandler}>
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
