import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/authContext'
import { useParams } from 'react-router-dom';
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

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/pt-br';

const Checkout = () => {
  const { currentUser } = useAuth()

  const { id } = useParams();
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [movie, setMovie] = useState([]);

  const [hall, setHall] = useState('');
  const [price, setPrice] = useState(0);

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

  const handleReserve = () => {
    // Lógica para reserva
    alert('Reservado!');
  };

  const handleBuy = () => {
    // Lógica para compra
    alert('Comprado!');
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ marginTop: "12rem" }}>
        <Grid container spacing={8}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3}>
              <CinemaHall onSeatSelect={setSelectedSeat} />
            </Paper>
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
                      <MenuItem value={10}>Sala 01 - 17:00h</MenuItem>
                      <MenuItem value={20}>Sala 02 - 19:00h</MenuItem>
                      <MenuItem value={30}>Sala 03 - 21:00h</MenuItem>
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

                  <Button fullWidth variant="contained" color="primary" onClick={handleReserve}>
                    <strong>Reservar</strong>
                  </Button>

                  <Button fullWidth variant="contained" color="secondary" onClick={handleBuy}>
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
