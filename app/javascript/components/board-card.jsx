import React from 'react';
// Import style from './board-cards/style.module';

const BoardCard = (props) => {
  return (
    <div style={{width: '100px', height: '100px', background: 'red'}}>
      {props.id}
    </div>
  );
};

export default BoardCard;
