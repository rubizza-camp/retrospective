import { nanoid } from "nanoid";
import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  MouseEventHandler,
} from "react";
import style from "./style.module.less";
import styleButton from "../../../less/button.module.less";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cardApi } from "../../api/card-api";

const NewCardBody = ({ kind, boardSlug }: any) => {
  const textInput = useRef<any>();
  const [isEdit, setIsEdit] = useState(false);
  const [newCard, setNewCard] = useState("");

  // const editable = Boolean(currentUser);

  const toggleOpen = () => setIsEdit(!isEdit);

  useEffect(() => {
    if (isEdit) {
      textInput.current.focus();
    }
  }, [isEdit]);

  const cancelHandler = (evt: any) => {
    evt.preventDefault();
    setIsEdit(!isEdit);
    setNewCard("");
  };

  const submitHandler = async (evt: any) => {
    evt.preventDefault();

    cancelHandler(evt);

    cardApi.createCard({
      body: newCard,
      kind,
      board_slug: boardSlug,
    });

    // if (data.addCard.card) {
    //   handleGetNewCardID(card.id, data.addCard.card.id);
    //   setNewCard('');
    // } else {
    //   console.log(data.addCard.errors.fullMessages.join(' '));
    // }
  };

  const handleEscapeClick = (evt: any) => {
    cancelHandler(evt);
    setIsEdit(!isEdit);
    setNewCard("");
  };

  return (
    <>
      {isEdit && (
        <form className={style.newCard} onSubmit={submitHandler}>
          <textarea
            ref={textInput}
            className={style.input}
            autoComplete="off"
            id={`card_${kind}_body`}
            value={newCard}
            placeholder="Express yourself"
            onChange={(evt) => setNewCard(evt.target.value)}
            // onKeyDown={(evt) =>
            //   handleKeyPress(evt, submitHandler, handleEscapeClick)
            // }
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
      <FontAwesomeIcon
        icon={faPlus as IconProp}
        size="sm"
        color="gray"
        className={style.icon}
        onClick={isEdit ? cancelHandler : toggleOpen}
      />
    </>
  );
};

export default NewCardBody;
