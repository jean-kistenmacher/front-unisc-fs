import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import Seat from './Seat';

const CinemaHall = ({ onSeatSelect, pedidos }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatClick = (number) => {
    setSelectedSeat(number);
    onSeatSelect(number);
  };

  const renderSeats = (start, end, pedidos) => {
    const seats = [];
    let poltronasOcupadas = [];
    let ocupado = false;
    let statusColor = "";
    pedidos.map((pedido) => poltronasOcupadas.push({ status: pedido.status, poltrona: pedido.poltrona }));
    console.log(poltronasOcupadas)
    for (let i = start; i <= end; i++) {
      poltronasOcupadas.map((poltrona) => {
        if (poltrona.poltrona === i) {
          ocupado = true;
          if (poltrona.status === "Reservado") {
            statusColor = "secondary.main"
          }
          if (poltrona.status === "Pago") {
            statusColor = "error.main"
          }
        }
      })
      seats.push(
        <Seat
          key={i}
          number={i}
          isSelected={selectedSeat === i}
          onClick={handleSeatClick}
          ocupado={ocupado}
          statusColor={statusColor}
        />
      );
      ocupado = false;
      statusColor = "";
    }
    return seats;
  };

  return (
    <div>
      <Typography variant="h4" align="center" sx={{ marginBottom: "3rem", backgroundColor: "gray", fontStyle: { color: "white" } }}>
        <strong>Tela</strong>
      </Typography>
      <Grid container spacing={10} justifyContent="center" alignItems="center">
        <Grid xs={12} md={6} item>{renderSeats(1, 24, pedidos)}</Grid>
        <Grid xs={12} md={6} item>{renderSeats(31, 54, pedidos)}</Grid>
      </Grid>
    </div>
  );
};

export default CinemaHall;
