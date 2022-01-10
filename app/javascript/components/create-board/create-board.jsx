import React, {useState} from 'react';
import Picker from 'emoji-picker-react';
import {faSmile} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import style from './style.module.css';

const EmojiIcon = ({emojiColumnName, formData, setEmojiData}) => {
  return (
    <a
      className={style.emoji}
      onClick={() => {
        setEmojiData({
          emojiColumnName,
          emojiPickerOpen: true
        });
      }}
    >
      {formData[emojiColumnName] ? (
        formData[emojiColumnName].emoji
      ) : (
        <FontAwesomeIcon icon={faSmile} size="lg" />
      )}
    </a>
  );
};

export const CreateBoard = ({isCreateBoardOpen, setCreateBoardOpen}) => {
  const [formData, setformData] = useState({
    boardName: '',
    firstColumnName: '',
    firstColumnEmoji: null,
    secondColumnName: '',
    secondColumnEmoji: null,
    thirdColumnName: '',
    thirdColumnEmoji: null
  });

  const [emojiData, setEmojiData] = useState({
    emojiColumnName: '',
    emojiPickerOpen: false
  });

  const handleSubmit = (event) => {
    alert(JSON.stringify(formData));
    event.preventDefault();
    setCreateBoardOpen(false);
  };

  const onEmojiClick = (name) => (event, emojiObject) => {
    setformData({
      ...formData,
      [name]: emojiObject
    });
    setEmojiData({
      emojiColumnName: '',
      emojiPickerOpen: false
    });
  };

  return (
    <div className={isCreateBoardOpen ? 'modal-visible' : 'modal-hidden'}>
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
              value={formData.boardName}
              type="text"
              onChange={(element) =>
                setformData({
                  ...formData,
                  boardName: element.currentTarget.value
                })
              }
            />
          </div>
          <div className="form-element">
            <div>The 1st column name</div>
            <input
              className="input"
              value={formData.firstColumnName}
              type="text"
              onChange={(element) =>
                setformData({
                  ...formData,
                  firstColumnName: element.currentTarget.value
                })
              }
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
                setformData({
                  ...formData,
                  secondColumnName: element.currentTarget.value
                })
              }
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
                setformData({
                  ...formData,
                  thirdColumnName: element.currentTarget.value
                })
              }
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
