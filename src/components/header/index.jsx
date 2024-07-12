import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { doSignOut } from '../../firebase/auth'
import { Button } from '@mui/material'

const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()
    return (
        <nav className='flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 h-12 border-b place-content-center items-center bg-gray-200'>
            {
                userLoggedIn
                    ?
                    <>
                        <Button variant="contained" onClick={() => navigate('/inicio')}>
                            Início
                        </Button>

                        <Button variant="contained" onClick={() => navigate('/comprar')}>
                            Comprar Ingresso
                        </Button>

                        <Button variant="contained" onClick={() => navigate('/pedidos')}>
                            Meus Pedidos
                        </Button>

                        <Button variant="contained" color="error" onClick={() => { doSignOut().then(() => { navigate('/login') }) }}>
                            <strong>Sair</strong>
                        </Button>

                    </>
                    :
                    <>
                        <Button variant="contained" onClick={() => navigate('/login')}>
                            Login
                        </Button>

                        <Button variant="contained" onClick={() => navigate('/registrar')}>
                            Registrar
                        </Button>
                    </>
            }

        </nav>
    )
}

export default Header
