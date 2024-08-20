import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Link } from "react-router-dom";


const NavbarApp = () => {
    const total = 25000;
    const token = false;

    return (
        <Navbar collapseOnSelect expand="lg" className="custom-navbar" sticky="top">
            <Container>
                <Navbar.Brand  className="text-white">
                    <Image className='logo' src="https://static.vecteezy.com/system/resources/previews/036/485/265/original/kawaii-pizza-slice-cartoon-character-flat-design-png.png" />
                    Pizzería delicias de Alondra!
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id="tooltip-home">Ir a la página principal</Tooltip>}
                        >
                            <Link to="/" className='btn1'>🍕Home</Link>
                        </OverlayTrigger>
                        {token ? (
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip id="tooltip-profile">Ver perfil</Tooltip>}
                            >
                                <Link to="/profile" className='btn1'>🔓Profile</Link>
                            </OverlayTrigger>
                        ) : (
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip id="tooltip-login">Iniciar sesión</Tooltip>}
                            >
                                <Link to="/login" className='btn1'>🔐Login</Link>
                            </OverlayTrigger>
                        )}
                        {token ? (
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip id="tooltip-logout">Cerrar sesión</Tooltip>}
                            >
                                <Link to="/" className='btn1'>🔒Logout</Link>
                            </OverlayTrigger>
                        ) : (
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip id="tooltip-register">Registrarse</Tooltip>}
                            >
                                <Link to="/register" className='btn1'>🔐Register</Link>
                            </OverlayTrigger>
                        )}
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id="tooltip-home">Visita tu perfil</Tooltip>}
                        >
                            <Link to="/profile" className='btn1'>🔓Profile</Link>
                        </OverlayTrigger>
                    </Nav>
                    <Nav>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id="tooltip-cart">Ver carrito de compras</Tooltip>}
                        >
                            <Link to="/cartShooping" className='btn2'>🛒Total: {total.toLocaleString()} $</Link>
                        </OverlayTrigger>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarApp;
