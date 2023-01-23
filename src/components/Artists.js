import { Box, Avatar, Typography, Card, CardMedia } from '@mui/material'
import AspectRatio from '@mui/joy/AspectRatio'

import { bgcolor, borderRadius, width } from '@mui/system'
import React from 'react'
import list from '../list'
import { useAppContext } from '../context/appContext'
const Artists = ({ artists }) => {
  const { artistsCards, shuffle, checkUserInput, isShuffling, artistsList } =
    useAppContext()
  if (artistsList.length > 0) {
    artistsList.map((artist) => {
      console.log(artist.images[0].url)
      console.log(artist.followers.total)
    })
  }

  if (artistsCards.length > 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
        }}
      >
        {artistsCards.map((artist) => {
          return (
            <Card
              onClick={() => {
                if (!isShuffling) {
                  checkUserInput(artist.followers.total)
                }
              }}
              sx={{
                height: 200,
                width: 250,
                '&:hover': {
                  transform: 'scale3d(1.1, 1.1, 1)',
                  transition: 'transform 0.15s ease-in-out',
                },
                p: 6,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <CardMedia
                sx={{
                  height: 150,
                  width: 150,
                  borderRadius: '50%',
                  objectFit: 'contain',
                }}
                image={artist.images[0].url}
              ></CardMedia>
              <Typography sx={{ mt: 5 }} align='center' variant='h7'>
                {artist.name}
              </Typography>
            </Card>
          )
        })}
      </Box>
    )
  } else return <h2>Loading...</h2>
}

export default Artists
