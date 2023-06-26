import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, Row, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

function Header({history}) {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
        // history.push('/login?redirect=shipping')
    }

    return (
        <header>
            <Navbar  collapseOnSelect
            style={{ backgroundColor: "#20295F"}}
             variant="dark">
                <Container>
                    {userInfo ? (
                        <LinkContainer to='/home'>
                            <Navbar.Brand>Bix Tech</Navbar.Brand>
                        </LinkContainer>
                    ):
                        <LinkContainer to='/'>
                            <Navbar.Brand>Bix Tech</Navbar.Brand>
                        </LinkContainer>
                    }

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* <SearchBox /> */}
                            {userInfo ? (
                                <Nav className="ml-auto">
 
                                <NavDropdown title={ 
                                    userInfo.user ? (
                                    userInfo.user.name.split(' ').slice(0, -1) == "" ? userInfo.user.name :
                                    userInfo.user.name.split(' ').slice(0, -1)
                                    ) :
                                    (
                                        userInfo.name.split(' ').slice(0, -1) == "" ? userInfo.name :
                                        userInfo.name.split(' ').slice(0, -1)
                                    )
                                    } id='username'>
                                
                                    {userInfo && userInfo.isAdmin ?
                                    <div>
                                        <LinkContainer to='/funcionario'>
                                            <NavDropdown.Item>Funcionários</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/empresa'>
                                            <NavDropdown.Item>Empresas</NavDropdown.Item>
                                        </LinkContainer>
                                    </div>
                                    :
                                    <></>
                                    }
                                    <LinkContainer to='/login'>
                                    <NavDropdown.Item onClick={logoutHandler}>Sair</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>

                                </Nav>
                            ) : (
                                    <Nav className="ml-auto">
                                    <LinkContainer to='/login'>
                                        <Nav.Link><i className="fas fa-user"></i>Entrar</Nav.Link>
                                    </LinkContainer>
                                    </Nav>
                                )}

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
