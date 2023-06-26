import React from 'react'
import { Card, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

function CardFuncionario({ elemento }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div>
            <Card className="my-3 p-3 rounded" style={{ height: '20rem', maxWidth: '20rem' }}>
                {elemento.user.isAdmin ?
                    (<Card.Img src={`http://localhost:8000${elemento.imagem}`} class="avatar-img rounded-circle"
                        style={{ paddingTop: "3%", maxHeight: '8rem', maxWidth: '8rem' }} />
                    )
                    :
                    (
                        <Card.Img src={`http://localhost:8000${elemento.imagem}`}
                            style={{ paddingTop: "3%", maxHeight: '12rem', maxWidth: '8rem' }} />
                    )
                }
                { elemento.empresa &&
                (
                <Card.Body>
                    <Card.Title as="div">
                        <strong>{elemento.empresa.nome} </strong>
                    </Card.Title>

                    <Card.Text as="h7">
                        <strong>{elemento.emprego} </strong>
                    </Card.Text>

                    <Card.Text as="h6">
                        {elemento.user.name}
                    </Card.Text>

                </Card.Body>
                    )
                }
                { elemento.user &&
                (
                <Button variant='primary' size="sm"
                    style={{ backgroundColor: "#20295F", height: '2rem', maxWidth: '8rem' }} onClick={handleShow}>
                    Linha do tempo
                </Button>
                )}
            </Card>

            <Modal show={show} onHide={handleClose} animation={false} size="lg" fullscreen={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Linha do tempo</Modal.Title>
                </Modal.Header>
                <Modal.Body>{elemento.user.name}
                    <VerticalTimeline layout="1-column-left">
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                            date={elemento.dataEntrada != null ? elemento.dataEntrada.split("T")[0]: 'não tem ainda'}
                            position="left"
                            iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                            // icon={<WorkIcon />}
                        >
                            <h3 className="vertical-timeline-element-title">Data de Entrada</h3>
                            
                        </VerticalTimelineElement>
                    </VerticalTimeline>
                    <VerticalTimeline layout="1-column-left">
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentArrowStyle={{ borderRight: '7px solid  rgb(16, 204, 82)' }}
                            date={elemento.dataInicioFerias != null ? elemento.dataInicioFerias.split("T")[0]: 'não tem ainda'}
                            position="left"
                            iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                            // icon={<WorkIcon />}
                        >
                            <h3 className="vertical-timeline-element-title">Data de Inicio Férias</h3>
                            
                        </VerticalTimelineElement>
                        </VerticalTimeline>
                        <VerticalTimeline layout="1-column-right">
                        <VerticalTimelineElement 
                            className="vertical-timeline-element--education"
                            contentArrowStyle={{ borderLeft: '7px solid  rgb(233, 30, 99)' }}
                            date={elemento.dataFimFerias != null ? elemento.dataFimFerias.split("T")[0]: 'não tem ainda'}
                            position="right"
                            iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                            // icon={<SchoolIcon />}
                        >
                            <h3 className="vertical-timeline-element-title">Data de Saida Férias</h3>
                        </VerticalTimelineElement>
                        </VerticalTimeline>
                        <VerticalTimeline layout="1-column-right">
                        <VerticalTimelineElement 
                            className="vertical-timeline-element--education"
                            contentArrowStyle={{ borderLeft: '7px solid  rgb(233, 30, 99)' }}
                            date={elemento.dataSaida != null ? elemento.dataSaida.split("T")[0]: 'não tem ainda'}
                            position="right"
                            iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                            // icon={<SchoolIcon />}
                        >
                            <h3 className="vertical-timeline-element-title">Data de Saida</h3>
                        </VerticalTimelineElement>
                    </VerticalTimeline>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CardFuncionario
