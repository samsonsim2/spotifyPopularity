import logo from './logo.svg'
import './App.css'
import Artists from './components/Artists'
import { Box, Avatar, Typography, Button, AppBar } from '@mui/material'
import { useState, useEffect } from 'react'
import list from './list'
import { useAppContext } from './context/appContext'
import Alert from './components/Alert'

function App() {
  const { shuffle, score, alert, setAlert, artistsList } = useAppContext()

  useEffect(() => {
    if (artistsList.length > 0) {
      shuffle()
    }
  }, [artistsList])

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',

          height: '100vh',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Box
          sx={{
            backgroundColor: score === 3 ? '#8bc34a' : '#ffd54f',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            variant='h3'
            sx={{
              mt: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            Battle of the popstars
          </Typography>
          <Typography variant='h6' sx={{ mb: 5 }}>
            {score === 3 ? 'Congratulations you win' : `Score: ${score}`}
          </Typography>
        </Box>
        <Box
          sx={{
            mt: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant='h4' sx={{ mb: 10 }}>
            Who is more popular?
          </Typography>
          <Artists />

          {alert.show && <Alert alert={alert} />}
        </Box>
      </Box>
    </>
  )
}

export default App
