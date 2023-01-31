import logo from './logo.svg'
import './App.css'
import Artists from './components/Artists'
import {
  Box,
  Avatar,
  Typography,
  Button,
  AppBar,
  NativeSelect,
} from '@mui/material'
import { useState, useEffect } from 'react'

import { useAppContext } from './context/appContext'
import Alert from './components/Alert'
import InputLabel from '@mui/material/InputLabel'

import FormControl from '@mui/material/FormControl'

function App() {
  const {
    shuffle,
    score,
    alert,
    setAlert,
    artistsList,
    catergory,
    setCatergory,
  } = useAppContext()
  console.log('test')

  const handleChange = (event) => {
    setCatergory(event.target.value)
  }

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
          width: '100vw',

          height: '100vh',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Box
          sx={{
            backgroundColor: score === 3 ? '#8bc34a' : '#ffd54f',
            width: '100vw',
            height: '20vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            variant={'h3'}
            sx={{
              mt: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: { xs: 30, md: 40 },
            }}
          >
            Battle of the popstars
          </Typography>
          <Box>
            <FormControl fullWidth>
              <InputLabel variant='standard' htmlFor='uncontrolled-native'>
                Catergory
              </InputLabel>
              <NativeSelect
                defaultValue={0}
                inputProps={{
                  name: 'age',
                  id: 'uncontrolled-native',
                }}
                disabled={score === 0}
                onChange={handleChange}
                sx={{ height: 20, background: 'white' }}
              >
                <option value={0}>Pop</option>
                <option value={1}>Mando-pop</option>
                <option value={2}>Rap</option>
              </NativeSelect>
            </FormControl>
          </Box>
          <Typography variant='h6' sx={{ mb: 0 }}>
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
          <Typography variant='h6' sx={{ mb: 5 }}>
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
