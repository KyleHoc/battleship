import { useEffect, useState } from 'react'
import 'bootswatch/dist/lumen/bootstrap.min.css';
import Navigation from './components/Navigation'
import Textbox from './components/Textbox'
import Board from './components/Board'
import { Container, Row, Col } from 'react-bootstrap';
import './App.css'
import React from 'react'
import { boardArray } from './util/boardArray'
import { battleshipCoordinates } from './util/battleshipCoordinates';
import { cruiserCoordinates } from './util/cruiserCoordinates';
import { destroyerCoordinates } from './util/destroyerCoordinates';
import { compareArrays } from './util/compareArrays';
import {nanoid} from 'nanoid'

function App() {
  //Create an array of space objects and give it state
  let [board, setBoard] = React.useState(boardArray)

  //Obtain an array of coordinates to place the battleship piece
  //  by calling the battleshipCoordinates function using the board array
  let battleshipCoord = battleshipCoordinates(boardArray)

  //Get a set of viable coordinates for placing the cruiser piece
  let cruiserCoord = cruiserCoordinates(boardArray, battleshipCoord)

  //Combine the battleship and cruiser coordinates into one array
  let combinedCoord = battleshipCoord.concat(cruiserCoord)

  //Use the combinedCoord array to get a viable set of coordinates for placing the destroyer ship
  let destroyerCoord = destroyerCoordinates(boardArray, combinedCoord)

  //Join all three coordinate arrays into one
  let finalCoord = combinedCoord.concat(destroyerCoord)

  console.log(finalCoord)

  //Call useEffect for setting the board to provide the board's default state and prevent an infinite loop
  useEffect(() => {
      //Loop through battleshipCoord to change the state of each space that the battleship will occupy
      for(let x = 0; x < finalCoord.length; x++){
        //Change the state of the board so that the spaces with the matching coordinates from battleshipCoord are occupied
        setBoard(prev => {
          //Map over the board to change the state of the space with the coordinate at the current index of battleshipCoord
          return prev.map((space) => {
            //Determine if the current coordinate is in the finalCoord array
            let match = compareArrays(space.coordinates, finalCoord[x])
            //If the match is found, set the space's symbol to X and set occupied to true, otherwise map over the unchanged space
            return match ? {...space, symbol: 'X', occupied: true} : space
          })
        })
      }
  }, [])

  let boardElements = board.map(space => (
    <Board
      
    />
  ))


  return (
    <>
      <Navigation />

      <Container className='center text-center'>
        <div className='board-container mx-auto pt-4'>
          




        </div>
        {/* <Row>
          <Col>
            <Textbox />
          </Col>

          <Col>
            <Board />
          </Col>
        </Row> */}
      </Container>
    </>
  )
}

export default App
