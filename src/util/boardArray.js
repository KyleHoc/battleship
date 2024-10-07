import { nanoid } from "nanoid"

//Create an empty array for building the board array of objects
let tempArray = []

//Populate the tempBoard array with the coordinates to create an 8x8 grid ([1,1] through [8.8])
for(let x = 1; x < 9; x++){
 for(let y = 1; y < 9; y++){
  tempArray.push([x,y])
 } 
} 

//Map the tempArray to create an array of space objects holding the coordinates of the original tempArray
tempArray = tempArray.map((coord) => {

  //These space objects will be used to create the battleship board
  let space = {
    id: nanoid(),
    coordinates: coord,
    hit: false,
    symbol: 'O',
    occupied: false
  }

  return space;
})

//Export the board array
export let boardArray = tempArray;