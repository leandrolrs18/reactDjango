import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Nav, Card, Table, Image } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { registerEmpresa, updateEmpresa, saveEmpresa } from '../actions/userActions'
import Message from '../components/Message'


function WorkoutCreate() {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState('')
  const [category, setCategory] = useState("")
  const [source, setSource] = useState("")
  const [message, setMessage] = useState('')
  const [variant, setVariant] = useState('danger')

  let file = 0
  const localImageUrl = ''


  const dispatch = useDispatch()

  const empresaSave = useSelector(state => state.empresaSave)
  const { empresaData } = empresaSave

  const empresasRegister = useSelector(state => state.empresasRegister)
  const { errorRegister, loadingRegister, empresaRegiste, successRegister } = empresasRegister

  const empresasUpdate = useSelector(state => state.empresasUpdate)
  const { errorEmpresa, loadingEmpresa, successEmpresa } = empresasUpdate


  useEffect(() => {
    if (successEmpresa == true || successRegister == true) {
      setMessage("salvo")
      setVariant('success')
    }
  
  }, [ successEmpresa, successRegister])

  useEffect(() => {

    setName('')
    setDescription('')
    setImage('')
    setCategory('')
    dispatch(saveEmpresa({}))
    
  }, [dispatch, successRegister, successEmpresa])


  useEffect(() => {
    if(empresaData.nome) {
    setName(empresaData.nome)
    setDescription(empresaData.descricao)
    setImage(empresaData.imagem)
    setCategory(empresaData.categoria)
    }
  }, [dispatch, empresaData])


  const submitHandler = (e) => {
    e.preventDefault()
    console.log('teste', image.split('th')[1])
    console.log(image)
    let file = '/images/'
    let imagem = image.split('th')[1] ? image.split('th')[1] :  image.split('ges')[1]
    console.log('teste1', imagem,  imagem.split("'\'")[0])
    imagem = imagem.split("'\'")[0] ? imagem.split('th')[0] :  imagem
    console.log('teste2', imagem)
    if(empresaData.nome) {
      dispatch(updateEmpresa({ id: empresaData._id, name, image: imagem, category, description}))
    }
    else {
      dispatch(registerEmpresa({ name, image: imagem, category, description}))
    }

    

  }

  const submitHandlerTwo = (e) => {
    e.preventDefault()
  }

  return (
    <Card>
      <Card.Body>
        <FormContainer>
        {message && <Message variant={variant}>{message}</Message>}
          <Form onSubmit={submitHandler}>

          <Form.Group controlId='name'>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  required
                  type='name'
                  placeholder='Digite Nome'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                >
                </Form.Control>
              </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='Descreva'
                value={description ? description : ''}
                onChange={(e) => setDescription(e.target.value)}
              >
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='name'>
                <Form.Label>Categoria</Form.Label>
                <Form.Control
                  required
                  type='name'
                  placeholder='Digite uma categoria'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                </Form.Control>
              </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control

                type='text'
                placeholder='Ao não selecionar imagem, ficará com imagem padrão'
                value={image}
                onChange={(e) => setImage(e.target.value)}

              >
              </Form.Control>

              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={(e) => setImage(e.target.value)}
                accept=".png,.jpg,.jpeg,.gif "
              >

              </Form.File>

            </Form.Group>

            <Col md={6}>
              <Image src={localImageUrl} alt={localImageUrl} fluid />
            </Col>

            <Button type='submit' variant='primary'
              style={{ backgroundColor: "#20295F" }}>
              Salvar
            </Button>

          </Form>
        </FormContainer>
      </Card.Body>
    </Card>

  );
}

export default WorkoutCreate;