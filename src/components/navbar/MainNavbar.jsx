import { Container, Nav, Navbar } from "react-bootstrap";
import { ClipboardCheck, ClockHistory, Gear, PersonFill, Tools } from "react-bootstrap-icons";
import { NavLink, useLocation } from "react-router-dom";

export const MainNavbar = () => {
    const { pathname } = useLocation();

    return (
        <Navbar expand="md" className="shadow" bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={NavLink} to="/" className="fw-bold">
                    <Gear /> Control Interno Imprenta
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="main-navbar-collapse" />

                <Navbar.Collapse id="main-navbar-collapse">
                    <Nav>
                        {[
                            { path: "/clientes", icon: <PersonFill />, text: "Clientes" },
                            { path: "/servicios", icon: <Tools />, text: "Servicios" },
                            { path: "/pendientes", icon: <ClockHistory />, text: "Pendientes" },
                            { path: "/ordenes", icon: <ClipboardCheck />, text: "Ordenes" },
                        ].map(({ path, icon, text }) => (
                            <Nav.Link
                                key={path}
                                as={NavLink}
                                to={path}
                                className={pathname === path ? 'text-decoration-underline fw-bold' : ''}
                            >
                                {icon} {text}
                            </Nav.Link>
                        ))}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};