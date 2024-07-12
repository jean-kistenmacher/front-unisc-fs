import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/authContext'
import { Container, Typography } from '@mui/material';
import PedidoItem from '../pedidoItem/PedidoItem';
import 'dayjs/locale/pt-br';

const Pedidos = () => {
  const { currentUser } = useAuth()
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidosByUser = async (userMail) => {
      try {
        const response = await axios.get(`https://back-unisc-fs-99044e004fb3.herokuapp.com/pedidos/usuario/${userMail}`);
        setPedidos(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Erro ao buscar pedidos do usuário:', error);
      }
    }
    fetchPedidosByUser(currentUser.email);
  }, [currentUser.email]);

  return (
    <>
      <Container sx={{ marginTop: "6rem" }}>
        <Typography variant="h4" sx={{ mb: 4 }}>Lista de Pedidos</Typography>
        {!pedidos.length && <Typography variant='h6'><strong>Não foram encontrados Pedidos</strong></Typography>}
        {pedidos.map((pedido) => (
          <PedidoItem key={pedido.id} pedido={pedido} />
        ))}
      </Container>
    </>


  )
}

export default Pedidos
