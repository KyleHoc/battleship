//Helper function to compare the coordinate arrays
export function compareArrays(arr1, arr2){
    //Set sameArr to true by default
    let sameArr = true;

    //For each of the two array values
    for(let i = 0; i < 2; i++){
      
      //If the two values at the same index are not the same
      if(arr1[i] != arr2[i]){
        //Set sameArr to false
        sameArr = false;
      }
    }
    //Return sameArr
    return sameArr;
  }


//Helper function for checking for coordinate overlap
export function checkOccupied(start, occupied){
    let match = false;

    //Loop through both arrays and check if any of the coordinates match those already used by the battleship coordinates
    for(let b = 0; b < occupied.length; b++){
        for(let c = 0; c < start.length; c++){
            //Call compareArrays to see if either array shares a coordinate
            match = compareArrays(start[c], occupied[b])

            //If a match is found, exit the inner loop
            if(match) break;
        }
        //If a match is found, exit the outer loop
        if(match) break;
    }

    //Return true if not match found, if a match is found return false
    return match ? false : true;
}