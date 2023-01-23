import { useState, useReducer, useContext, useEffect } from 'react'
import reducer from './reducer'
import React from 'react'
import ReactDOM from 'react-dom/client'
import list from '../list'
import { Buffer } from 'buffer'
import axios from 'axios'
// Create context
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [artistsList, setArtistsList] = useState([])
  const [artistsCards, setArtistsCards] = useState([])
  const [score, setScore] = useState(0)
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    color: '',
  })

  //-----------//

  const fetchUrl = 'https://accounts.spotify.com/api/token'

  useEffect(() => {
    console.log(process.env.REACT_APP_CLIENT_SECRET)
    // Api call for retrieving token

    const fetchToken = async () => {
      const { data } = await axios(fetchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' +
            new Buffer(
              process.env.REACT_APP_CLIENT_ID +
                ':' +
                process.env.REACT_APP_CLIENT_SECRET
            ).toString('base64'),
        },
        data: 'grant_type=client_credentials',
      })

      const {
        data: { artists },
      } = await axios(
        `https://api.spotify.com/v1/artists/1HY2Jd0NmPuamShAr6KMms/related-artists`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + data.access_token,
          },
        }
      )

      setArtistsList(artists)
    }
    fetchToken()
  }, [])

  //---------------*//

  const [isShuffling, setIsShuffling] = useState(true)
  const reset = () => {
    setAlert({ show: false, msg: '', color: '' })
    setIsShuffling(true)
  }
  const checkUserInput = (followerCount) => {
    let mostFollower = 0
    for (let i = 0; i < artistsCards.length; i++) {
      const followers = artistsCards[i].followers.total
      if (followers > mostFollower) {
        mostFollower = followers
      }
    }

    console.log(mostFollower)

    if (score < 2) {
      if (followerCount === mostFollower) {
        setScore(score + 1)
        setAlert({ show: true, msg: 'Good Job', color: 'green' })

        setTimeout(() => {
          reset()
        }, 1000)

        shuffle()
      } else {
        setAlert({ show: true, msg: 'Try Again', color: 'red' })
        setTimeout(() => {
          reset()
        }, 1000)
        shuffle()
      }
    } else {
      if (followerCount === mostFollower && score < 3) {
        setScore(score + 1)
        setAlert({ show: true, msg: 'Reset', color: 'blue' })
      } else if (score < 3) {
        setAlert({ show: true, msg: 'Try Again', color: 'red' })
        setTimeout(() => {
          reset()
        }, 1000)
        shuffle()
      }
    }
  }
  const shuffle = () => {
    let shuffle = setInterval(() => generateRandom(), 100)

    setTimeout(function () {
      clearInterval(shuffle)
      setIsShuffling(false)
    }, 2000)
  }

  const generateRandom = () => {
    const artistsBattle = []

    for (let i = 0; i < 2; i++) {
      const randomNumber = Math.floor(Math.random() * 20)

      artistsBattle.push(artistsList[randomNumber])
    }
    console.log(artistsBattle)
    setArtistsCards(artistsBattle)
  }

  return (
    <AppContext.Provider
      value={{
        shuffle,
        artistsCards,
        checkUserInput,
        score,
        setScore,
        alert,
        setAlert,
        isShuffling,
        reset,
        artistsList,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// Exports

export const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider }
