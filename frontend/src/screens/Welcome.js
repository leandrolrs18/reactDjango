import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Image, Card, Container } from 'react-bootstrap'
import logo from '../assets/logo2.jpeg'

function Welcome({ history }) {
    const dispatch = useDispatch()


    let keyword = history.location.search

    const src = "https://www.youtube.com/embed/d15DP5zqnYE";

    return (
        <div>
            <Row className="justify-content-center">
                <Col md={6} >
                    <Row className="justify-content-center">

                        <Col md={7}>
                            <Card.Img className="rounded mx-auto d-block" src={logo} alt={logo} />
                        </Col>

                    </Row>

                    <Row className="justify-content-center">

                        <Card.Body>
                            <Card.Text class="text-center">
                                <h4>
                                    Bem Vindo(a) a Bix
                                </h4>
                            </Card.Text>
                        </Card.Body>


                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Welcome
