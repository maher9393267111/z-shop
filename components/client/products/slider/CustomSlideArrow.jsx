import React from 'react';
import { ChevronIcon } from '../../../../functions/icons';

export default function CustomSlideArrow({ direction, onClick }) {
  return (
    <button
      className={`absolute  top-1/2 z-10 ${
        direction === 'next' ? '-right-8' : '-left-8'
      }`}
      style={{
        transform: direction === 'next' ? 'rotate(180deg)' : '',
      }}
      onClick={onClick}
      disabled={!onClick}
    >
      <ChevronIcon color={'green'} />
    </button>
  )

    }

