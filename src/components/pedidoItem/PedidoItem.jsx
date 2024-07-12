import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';


const PedidoItem = ({ pedido }) => {

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleCancel = async (idPedido) => {
    try {
      await axios.delete(`https://back-unisc-fs-99044e004fb3.herokuapp.com/pedidos/${idPedido}`);
      alert(`Reserva cancelada!`);
      window.location.reload();
    } catch (error) {
      console.error('Erro ao cancelar reserva:', error);
    }
  };

  const handlePay = async (idPedido) => {
    try {
      const response = await axios.put(`https://back-unisc-fs-99044e004fb3.herokuapp.com/pedidos/${idPedido}`, {
        status: "Pago"
      });
      alert(`Gerando boleto poltrona ${response.data.poltrona}!`);
      const responsePDF = await axios.get(`https://back-unisc-fs-99044e004fb3.herokuapp.com/pedidos/boleto/${idPedido}`, { responseType: 'blob' });
      window.open(URL.createObjectURL(responsePDF.data));
      window.location.reload();
    } catch (error) {
      console.error('Erro ao gerar boleto:', error);
    }
  };

  const handleGenerateDoc = async (idPedido) => {
    try {
      const responsePDF = await axios.get(`https://back-unisc-fs-99044e004fb3.herokuapp.com/pedidos/comprovante/${idPedido}`, { responseType: 'blob' });
      window.open(URL.createObjectURL(responsePDF.data));
    } catch (error) {
      console.error('Erro ao gerar comprovante:', error);
    }
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant='h5' sx={{ marginBottom: "0.3rem" }}><strong>{pedido.filme}</strong></Typography>
            <Typography sx={{ marginBottom: "1.5rem" }}><strong>Código: {pedido.id}</strong></Typography>
            <Typography sx={{ marginBottom: "0.5rem" }}>Poltrona: {pedido.poltrona}</Typography>
            <Typography sx={{ marginBottom: "0.5rem" }}>Sessão: {pedido.sessao}</Typography>
            <Typography sx={{ marginBottom: "0.5rem" }}>Data: {dayjs(pedido.date).format('DD/MM/YYYY')}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Valor: {formatCurrency(pedido.preco)}</Typography>
            <Typography>Status: {pedido.status}</Typography>
            <Grid container spacing={1} sx={{ mt: 2 }}>
              {pedido.status === "Reservado" &&
                <>
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={() => handlePay(pedido.id)}><strong>Realizar Pagamento</strong></Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="error" onClick={() => handleCancel(pedido.id)}><strong>Cancelar Reserva</strong></Button>
                  </Grid>
                </>
              }

              {pedido.status === "Pago" &&
                <Grid item>
                  <Button variant="contained" color="success" onClick={() => handleGenerateDoc(pedido.id)}><strong>Gerar Comprovante</strong></Button>
                </Grid>
              }
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PedidoItem;
