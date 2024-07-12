import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/authContext'
import { useParams, useNavigate } from 'react-router-dom';
import CinemaHall from '../cinema/CinemaHall'
import dayjs from 'dayjs';

import {
  Container,
  Grid,
  Paper,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import SquareIcon from '@mui/icons-material/Square';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/pt-br';

const Checkout = () => {
  const { currentUser } = useAuth()
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [movie, setMovie] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  const [selectedOption, setSelectedOption] = useState('');
  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    const fetchMovieById = async (id) => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: '85ea1c41a1f680279fe08994d6f97d5f',
            language: 'pt-BR'
          }
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do filme:', error);
      }
    }
    fetchMovieById(id);
  }, [id]);


  const fetchPedidoBySessao = async (sessao, date, title) => {
    try {
      const response = await axios.post(`https://back-unisc-fs-99044e004fb3.herokuapp.com/pedidos/sessao`, {
        filme: title,
        sessao: sessao,
        date: date
      });
      setPedidos(response.data);
    } catch (error) {
      console.error('Erro ao buscar detalhes do filme:', error);
    }
  }

  const validateForm = () => {
    if (!selectedSeat) {
      alert("Selecione uma poltrona!")
      return true;
    }
    if (!selectedOption) {
      alert("Selecione uma sessão!")
      return true;
    }
    if (!selectedDate) {
      alert("Informe uma data!")
      return true;
    }
  }

  const handleReserve = async (usuario) => {
    if (validateForm()) {
      return
    }
    try {
      const response = await axios.post(`https://back-unisc-fs-99044e004fb3.herokuapp.com/pedidos`, {
        filme: movie.title,
        usuario: usuario,
        sessao: selectedOption,
        preco: 39.90,
        poltrona: selectedSeat,
        status: "Reservado",
        date: selectedDate
      });
      alert(`Poltrona ${response.data.poltrona} Reservada!`);
      navigate("/pedidos");
    } catch (error) {
      console.error('Erro ao realizar reserva:', error);
    }
  };

  const handleBuy = async (usuario) => {
    if (validateForm()) {
      return
    }
    try {
      const response = await axios.post(`https://back-unisc-fs-99044e004fb3.herokuapp.com/pedidos`, {
        filme: movie.title,
        usuario: usuario,
        sessao: selectedOption,
        preco: 39.90,
        poltrona: selectedSeat,
        status: "Pago",
        date: selectedDate
      });
      alert(`Gerando boleto poltrona ${response.data.poltrona}!`);
      const responsePDF = await axios.get(`https://back-unisc-fs-99044e004fb3.herokuapp.com/pedidos/boleto/${response.data.id}`, { responseType: 'blob' });
      window.open(URL.createObjectURL(responsePDF.data));
      navigate("/pedidos");
    } catch (error) {
      console.error('Erro ao realizar compra:', error);
    }
  };

  const handleOptionChange = async (event) => {
    setSelectedOption(event.target.value);
    if (selectedDate && event.target.value) {
      fetchPedidoBySessao(event.target.value, selectedDate, movie.title);
      console.log(pedidos)
    }
  };

  const handleDateChange = async (newDate) => {
    setSelectedDate(newDate);
    if (selectedOption && newDate) {
      fetchPedidoBySessao(selectedOption, newDate, movie.title);
      console.log(pedidos)
    }
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ marginTop: "12rem" }}>
        <Grid container spacing={8}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3}>
              <CinemaHall onSeatSelect={setSelectedSeat} pedidos={pedidos} />
            </Paper>
            <Box sx={{ marginTop: "1rem" }}>
              <Typography variant='h5' sx={{ marginBottom: "1rem" }}><strong>Legenda:</strong></Typography>
              <Typography variant='h6'><SquareIcon color="secondary" /><strong>Reservado</strong></Typography>
              <Typography variant='h6'><SquareIcon color="error" /><strong>Ocupado</strong></Typography>
              <Typography variant='h6'><SquareIcon color="success" /><strong>Selecionado</strong></Typography>
            </Box>
          </Grid>
          {console.log(movie)}
          {console.log(currentUser.email)}
          <Grid item xs={12} md={4}>
            <Paper elevation={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                <Box
                  component="form"
                  sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: "2rem" }}
                >
                  <Typography variant='h4'><strong>{movie.title}</strong></Typography>

                  <FormControl fullWidth>
                    <InputLabel id="select-label">Sessão</InputLabel>
                    <Select
                      labelId="select-label"
                      value={selectedOption}
                      label="Sessão"
                      onChange={handleOptionChange}
                    >
                      <MenuItem value={"Sala 01 - 17:00h"}>Sala 01 - 17:00h</MenuItem>
                      <MenuItem value={"Sala 02 - 19:00h"}>Sala 02 - 19:00h</MenuItem>
                      <MenuItem value={"Sala 03 - 21:00h"}>Sala 03 - 21:00h</MenuItem>
                    </Select>
                  </FormControl>

                  <DatePicker
                    label="Data"
                    value={selectedDate}
                    onChange={handleDateChange}
                    inputFormat="DD/MM/YYYY"
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />


                  <Typography variant='h6'><strong>Poltrona Selecionada: {selectedSeat}</strong></Typography>

                  <Typography variant='h3' sx={{ alignSelf: "end" }}><strong>R$ 39,90</strong></Typography>

                  <Button fullWidth variant="contained" color="secondary" onClick={() => handleReserve(currentUser.email)}>
                    <strong>Reservar</strong>
                  </Button>

                  <Button fullWidth variant="contained" color="primary" onClick={() => handleBuy(currentUser.email)}>
                    <strong>Comprar</strong>
                  </Button>
                </Box>
              </LocalizationProvider>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Checkout
