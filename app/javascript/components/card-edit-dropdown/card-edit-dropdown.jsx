import React from 'react';
import style from './style.module.less';

const CardEditDropdown = ({
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
            onClick={() =>
              window.confirm('Are you sure you want to delete this card?') &&
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

export default CardEditDropdown;
