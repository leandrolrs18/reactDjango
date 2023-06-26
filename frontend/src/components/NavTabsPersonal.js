import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Nav, Card,Table } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { listMyBodybuilders, listInvitations, listBodybuildersAvailable, sendInvitationPersonal } from '../actions/userActions'


function NavTabsPersonal() {

  const [add, setAdd] = useState(false)

  const userListMyBodybuilders = useSelector(state => state.userListMyBodybuilders)
  const { errorBodybuilders, loadingBodybuilders, bodybuilders } = userListMyBodybuilders

  const userListBodybuildersAvailable = useSelector(state => state.userListBodybuildersAvailable)
  const { errorBodybuildersAvailable, loadingBodybuildersAvailable, bodybuildersAvailable} = userListBodybuildersAvailable

  const userListInvitation = useSelector(state => state.userListInvitation)
  const { errorInvitations, loadingInvitations, invitations } = userListInvitation

  const userSendInvitation = useSelector(state => state.userSendInvitation)
  const { errorSendInvitation, loadingSendInvitation, sendInvitation } = userSendInvitation

  const userReplyInvitation = useSelector(state => state.userReplyInvitation)
  const { errorReplyInvitation, loadingReplyInvitation, replyInvitation } = userReplyInvitation

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const [bbsAvailable, setBbsAvailable] = useState(bodybuildersAvailable)
  const [date, setDate] = useState()
  const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listMyBodybuilders())
        dispatch(listBodybuildersAvailable())
    }, [dispatch])

    useEffect(() => {
      if(!loadingSendInvitation) {
        dispatch(listMyBodybuilders())
        dispatch(listBodybuildersAvailable())
      }
      
  }, [loadingSendInvitation])

  const navHandler = (e) => {

    add ? setAdd(false) : setAdd(true)

  }

  const adicione = (e) => {
    if (e) {
        e.preventDefault()
    }
    console.log("ou",bbsAvailable)
    dispatch (sendInvitationPersonal ({
        userBodybuilder : bbsAvailable
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault()

  }

  return (
    <Card>
      <Card.Header>
        <Nav variant="tabs" //defaultActiveKey="#second"
        defaultActiveKey="#first"
        onSelect={(selectedKey) => navHandler(selectedKey)}>
          <Nav.Item>
            <Nav.Link eventKey="#first">Ativo</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="#second">Adicionar Novo</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      {!add ? (
        <Card.Body>
          {/* <Card.Title>José Carlos</Card.Title> */}
          <Table striped responsive className='table-sm'>
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Data de Adesão</th>
                      <th>Status solicitação </th>
                      <th>Ações</th>
                      <th></th>
                  </tr>
              </thead>

              <tbody>
                  {!loadingBodybuilders && bodybuilders.map(bodybuilder => {
                    return (
                              <tr key={bodybuilder._id}>
                              <td>{bodybuilder._id}</td>
                              <td>{bodybuilder.userBodybuilder.name}</td>
                              <td>{bodybuilder.userBodybuilder.email}</td>
                              {/* <td>{order.createdAt.substring(0, 10)}</td> */}
                              <td>{ bodybuilder.acceptanceDate != null ?
                                     bodybuilder.acceptanceDate.split('T')[0] : " "}</td>
                              {/* <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                  <i className='fas fa-times' style={{ color: 'red' }}></i>
                              )}</td> */}
                              <td>{bodybuilder.isAccepted ? "Aceito" : 
                                    bodybuilder.isWaiting ? "Em aguardo" : "Foi recusado" }</td>
                              <td>

                                  <Link to={`/order/${bodybuilder._id}`}>
                                      <Button className='btn-sm'>Details</Button>
                                  </Link>
                              </td>
                          </tr>
                    )
                  }
                      
                  )}
              </tbody>
          </Table>
          <Button variant="primary" style={{ backgroundColor: "#20295F"}}>Desativar</Button>
        </Card.Body>
      ) :
      (
        <Card.Body>
          <Card.Title>Mande um convite</Card.Title>
          <Card.Text>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                  {/* <Form.Label>Exercício</Form.Label> */}
                  <Form.Control
                      required
                      as='select'
                      placeholder='Selecione um Aluno'
                      value={bbsAvailable}
                      onChange={(e) => setBbsAvailable(e.target.value)}
                  >
                    {!loadingBodybuildersAvailable && bodybuildersAvailable.map( (item) => (
                            <option value={item.user._id}>
                                {item.user.name}
                            </option>
                      )
                    )}
                  </Form.Control>
              </Form.Group>
            </Form>
          </Card.Text>
          <Button variant="primary" style={{ backgroundColor: "#20295F"}} onClick={ (e) => adicione(e)}>
              Enviar Convite</Button>
        </Card.Body>
      )
      }
      
    </Card>
    
  );
}

export default NavTabsPersonal;