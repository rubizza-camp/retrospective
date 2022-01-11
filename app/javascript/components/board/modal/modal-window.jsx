import React from 'react';
import style from './style.module.less';

const ModalWindow = ({children, visible, setVisible, setHistoryBoards}) => {
  const closeModalWindow = () => {
    setVisible(false);
    setHistoryBoards([]);
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
