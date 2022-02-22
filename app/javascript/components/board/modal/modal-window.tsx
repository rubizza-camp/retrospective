import React from 'react';
import { BoardType } from '../../../typings/board';
import style from './style.module.less';


type Props = {
  visible: boolean
  setVisible: (isModal: boolean) => void
  setHistoryBoards: (board: Array<BoardType> | []) => void
};


const ModalWindow: React.FC<Props> = ({ children, visible, setVisible, setHistoryBoards }) => {
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
