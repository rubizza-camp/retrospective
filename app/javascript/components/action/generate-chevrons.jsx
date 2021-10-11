import React from 'react';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export const GenerateChevrons = ({timesMoved}) => {
  const chevrons = Array.from({length: timesMoved}, (_, index) => (
    <FontAwesomeIcon
      key={index}
      icon={faChevronRight}
      size="sm"
      color="#ff000d"
      className="chevron-right"
    />
  ));
  return chevrons;
};
