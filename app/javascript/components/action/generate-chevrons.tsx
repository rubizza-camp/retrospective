import React from 'react';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  timesMoved: number;
};

export const GenerateChevrons: React.FC<Props> = ({ timesMoved }) => {
  return (
    <>
      {Array.from({ length: timesMoved }, (_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faChevronRight}
          size="sm"
          color="#ff000d"
          className="chevron-right"
        />
      ))}
    </>
  );
};
