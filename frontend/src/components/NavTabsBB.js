import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Nav, Card, ListGroup } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'


function NavTabsBB() {

  const [add, setAdd] = useState(false)

  const userListMyBodybuilders = useSelector(state => state.userListMyBodybuilders)
  const { errorBodybuilders, loadingBodybuilders, bodybuilders } = userListMyBodybuilders

  const userListMyPersonal = useSelector(state => state.userListMyPersonal)
  const { errorPersonal, loadingPersonal, personal } = userListMyPersonal

  const userListInvitation = useSelector(state => state.userListInvitation)
  const { errorInvitations, loadingInvitations, invitations } = userListInvitation

  const userSendInvitation = useSelector(state => state.userSendInvitation)
  const { errorSendInvitation, loadingSendInvitation, sendInvitation } = userSendInvitation

  const userReplyInvitation = useSelector(state => state.userReplyInvitation)
  const { errorReplyInvitation, loadingReplyInvitation, replyInvitation } = userReplyInvitation

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

    useEffect(() => {
    }, [dispatch])



  const navHandler = (e) => {

    add ? setAdd(false) : setAdd(true)

  }

  const adicione = (e, invitation) => {

    if (e) {
      e.preventDefault()
   }
    
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
            <Nav.Link eventKey="#second">Solicitações</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      {!add ? (
        <Card.Body>
          { loadingPersonal == false ? personal.user  ?
              (
                <div>
                  <Card.Title>{personal.user.name}</Card.Title>
                  <Card.Text>
                  <strong className="font-weight-bold">Resumo : </strong> {personal.bio ? personal.bio : 'nenhuma cadastrada'}
                  </Card.Text>
                  <Card.Text>
                  <strong className="font-weight-bold">Cidade : </strong> {personal.city ? personal.city + ' ' : '- '}

                  <strong className="font-weight-bold">Telefone : </strong>{personal.phone ? personal.phone + ' ' : ' - '}
                  </Card.Text>
                  <Card.Text>
                  <strong className="font-weight-bold">Email : </strong>{personal.user.email}
                  </Card.Text>
                  <br></br>
                  {/* <Button variant="primary" style={{ backgroundColor: "#20295F"}}>Desativar</Button> */}
                </div>               
              )
              :
              (
                <div> <h4>Sem personal, entre em contato com algum</h4></div>
              )
              :
              (
                <div> </div>
              )
          }
        </Card.Body>
      ) :
      (
        <Card.Body>
          <Card.Title>Responda a solicitação</Card.Title>
          <Card.Text>
          {!loadingInvitations && invitations.map((invitation, index) => 
            {
              if (invitation.isAccepted) {
                return (
                  <ListGroup className="list-group-flush" >
                    <ListGroup.Item> 
                      <Row>
                      <Col md={6}> 
                        {invitation.userPersonal.name }
                      </Col>
                      <Col md={6}> 
                        ACEITO
                      </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                )
              }
              else{
                return (
                  <ListGroup className="list-group-flush" >
                    <ListGroup.Item> 
                      <Row>
                      <Col md={6}> 
                        {invitation.userPersonal.name }
                      </Col>
                      <Col md={6}> 
                        <Button variant="primary" size="sm" style={{ backgroundColor: "#20295F"}} 
                          onClick={e =>  adicione(e, invitation)}>
                          Aceitar</Button>
                      </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                )
              }
            }
             
          )}  
         
          </Card.Text>
          
        </Card.Body>
      )
      }
      
    </Card>
    
  );
}

export default NavTabsBB;