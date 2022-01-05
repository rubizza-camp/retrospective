import React, { useState } from "react";
import style from "./style.module.css";

export const CreateBoard = ({ isCreateBoardOpen, setCreateBoardOpen }) => {
  const [formData, setformData] = useState({
    boardName: "",
    firstColumnName: "",
    secondColumnName: "",
    thirdColumnName: "",
  });

  const handleSubmit = (event) => {
    alert(JSON.stringify(formData));
    event.preventDefault();
  };

  return (
    <div className={isCreateBoardOpen ? "modal-visible" : "modal-hidden"}>
      <div className={style.formWrapper}>
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
                  boardName: element.currentTarget.value,
                })
              }
            />
          </div>
          <div className="form-element">
            <div>The 1st colomn name</div>
            <input
              className="input"
              value={formData.firstColumnName}
              type="text"
              onChange={(element) =>
                setformData({
                  ...formData,
                  firstColumnName: element.currentTarget.value,
                })
              }
            />
          </div>
          <div className="form-element">
            <div>The 2nd colomn name</div>
            <input
              className="input"
              value={formData.secondColumnName}
              type="text"
              onChange={(element) =>
                setformData({
                  ...formData,
                  secondColumnName: element.currentTarget.value,
                })
              }
            />
          </div>
          <div className="form-element">
            <div>The 3rd colomn name</div>
            <input
              className="input"
              value={formData.thirdColumnName}
              type="text"
              onChange={(element) =>
                setformData({
                  ...formData,
                  thirdColumnName: element.currentTarget.value,
                })
              }
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
