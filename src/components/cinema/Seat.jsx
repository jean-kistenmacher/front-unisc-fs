import React from 'react';
import { Button } from '@mui/material';

const Seat = ({ number, isSelected, onClick }) => {
  return (
    <Button
      variant={isSelected ? 'contained' : 'outlined'}
      color={isSelected ? 'primary' : 'secondary'}
      onClick={() => onClick(number)}
      style={{ margin: 5, width: 50 }}
    >
      {number}
    </Button>
  );
};

export default Seat;
