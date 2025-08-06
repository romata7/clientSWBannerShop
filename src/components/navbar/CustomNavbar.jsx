import { Container, Nav, Navbar } from 'react-bootstrap';
import { PersonFill, Tools, ClockHistory, ClipboardCheck, Gear } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';

export const CustomNavbar = () => {
    return (
        <Navbar expand='md' className='bg-body-tertiary shadow mb-4 sticky-top'>
            <Container>
                <Navbar.Brand
                    as={NavLink}
                    to="/"
                    className='d-flex gap-1 align-items-center brand-hover'
                    style={{ fontSize: '1.1rem' }}
                >
                    <Gear className="text-primary" size={20} />
                    <span className='fw-bold ms-1'>Control Interno Impresiones</span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {[
                            { path: "/clientes", icon: <PersonFill size={18} />, text: "Clientes" },
                            { path: "/servicios", icon: <Tools size={18} />, text: "Servicios" },
                            { path: "/pendientes", icon: <ClockHistory size={18} />, text: "Pendientes" },
                            { path: "/ordenes", icon: <ClipboardCheck size={18} />, text: "Órdenes" }
                        ].map((item) => (
                            <Nav.Link
                                key={item.path}
                                as={NavLink}
                                to={item.path}
                                className={({ isActive }) =>
                                    `d-flex align-items-center  mx-2 px-3 nav-item ${isActive ? 'active fw-semibold' : ''}`
                                }
                                style={({ isActive }) => ({
                                    color: isActive ? '#0d6efd' : '#495057',
                                    borderBottom: isActive ? '3px solid #0d6efd' : '3px solid transparent',
                                    transition: 'all 0.5s ease',
                                    borderRadius: '0',
                                    whiteSpace: 'nowrap'
                                })}
                            >
                                <span className="me-2">{item.icon}</span>
                                <span>{item.text}</span>
                            </Nav.Link>
                        ))}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};