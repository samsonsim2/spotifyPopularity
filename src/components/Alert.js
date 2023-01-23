import { Box, Button } from '@mui/material'
import React from 'react'
import { useAppContext } from '../context/appContext'

const Alert = ({ alert }) => {
  const alertColor = alert.color
  const alertMessage = alert.msg
  const { reset, setScore, shuffle } = useAppContext()
  const restart = () => {
    setScore(0)
    shuffle()
    reset()
  }
  return (
    <Box
      sx={{
        bgcolor: alertColor,
        mt: 10,
        p: 3,
        borderRadius: 5,
        color: 'white',
        width: 100,
        textAlign: 'center',
      }}
      onClick={() => {
        if (alertMessage === 'Reset') {
          restart()
        }
      }}
    >
      {alertMessage}
    </Box>
  )
}

export default Alert
