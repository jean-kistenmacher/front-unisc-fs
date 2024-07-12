import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'

const Movie = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
          params: {
            api_key: '85ea1c41a1f680279fe08994d6f97d5f',
            language: 'pt-BR',
            page: 1
          }
        });
        const moviesSlice = response.data.results.slice(0, 4);
        setMovies(moviesSlice);
      } catch (error) {
        console.error('Erro ao buscar filmes em cartaz:', error);
      }
    };

    fetchMovies();
  }, []);

  const navigate = useNavigate()

  return (
    <Container maxWidth="lg" sx={
      {
        marginTop: "5rem",
        marginBottom: "5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }
    }>

      <Typography variant='h3'>
        <strong>Selecione o seu Filme!</strong>
      </Typography>
      <Grid container spacing={3} sx={{ marginTop: "1rem", marginBottom: "3rem" }}>
        {movies.map(movie => (
          <Grid item xs={12} sm={6} md={3} key={movie.id}>
            <Card sx={{ height: "100%" }} onClick={() => navigate(`/checkout/${movie.id}`)}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="300"
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <CardContent sx={{ paddingBottom: 2 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Lançamento: {movie.release_date}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};


export default Movie
