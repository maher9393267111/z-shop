import React from 'react';
import { ChevronIcon } from '../../../../functions/icons';
import { motion } from "framer-motion"
export default function CustomSlideArrow({ direction, onClick }) {
  return (
    <motion.button

     
      className={`absolute  top-1/2 z-10     ${
        direction === 'next' ? '-right-3  hover:scale-150  transition-all duration-150' : '-left-3  hover:scale-150  transition-all duration-150'
      }`}
      style={{
        transform: direction === 'next' ? 'rotate(180deg)' : '',
      }}
      onClick={onClick}
      disabled={!onClick}
    >
      <ChevronIcon color={'green'} />
    </motion.button>
  )

    }

