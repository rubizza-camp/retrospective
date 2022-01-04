import {faEllipsisH, faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useRef, useState} from 'react';
import style from './style.module.css';

export const SettingsPage = () => {
  const fileInput = useRef(null);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [dataForm, setDataForm] = useState({
    nickName: '',
    firstName: '',
    lastName: '',
    avatar: null
  });

  const onChangeHandler = (element) => {
    if (element.target.files && element.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(element.target.files[0]);
      reader.onloadend = () => {
        setDataForm({...dataForm, avatar: reader.result});
      };
    }
  };

  const handleSubmit = (event) => {
    alert(JSON.stringify(dataForm));
    event.preventDefault();
  };

  return (
    <form className={style.container} onSubmit={handleSubmit}>
      <div>
        {dataForm.avatar ? (
          <div className={style.avatarForm}>
            <img src={dataForm.avatar} className={style.avatar} />
            <button
              type="button"
              className={style.menuButton}
              onClick={() => setIsOpenMenu(!isOpenMenu)}
            >
              <FontAwesomeIcon icon={faEllipsisH} size="lg" color="#474343;" />
            </button>
            <ul
              className={isOpenMenu ? style.openMenu : style.items}
              onMouseLeave={() => setIsOpenMenu(false)}
            >
              <li
                className={style.item}
                onClick={() => {
                  setIsOpenMenu(false);
                  fileInput.current.click();
                }}
              >
                Change photo
              </li>
              <li
                className={style.item}
                onClick={() => {
                  setIsOpenMenu(false);
                  fileInput.current.value = null;
                  setDataForm({avatar: null});
                }}
              >
                Delete
              </li>
            </ul>
          </div>
        ) : (
          <button
            type="button"
            className={style.avatarUploadButton}
            onClick={() => fileInput.current.click()}
          >
            <FontAwesomeIcon
              icon={faPlus}
              size="sm"
              color="#474343"
              style={{marginRight: '8px'}}
            />
            Upload photo
          </button>
        )}
        <input
          ref={fileInput}
          accept="image/*"
          type="file"
          name="image"
          style={{display: 'none'}}
          onChange={onChangeHandler}
        />
      </div>
      <label className={style.formElement}>
        <div>Nickname</div>
        <input
          className={style.input}
          value={dataForm.nickName}
          type="text"
          onChange={(element) =>
            setDataForm({...dataForm, nickName: element.currentTarget.value})
          }
        />
      </label>
      <label className={style.formElement}>
        <div>First name</div>
        <input
          className={style.input}
          value={dataForm.firstName}
          type="text"
          onChange={(element) =>
            setDataForm({...dataForm, firstName: element.currentTarget.value})
          }
        />
      </label>
      <label className={style.formElement}>
        <div>Last name</div>
        <input
          className={style.input}
          value={dataForm.lastName}
          type="text"
          onChange={(element) =>
            setDataForm({...dataForm, lastName: element.currentTarget.value})
          }
        />
      </label>
      <div>
        <input
          className={style.submitButton}
          type="submit"
          value="Save changes"
        />
      </div>
    </form>
  );
};
