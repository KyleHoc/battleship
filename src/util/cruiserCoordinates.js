//This function uses the board array to return an array of random, viable coordinates
//for placing the cruiser piece on the board

import { checkOccupied } from "./compareArrays";

//Export function and take board as a parameter
export function cruiserCoordinates(board, occupiedArr){

    //Boolean value for breaking the while loop once coordinates are found
    let foundCoord = false;

    //Set a random number for determining if the ship will be placed horizontally or vertically
    //0 == horizontally while 1 == vertically
    let orientation = Math.floor(Math.random() * 2)

    let random, startSpace, startArray;

    //While the coordinates have yet to be found
    while(!foundCoord){
        //Set a random number between 0 and 63 (values that can be array indexes in our board array)
        random = Math.floor(Math.random() * (63 - 0) ) + 0;

        //Set start space to a random space on the board
        startSpace = board[random].coordinates;

        //Determine the placement of the piece (0 == horizontal, 1 == vertical)
        if(orientation == 0) {

            //If the y coordinate of the start space is less than six, then the piece can be placed there horizontally

            //So if the piece can be placed:
            if(startSpace[1] < 7){
                //Create an array containing the coordinates of each space that the piece will occupy
                startArray = [startSpace, board[random + 1].coordinates, board[random + 2].coordinates]
                
                //Determine if the coordinate array is viable by checking for overlap between it and occupiedArr
                //If checkOccupied returns true, no overlap is found and the loop will be broken, otherwise the loop will continue
                foundCoord = checkOccupied(startArray, occupiedArr)
            }
        } else {
            //If the x coordinate of the start space is less than six, then the piece can be placed there vertically

            //So if the piece can be placed:
            if(startSpace[0] < 7){
                //Create an array containing the coordinates of each space that the piece will occupy
                startArray = [startSpace, board[random + 8].coordinates, board[random + 16].coordinates]

                //Determine if the coordinate array is viable by checking for overlap between it and occupiedArr
                //If checkOccupied returns true, no overlap is found and the loop will be broken, otherwise the loop will continue
                foundCoord = checkOccupied(startArray, occupiedArr)
            }
        }
    }

    //Return start array
    return startArray;
}