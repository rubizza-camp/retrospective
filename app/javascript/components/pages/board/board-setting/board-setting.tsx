import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Picker, { IEmojiData } from "emoji-picker-react";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { boardApi } from "../../../../api/boards-api";
import { actions } from "../../../../redux/boards/slice";
import { BoardType } from "../../../../typings/board";
import { EmojiDataStateType, EmojiIconProps } from '../../../../typings/emoji';
import { getFullnameOrNickname } from "../../../../utils/helpers";
import { Avatar } from "../../../common/avatar/avatar";
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

type PropsType = {
  setBoardSettingOpen: (value: boolean) => void
  setBoard: (value: BoardType) => void
  board: BoardType
}

export const BoardSetting: React.FC<PropsType> = ({ setBoardSettingOpen, setBoard, board }) => {
  const dispatch = useDispatch();
  const { boardSlug } = useParams();

  const initialFormData = {
    title: board.title,
    firstColumnName: board.columnNames[0],
    firstColumnEmoji: {
      emoji: board.columnEmojis[0],
    },
    secondColumnName: board.columnNames[1],
    secondColumnEmoji: {
      emoji: board.columnEmojis[1],
    },
    thirdColumnName: board.columnNames[2],
    thirdColumnEmoji: {
      emoji: board.columnEmojis[2],
    }
  };

  const [formData, setFormData] = useState(initialFormData);
  const [email, setEmail] = useState('');

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
      private: false
    };
    if (boardSlug) {
      boardApi.updateBoard(board, boardSlug).then(board => {
        dispatch(actions.setBoard(board));
        setBoard(board)
      })
    }
    setBoardSettingOpen(false);
    setFormData(initialFormData);
  };

  const addUser = async () => {
    if (boardSlug) {
      await boardApi.addUser(email, boardSlug)
      setEmail('');
    }
  }

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


  useEffect(() => {
    if (boardSlug) {
      // boardApi.getMemberships(boardSlug).then(res => console.log(res))
    }
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
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
            Update board
          </button>
        </div>
      </form>
      <div className="form-element">
        <div>Email</div>
        <input
          className="input"
          type="text"
          value={email}
          onChange={(element) => {
            setEmail(element.currentTarget.value)
          }}
        />
        <div className={style.containerAvatar}>
          {board.users.map((user) => (
            <div key={user.id} className={style.userAvatar}>
              <div
                className={style.removeBtn}
                onClick={() => {
                  // boardApi.removeUser()
                  alert('remove user')
                }}
              >+</div>
              <div className={style.avatar}>
                <Avatar
                  avatar={user.avatar.url}
                  id={user.id}
                  width={30}
                  height={30}
                  isSquare={false}
                  firstName={user.firstName}
                  lastName={user.lastName}
                />
                <span>
                  {getFullnameOrNickname(
                    user.firstName,
                    user.lastName,
                    user.nickname
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className={style.buttonWrapper}>
          <button className="button submit-button" onClick={addUser}>
            Invite user
          </button>
          <button
            type="button"
            className="button cancel-button"
            onClick={() => {
              setBoardSettingOpen(false);
              setFormData(initialFormData);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
