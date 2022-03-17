import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEllipsisH, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { api } from '../api/api';
import { userApi } from '../api/user-api';
import style from './style.module.less';

type DataFormType = {
  nickName: string
  firstName: string
  lastName: string
  avatar: string
}

export const SettingsPage: React.FC = () => {
  const fileInput = useRef(null) as MutableRefObject<HTMLInputElement | null>;
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [dataForm, setDataForm] = useState<DataFormType>({
    nickName: '',
    firstName: '',
    lastName: '',
    avatar: ''
  });

  useEffect(() => {
    userApi.getUser().then((user) => {
      setDataForm({
        nickName: user.nickname,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar?.thumb.url
      })
    });
  }, [])

  const onChangeHandler = (element: React.ChangeEvent<HTMLInputElement>) => {
    if (element.target.files && element.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(element.target.files[0]);
      reader.onloadend = () => {
        if (typeof (reader.result) === "string")
          setDataForm({ ...dataForm, avatar: reader.result });
      };
    }
  };


  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    // alert(JSON.stringify(dataForm));
    let user = await api.patch(`users/1/update`, {dataForm});
    console.log(user)
    event.preventDefault();
  };

  return (
    <form className={style.container} onSubmit={handleSubmit}>
      <div>
        {dataForm.avatar ? (
          <div className={style.avatarForm}>
            <img src={dataForm.avatar} className={style.avatar} />
            <div onMouseLeave={() => setIsOpenMenu(false)}>
              <div
                className={`${style.menuButton} menu-button`}
                onClick={(event) => {
                  event.stopPropagation();
                  setIsOpenMenu(!isOpenMenu);
                }}
              >
                <FontAwesomeIcon icon={faEllipsisH as IconProp} size="lg" color="#C6C6C4" />
              </div>
              <div className={isOpenMenu ? `${style.opened} opened` : 'closed'}>
                <ul>
                  <li
                    className="list-item"
                    onClick={() => {
                      setIsOpenMenu(false);
                      if (typeof (fileInput.current) !== "string") {
                        fileInput.current?.click();
                      }
                    }}
                  >
                    Change photo
                  </li>
                  <li
                    className="list-item"
                    onClick={() => {
                      setIsOpenMenu(false);
                      if (fileInput.current) {
                        fileInput.current.value = ''
                      }
                      setDataForm({ ...dataForm, avatar: '' });
                    }}
                  >
                    Delete
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className={style.avatarUploadButton}
            onClick={() => {
              if (typeof (fileInput.current) !== "string") {
                fileInput.current?.click()
              }
            }}
          >
            <FontAwesomeIcon
              icon={faPlus as IconProp}
              size="sm"
              color="#474343"
              style={{ marginRight: '8px' }}
            />
            Upload photo
          </button>
        )}
        <input
          ref={fileInput}
          accept="image/*"
          type="file"
          name="image"
          style={{ display: 'none' }}
          onChange={onChangeHandler}
        />
      </div>
      <div className="form-element">
        <div>Nickname</div>
        <input
          className="input"
          value={dataForm.nickName}
          type="text"
          onChange={(element) =>
            setDataForm({ ...dataForm, nickName: element.currentTarget.value })
          }
        />
      </div>
      <div className="form-element">
        <div>First name</div>
        <input
          className="input"
          value={dataForm.firstName}
          type="text"
          onChange={(element) =>
            setDataForm({ ...dataForm, firstName: element.currentTarget.value })
          }
        />
      </div>
      <div className="form-element">
        <div>Last name</div>
        <input
          className="input"
          value={dataForm.lastName}
          type="text"
          onChange={(element) =>
            setDataForm({ ...dataForm, lastName: element.currentTarget.value })
          }
        />
      </div>
      <div>
        <button className="button submit-button" type="submit">
          Save changes
        </button>
      </div>
    </form>
  );
};
