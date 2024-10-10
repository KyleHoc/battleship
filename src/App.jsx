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
import { nanoid } from 'nanoid';

function App() {

  //Variable for setting the game's end state
  let [end, setEnd] = React.useState(false)

  //Variable for resetting game
  let [restart, setRestart] = React.useState(false)
  
  //Create an array of space objects and give it state
  let [board, setBoard] = React.useState(boardArray)

  //Create an array in state for displaying the game's text component
  let [text, setText] = React.useState(['Turn 0: Ships have been placed, game start'])

  //Store a variable for counting how many times an occupied space is hit
  let [hitCounter, setHitCounter] = React.useState(0)

  //Store a variable for keeping track of the number of turns taken
  let [turnCounter, setTurnCounter] = React.useState(0)

  //Store a variable that initializes the game's start status to false
  let [gameStart, setGameStart] = React.useState(false);

  //Variable for displaying text when the game ends
  let [endText, setEndText] = React.useState("Congratulations! You won!")

  //Variable for toggling challenge mode on and off
  let [challengeMode, setChallengeMode] = React.useState(false);

  let finalCoord;

  function createCoordinates(){
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
    return combinedCoord.concat(destroyerCoord)
  }

  //Call useEffect for setting the board to provide the board's default state and prevent an infinite loop
  //Rerun the effect every time restart is changed to reset the game for another round
  useEffect(() => {
      //Call create coordinates to create a new array of random coordinates for the game
      finalCoord = createCoordinates();
      
      //Loop through finalCoord to change the state of each space that the battleship will occupy
      for(let x = 0; x < finalCoord.length; x++){
        //Change the state of the board so that the spaces with the matching coordinates from finalCoord are occupied
        setBoard(prev => {
          //Map over the board to change the state of the space with the coordinate at the current index of finalCoord
          return prev.map((space) => {
            //Determine if the current coordinate is in the finalCoord array
            let match = compareArrays(space.coordinates, finalCoord[x])
            //If the match is found, set the space's symbol to X and set occupied to true, otherwise map over the unchanged space
            //hit is changed to false no matter what, so that when the game restarts, all spaces will be set to false
            return match ? {...space, symbol: 'X', occupied: true, hit: false} : {...space, hit: false}
          })
        })
      }
  }, [restart])

  //Function that sets the game to it's default state and creates a new board
  function defaultGame(){
    setGameStart(true)
    setBoard(boardArray)
    setRestart(prev => !prev)
    setText(['Turn 0: Ships have been placed, game start'])
    setHitCounter(0)
    setTurnCounter(0)
    setEnd(false);
  }

  //Onclick function for initiating challenge mode, it calls defaultGame, sets challenge mode to true, and sets the end message for challenge mode
  function startChallengeMode(){
    setChallengeMode(true);
    defaultGame();
  }

  //Onclick function for starting the game outside of challenge mode, challenge mode is set to false and the end message is guaranteed to be for winning
  function restartGame(){
    defaultGame()
    setChallengeMode(false)
  }

  //Onclick function for when the user selects a space
  function shoot(id){

    //Set a string variable for building a message for the text component
    let result = 'MISS.';

    //Increment turn counter
    setTurnCounter(prev => prev + 1)

    //Change the state of the board to reflect that a space has been shot at
    setBoard(prev => prev.map(space => {
      //Create a variable to pass over to reflect the new state
      let newSpace = space;

      //Create a new text variable to modify
      let newText = text;

      //Temp variable for building the message string
      let turn = turnCounter + 1;
      

      //When the space with the same ID as the one the user clicked is found:
      if(space.id === id){
        //Set the space's status to hit
        newSpace.hit = true;

        //If the space is occupied by a ship piece, increment the hit counter
        if(space.occupied){
          setHitCounter(prev => prev + 1)

          //Change the result variable to HIT because an occupied space was hit
          result = "HIT!"
        }

        //Build a message string for this turn, and then shift it onto the start of the text array
        let message = `Turn ${turn}: Space ${space.coordinates[0]} - ${space.coordinates[1]}, ${result} `

        if(challengeMode) {
          message = `${message} (Turns remaining: ${24 - turnCounter})`
        }

    
        newText.unshift(message)
        setText(newText)
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
      end={end}
    />
  ))

  //Create an array of text elements to build the text component
  let textElements = text.map(message => (
    <Textbox
      key = {nanoid()} 
      text={message}
    />
  ))

  //useEffect runs every time the hitCounter is updated. When hitCounter == 9, the game is over
  useEffect(() => {
    if(challengeMode && turnCounter > 24){
      setEnd(true)
      setEndText("Out of shots, you lost!")
    }

    if(hitCounter > 8){
      setEndText("Congratulations! You won!")
      setEnd(true)
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

  <Col xs={10} md={5} className='right-col mt-4 text-left'>
    <div className="card text-white bg-primary text-container"> 
        <div className="card-header">Turn: {turnCounter} &nbsp; &nbsp; Hits: {hitCounter}</div>
        <div className="card-body">
           {end && <div className="bg-white text-black p-2">
                      <p>{endText}</p>
                      <button className="btn btn-primary" onClick={restartGame}>Play Again</button>
                      <button className="btn btn-danger mx-2" onClick={startChallengeMode}>Challenge Mode</button>
                  </div>
           }
           {textElements}
        </div>
    </div>
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
            <Start restartGame={() => restartGame()} challengeMode={() => startChallengeMode()}/>
          </div> 
        
        }
    </>
  )
}

export default App
