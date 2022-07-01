import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Picker, { IEmojiData } from "emoji-picker-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../../../redux/boards/slice";
import { EmojiDataStateType, EmojiIconProps } from "../../../../typings/emoji";
import { getBoardDateName } from "../../../../utils/get-date";
import { boardApi } from "../../../../api/boards-api";
import style from "./style.module.less";

const EmojiIcon: React.FC<EmojiIconProps> = ({
  emojiColumnName,
  formData,
  setEmojiData,
}) => {
  return (
    <a
      className={style.emoji}
      onClick={() => {
        setEmojiData({
          emojiColumnName,
          emojiPickerOpen: true,
        });
      }}
    >
      {formData[emojiColumnName] ? (
        formData[emojiColumnName].emoji
      ) : (
        <FontAwesomeIcon icon={faSmile as IconProp} size="lg" />
      )}
    </a>
  );
};

type CreateBoardProps = {
  isCreateBoardOpen: boolean;
  setCreateBoardOpen: (isCreateBoardOpen: boolean) => void;
};

export const CreateBoard: React.FC<CreateBoardProps> = ({
  isCreateBoardOpen,
  setCreateBoardOpen,
}) => {
  const dispatch = useDispatch();
  const initialFormData = {
    title: getBoardDateName(Date.now()),
    firstColumnName: "mad",
    firstColumnEmoji: {
      emoji: "😔",
    },
    secondColumnName: "sad",
    secondColumnEmoji: {
      emoji: "😡",
    },
    thirdColumnName: "glad",
    thirdColumnEmoji: {
      emoji: "🤗",
    },
  };
  const [formData, setFormData] = useState(initialFormData);

  const [emojiData, setEmojiData] = useState<EmojiDataStateType>({
    emojiColumnName: "",
    emojiPickerOpen: false,
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const board = {
      title: formData.title,
      columnNames: [
        formData.firstColumnName,
        formData.secondColumnName,
        formData.thirdColumnName,
      ],
      columnEmojis: [
        formData.firstColumnEmoji.emoji,
        formData.secondColumnEmoji.emoji,
        formData.thirdColumnEmoji.emoji,
      ],
      private: false,
    };
    const response = await boardApi.createBoard(board);
    if (response) {
      dispatch(actions.setBoards(response));
    }
    setCreateBoardOpen(false);
    setFormData(initialFormData);
  };

  const onEmojiClick =
    (name: string) => (event: React.MouseEvent, emojiObject: IEmojiData) => {
      setFormData({
        ...formData,
        [name]: emojiObject,
      });
      setEmojiData({
        emojiColumnName: "",
        emojiPickerOpen: false,
      });
    };

  return (
    <div className={isCreateBoardOpen ? "modal-visible" : "modal-hidden"}>
      <div className={style.formWrapper}>
        {emojiData.emojiPickerOpen && (
          <div className={style.emojiPickerWrapper}>
            <Picker onEmojiClick={onEmojiClick(emojiData.emojiColumnName)} />
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="bold form-element">
            <div>Board name</div>
            <input
              className="input"
              value={formData.title}
              type="text"
              onChange={(element) =>
                setFormData({
                  ...formData,
                  title: element.currentTarget.value,
                })
              }
              required
            />
          </div>
          <div className="form-element">
            <div>The 1st column name</div>
            <input
              className="input"
              value={formData.firstColumnName}
              type="text"
              onChange={(element) =>
                setFormData({
                  ...formData,
                  firstColumnName: element.currentTarget.value,
                })
              }
              required
            />
            <EmojiIcon
              emojiColumnName="firstColumnEmoji"
              formData={formData}
              setEmojiData={setEmojiData}
            />
          </div>
          <div className="form-element">
            <div>The 2nd column name</div>
            <input
              className="input"
              value={formData.secondColumnName}
              type="text"
              onChange={(element) =>
                setFormData({
                  ...formData,
                  secondColumnName: element.currentTarget.value,
                })
              }
              required
            />
            <EmojiIcon
              emojiColumnName="secondColumnEmoji"
              formData={formData}
              setEmojiData={setEmojiData}
            />
          </div>
          <div className="form-element">
            <div>The 3rd column name</div>
            <input
              className="input"
              value={formData.thirdColumnName}
              type="text"
              onChange={(element) =>
                setFormData({
                  ...formData,
                  thirdColumnName: element.currentTarget.value,
                })
              }
              required
            />
            <EmojiIcon
              emojiColumnName="thirdColumnEmoji"
              formData={formData}
              setEmojiData={setEmojiData}
            />
          </div>
          <div className={style.buttonWrapper}>
            <button className="button submit-button" type="submit">
              Create board
            </button>
            <button
              type="button"
              className="button cancel-button"
              onClick={() => {
                setCreateBoardOpen(false);
                setFormData(initialFormData);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
