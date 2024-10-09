//The Start element greets the player, explains the rules of the game, and provides a button to start the game

//Export the Start element and provide props for passing in the start game function
export default function Start(props){

    //Return a button to be displayed on the board, setting it's contents based on whether or not it has been hit
    return (
        <div className="card border-primary mb-3 text-center col-lg-7 col-md-9 col-sm-12">
            <div className="card-header bg-primary text-light"><h4 className="text-white">Welcome to Battleship: REACT</h4></div>
            <div className="card-body">
                <h4 className="card-title">Rules:</h4>
                <ul className="text-left">
                    <li>Three ships are randomly hidden on an 8x8 grid: Battleship &#40;4 squares&#41;, Cruiser &#40;3 squares&#41;, and Destroyer &#40;2 squares&#41; </li>
                    <li>The goal of the game is to sink all three ships by clicking a space to shoot it</li>
                    <li>A "O" means that your shot missed. An "X" denotes a hit</li>
                    <li>The game ends automatically once all nine target spaces have been hit</li>
                </ul>
                <button className="btn btn-primary start-btn" onClick={props.beginGame}>
                    Start Game
                </button>
            </div>
        </div>
    )
}