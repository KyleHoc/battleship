//The board element consists of a space that will be displayed on the 8x8 grid for the game UI
//to be assembled in App.js

//Export a board element for displaying spaces to make up an 8x8 grid
export default function Board(props){
    //Styles object for changing a space's text to red when the player hits a ship
    const styles = {
        color: props.hit && props.occupied &&'Red'
    }

    let symbol = <i className="bi bi-tsunami"></i>

    //Return a button to be displayed on the board, setting it's contents based on whether or not it has been hit
    return (
        <button className='btn btn-primary space-btn' style={styles} onClick={props.shoot} disabled={props.hit || props.end}>
            {props.hit ? props.symbol : symbol }
        </button>
    )
}