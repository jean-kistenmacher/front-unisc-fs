import React from 'react';
import { Container, Grid, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import cinema from '../../assets/cinema.jpg';
import bus from '../../assets/bus.jpg';
import concerto from '../../assets/concerto.jpg';
import palestra from '../../assets/palestra.jpg';
import { useNavigate } from 'react-router-dom'

const Home = () => {

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
                <strong>Como você gostaria de usar o SeatPay?</strong>
            </Typography>
            <Grid container spacing={4} sx={{ marginTop: "1rem", marginBottom: "3rem" }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ height: "100%" }}>
                        <CardActionArea onClick={() => navigate('/comprar')}>
                            <CardMedia
                                component="img"
                                image={cinema}
                                alt="cinema"
                                sx={{ height: "300px" }}
                            />
                            <CardContent sx={{ paddingBottom: 2 }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Cinema
                                </Typography>
                                <Typography variant="body2" color="darkgreen" component="p">
                                    <strong>Disponível</strong>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ height: "100%" }}>
                        <CardMedia
                            component="img"
                            sx={{ height: "300px" }}
                            image={bus}
                            alt="viagem"
                        />
                        <CardContent sx={{ paddingBottom: 2 }}>
                            <Typography gutterBottom variant="h5" component="div">
                                Viagens
                            </Typography>
                            <Typography variant="body2" color="darkred" component="p">
                                <strong>Em Breve!</strong>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardMedia
                            component="img"
                            sx={{ height: "300px" }}
                            image={concerto}
                            alt="concerto"
                        />
                        <CardContent sx={{ paddingBottom: 2 }}>
                            <Typography gutterBottom variant="h5" component="div">
                                Concertos
                            </Typography>
                            <Typography variant="body2" color="darkred" component="p">
                                <strong>Em Breve!</strong>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardMedia
                            component="img"
                            sx={{ height: "300px" }}
                            image={palestra}
                            alt="palestras"
                        />
                        <CardContent sx={{ paddingBottom: 2 }}>
                            <Typography gutterBottom variant="h5" component="div">
                                Eventos/Palestras
                            </Typography>
                            <Typography variant="body2" color="darkred" component="p">
                                <strong>Em Breve!</strong>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>

    )
}

export default Home
