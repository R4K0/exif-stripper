import { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";

class Navigation extends Component {
    render() {
        return (
            <Navbar variant="dark" bg="dark" style={{marginBottom:"2rem"}}>
                <Navbar.Brand>
                    Exif-Toolset
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                    </Nav>

                </Navbar.Collapse>

            </Navbar>
        )
    }
}

export default Navigation;