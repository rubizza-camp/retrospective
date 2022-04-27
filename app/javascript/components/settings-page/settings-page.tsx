import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEllipsisH, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { User } from '../../typings/user';
import { actions } from '../../redux/user/slice'
import { userApi } from '../api/user-api';
import { RootState } from "../../redux/store";
import { Spinner } from "../spinner/spinner";
import style from './style.module.less';

type PropsType = {
  user: User
}

export const SettingsPage: React.FC<PropsType> = ({ user }) => {
  const dispatch = useDispatch()
  const fetching = useSelector((state: RootState) => state.user.fetching);
  const fileInput = useRef(null) as MutableRefObject<HTMLInputElement | null>;
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(user.avatar.url);
  const [nickname, setNickname] = useState<string>(user.nickname);
  const [firstName, setFirstName] = useState<string>(user.firstName);
  const [lastName, setLastName] = useState<string>(user.lastName);

  useEffect(() => {
    try {
      dispatch(actions.pending());
      userApi.getUser().then((user) => {
        dispatch(actions.setCurrentUser(user));
      });
    } catch {
      dispatch(actions.rejected());
    }
  }, []);

  const onChangeHandler = (element: React.ChangeEvent<HTMLInputElement>) => {
    if (element.target.files && element.target.files.length > 0) {
      const reader = new FileReader();
      const selectedImage = element.target.files[0]
      reader.onload = () => {
        if (typeof (reader.result) === "string")
          setAvatar(reader.result)
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(actions.pending());
    try {
      userApi.updateUser(lastName, firstName, nickname, avatar).then((user) => {
        dispatch(actions.setCurrentUser(user));
      });
    } catch {
      dispatch(actions.rejected());
    }
  };

  return (
    <Spinner fetching={fetching} styles={{paddingTop: '100px', paddingLeft: '350px'}}>
      <form className={style.container} onSubmit={handleSubmit}>
        <div>
          {avatar ? (
            <div className={style.avatarForm}>
              <img src={avatar} className={style.avatar} />
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
                        if (typeof fileInput.current !== "string") {
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
                        setAvatar(null);
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
                if (typeof fileInput.current !== "string") {
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
          <div>nickname</div>
          <input
            className="input"
            value={nickname}
            type="text"
            onChange={(element) =>
              setNickname(element.currentTarget.value)
            }
          />
        </div>
        <div className="form-element">
          <div>First name</div>
          <input
            className="input"
            value={firstName}
            type="text"
            onChange={(element) => setFirstName(element.currentTarget.value)}
          />
        </div>
        <div className="form-element">
          <div>Last name</div>
          <input
            className="input"
            value={lastName}
            type="text"
            onChange={(element) =>
              setLastName(element.currentTarget.value)
            }
          />
        </div>
        <div>
          <button className="button submit-button" type="submit">
            Save changes
          </button>
        </div>
      </form>
    </Spinner>
  );
};
