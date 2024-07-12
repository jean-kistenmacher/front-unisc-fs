import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import Seat from './Seat';

const CinemaHall = ({ onSeatSelect }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatClick = (number) => {
    setSelectedSeat(number);
    onSeatSelect(number);
  };

  const renderSeats = (start, end) => {
    const seats = [];
    for (let i = start; i <= end; i++) {
      seats.push(
        <Seat
          key={i}
          number={i}
          isSelected={selectedSeat === i}
          onClick={handleSeatClick}
        />
      );
    }
    return seats;
  };

  return (
    <div>
      <Typography variant="h4" align="center" sx={{ marginBottom: "3rem", backgroundColor: "gray", fontStyle: { color: "white" } }}>
        <strong>Tela</strong>
      </Typography>
      <Grid container spacing={10} justifyContent="center" alignItems="center">
        <Grid xs={12} md={6} item>{renderSeats(1, 24)}</Grid>
        <Grid xs={12} md={6} item>{renderSeats(31, 54)}</Grid>
      </Grid>
    </div>
  );
};

export default CinemaHall;
