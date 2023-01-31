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
    artistsList.map((artist) => {})
  }

  if (artistsCards.length > 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 3, md: 10 },
          alignItems: 'center',
        }}
      >
        {artistsCards.map((artist, index) => {
          return (
            <Card
              key={index}
              onClick={() => {
                if (!isShuffling) {
                  checkUserInput(artist.followers.total)
                }
              }}
              sx={{
                height: { xs: 150, md: 200 },
                width: { xs: 150, md: 250 },
                '&:hover': {
                  transform: 'scale3d(1.1, 1.1, 1)',
                  transition: 'transform 0.15s ease-in-out',
                },
                p: { xs: 3, md: 6 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <CardMedia
                sx={{
                  height: { xs: 100, md: 150 },
                  width: { xs: 100, md: 150 },
                  borderRadius: '100%',
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
