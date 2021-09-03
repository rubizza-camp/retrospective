import React from 'react';
import style from './style.module.less';

const ModalWindow = ({children, visible, setVisible, setHistoryBoards}) => {
  const rootClasses = [style.modal];

  if (visible) rootClasses.push(style.active);

  const closeModelWindow = () => {
    setVisible(false);
    setHistoryBoards([]);
  };

  return (
    <div className={rootClasses.join(' ')} onClick={closeModelWindow}>
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
