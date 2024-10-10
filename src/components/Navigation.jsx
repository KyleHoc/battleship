import { Nav } from "react-bootstrap";

export default function Navbar(){
    return (
        <Nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href=".">Battleship: REACT</a>
                <a className="repo" href="https://github.com/KyleHoc/battleship">Source Repository</a>
            </div>
        </Nav>
    )
}