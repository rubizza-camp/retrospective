import React from "react";
import style from "./style.module.less";

type Props = {
  visible: boolean;
  setVisible: (isModal: boolean) => void;
  closeByButton: boolean
};

const ModalWindow: React.FC<Props> = ({ children, visible, setVisible, closeByButton }) => {

  const closeModalWindow = () => {
    { closeByButton && setVisible(false) };
  };

  const rootClasses = visible ? `${style.modal} ${style.active}` : style.modal;

  return (
    <div className={rootClasses} onClick={closeModalWindow}>
      <div
        className={style.modalContent}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;