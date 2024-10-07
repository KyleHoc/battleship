import { useEffect, useState } from 'react'
import 'bootswatch/dist/lumen/bootstrap.min.css';
import Navigation from './components/Navigation'
import Textbox from './components/Textbox'
import Board from './components/Board'
import Container from 'react-bootstrap/Container';
import Start from './components/Start'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css'
import React from 'react'
import { boardArray } from './util/boardArray'
import { battleshipCoordinates } from './util/battleshipCoordinates';
import { cruiserCoordinates } from './util/cruiserCoordinates';
import { destroyerCoordinates } from './util/destroyerCoordinates';
import { compareArrays } from './util/compareArrays';
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  
  //Create an array of space objects and give it state
  let [board, setBoard] = React.useState(boardArray)

  //Store a variable for counting how many times an occupied space is hit
  let [hitCounter, setHitCounter] = React.useState(0)
 
  //Store a variable for displaying victory text
  let [winText, setWinText] = React.useState('');

  let [gameStart, setGameStart] = React.useState(false);

  var w = window.innerWidth;

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

  //Function for beginning the game by setting start game to true
  function beginGame(){
      setGameStart(true);
  }

  //Onclick function for when the user selects a space
  function shoot(id){
    //Change the state of the board to reflect that a space has been shot at
    setBoard(prev => prev.map(space => {
      //Create a variable to pass over to reflect the new state
      let newSpace = space;

      //When the space with the same ID as the one the user clicked is found:
      if(space.id === id){
        //Set the space's status to hit
        newSpace.hit = true;

        //If the space is occupied by a ship piece, increment the hit counter
        if(space.occupied){
          setHitCounter(prev => prev + 1)
        }
      }

      //Return the updated space
      return newSpace;
    }))
  }

  //Create an array of board elements for displaying the battleship spaces
  let boardElements = board.map(space => (
    <Board
      key={space.id}
      coord={space.coordinates}
      symbol={space.symbol}
      occupied={space.occupied}
      hit={space.hit}
      shoot={() => shoot(space.id)}
    />
  ))

  //useEffect runs every time the hitCounter is updated. When hitCounter == 9, the game is over
  useEffect(() => {
    if(hitCounter > 8){
      setWinText("YOU WIN")
    }
  }, [board])

  //Variable for holding the game board and text component
  let game = <Row className='pt-2 pb-5 text-center d-flex justify-content-center center'>
  <Col xs={12} md={7} className="left-col">
      <div className='num-col'>
        <h4>1</h4> <h4>2</h4> <h4>3</h4> <h4>4</h4> <h4>5</h4> <h4>6</h4> <h4>7</h4> <h4>8</h4>
      </div>
    <div className='board-container'>
      <h4>1</h4> <h4>2</h4> <h4>3</h4> <h4>4</h4> <h4>5</h4> <h4>6</h4> <h4>7</h4> <h4>8</h4>
      {boardElements}
    </div>
  </Col>

  <Col xs={3} md={3}>{w} <br />
    <Textbox />
  </Col>
</Row> 


  return (
    <>
      <Navigation />

        {gameStart ? 
        <Container className='bg-white mt-4 mb-5'>

          {game} 
        </Container> 
        : <div className='mt-5 start-card d-flex justify-content-center'>
            <Start beginGame={() => beginGame()} />
          </div> 
        
        }
    </>
  )
}

export default App
