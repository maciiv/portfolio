import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    public render() {
        return (
            <header id="header" className="sticky-top header-inner-pages">
                <Container className="d-flex align-items-center justify-content-between">
                    <NavbarBrand tag={Link} to="/" className="logo">
                        <img src="../assets/img/logo.png" className="img-fluid" />
                    </NavbarBrand>
                    <Navbar id="navbar" className="navbar">
                        <i onClick={this.toggle} className="bi mobile-nav-toggle bi-list"></i>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul>
                                <NavItem>
                                    <NavLink tag={Link} className="nav-link scrollto" to="#hero">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="nav-link scrollto" to="#about">About</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="nav-link scrollto" to="#publications">Publications</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="nav-link scrollto" to="#porfolio">Portfolio</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="nav-link scrollto" to="#blog">Blog</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="nav-link scrollto" to="#contact">Contact</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Navbar>
                </Container>
            </header>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}
