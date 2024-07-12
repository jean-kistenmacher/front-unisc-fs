import React from 'react';
import { Button } from '@mui/material';

const Seat = ({ number, isSelected, onClick, ocupado, statusColor }) => {

  return (
    <>
      {ocupado &&
        <Button
          sx={{
            backgroundColor: statusColor,
            color: 'white',
            opacity: 1,
            '&.Mui-disabled': {
              backgroundColor: statusColor,
              color: 'white',
            },
          }}
          variant='contained'
          disabled
          style={{ margin: 5, width: 50 }}
        >
          {number}
        </Button>}
      {!ocupado &&
        <Button
          variant={isSelected ? 'contained' : 'outlined'}
          color={isSelected ? 'success' : 'secondary'}
          onClick={() => onClick(number)}
          style={{ margin: 5, width: 50 }}
        >
          {number}
        </Button>
      }
    </>
  );
};




export default Seat;
