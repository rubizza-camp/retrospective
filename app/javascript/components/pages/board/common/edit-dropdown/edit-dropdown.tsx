import React from "react";
import style from "./style.module.less";

type PropsType = {
  setShowDropdown: (value: boolean) => void
  showDropdown: boolean
  editMode: boolean
  editable: boolean
  handleEditClick: () => void
  handleDelete: () => void
}

export const EditDropdown: React.FC<PropsType> = ({
  setShowDropdown,
  showDropdown,
  editMode,
  editable,
  handleEditClick,
  handleDelete
}) => {
  return (
    <div className={style.dropdown}>
      <div
        className={style.dropdownButton}
        //@ts-ignore
        tabIndex="1"
        onClick={() => setShowDropdown(!showDropdown)}
        onBlur={() => setShowDropdown(false)}
      >
        …
      </div>
      {showDropdown && (
        <div className={style.dropdownContent}>
          {!editMode && editable && (
            <div
              className={style.dropdownItem}
              onClick={handleEditClick}
              onMouseDown={(event) => {
                event.preventDefault();
              }}
            >
              Edit
            </div>
          )}
          <div
            className={style.dropdownItem}
            onClick={
              () => window.confirm("Are you sure you want to delete?")
                &&
                handleDelete()
            }
            onMouseDown={(event) => {
              event.preventDefault();
            }}
          >
            Delete
          </div>
        </div>
      )}
    </div>
  );
};
