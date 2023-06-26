import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Nav, Card, Table, Image } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { listMyBodybuilders, listInvitations, listBodybuildersAvailable, sendInvitationPersonal } from '../actions/userActions'
import { saveFuncionario, listEmpresas, register, updateUser } from '../actions/userActions'
import Message from '../components/Message'

function FuncinarioCreate() {

  const [name, setName] = useState("")
  const [company, setCompany] = useState("")

  const [job, setJob] = useState("")
  const [dataInicio, setDataInicio] = useState("")
  const [image, setImage] = useState('')
  const [dataSaida, setDataSaida] = useState("")
  const [dataFeriasInicio, setDataFeriasInicio] = useState("")
  const [dataFeriasSaida, setDataFeriasSaida] = useState("")
  const [imagePatterId, setImagePatterId] = useState("")
  const [source, setSource] = useState("")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState('')
  const [message, setMessage] = useState('')
  const [variant, setVariant] = useState('danger')

  let file = 0
  const localImageUrl = ''

  const dispatch = useDispatch()

  const empresaList = useSelector(state => state.empresaList)
  const { errorEmpresas, loadingEmpresas, empresas } = empresaList

  const userRegister = useSelector(state => state.userRegister)
  const { error, loading, userInfo, successInfo } = userRegister

  const funcionarioSave = useSelector(state => state.funcionarioSave)
  const { funcionarioData } = funcionarioSave

  const userUpdate = useSelector(state => state.userUpdate)
  const { errorUser, loadingUser, user, successUser } = userUpdate

  useEffect(() => {
    console.log("fg", successInfo, successUser)
    if (loadingEmpresas == false) console.log("fg", loadingUser, isAdmin, empresas, empresas[0])
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setImage('')
    setJob('')
    dispatch(saveFuncionario({}))
    setDataInicio(null)
    setDataSaida(null)
    setDataFeriasInicio(null)
    setDataFeriasSaida(null)
    setMessage('')
    if (loadingEmpresas == false) setCompany(empresas[0]._id) 
    setIsAdmin(false)
    
    
  }, [dispatch, successInfo, successUser, loadingEmpresas])

  useEffect(() => {
    console.log("oi", successInfo, successUser)
    if (successInfo == true || successUser == true) {
      setMessage("salvo")
      setVariant('success')
    }

  }, [successInfo, successUser])

  useEffect(() => {
    dispatch(listEmpresas())
  }, [dispatch])
  useEffect(() => {
      if(funcionarioData.user) {
        setName(funcionarioData.user.name)
        setEmail(funcionarioData.user.email)
        setCompany(funcionarioData.empresa._id)
        setJob(funcionarioData.emprego)
        setImage(funcionarioData.imagem)
        setDataInicio(funcionarioData.dataEntrada != null ? funcionarioData.dataEntrada.split('T')[0] : null)
        setDataSaida(funcionarioData.dataSaida != null ? funcionarioData.dataSaida.split('T')[0] : null)
        setDataFeriasInicio(funcionarioData.dataInicioFerias != null ? funcionarioData.dataInicioFerias.split('T')[0] : null)
        setDataFeriasSaida(funcionarioData.dataFimFerias != null ? funcionarioData.dataFimFerias.split('T')[0]: null)
        setIsAdmin(funcionarioData.user.isAdmin)
        console.log("xs", company, dataInicio, funcionarioData.user.isAdmin, isAdmin)
      }
  }, [dispatch, funcionarioData])

  const submitHandler = (e) => {

    e.preventDefault()
    console.log(company, dataInicio, isAdmin, image)
    let imagem = image.split('th')[1] ? image.split('th')[1] :  image.split('ges')[1]
    imagem = imagem.split("'\'")[0] ? imagem.split('th')[0] :  imagem
    console.log('tes', imagem, image)
    if (password != confirmPassword) {
      setMessage('Passwords do not match')
      setVariant('danger')
    } else {
      if(funcionarioData.user) {
        dispatch(updateUser({ iduser: funcionarioData.user.id, idfunc: funcionarioData._id,
                              name, email, password, isAdmin, image: imagem, company, job, dataInicio, 
                              dataSaida, dataFeriasInicio, dataFeriasSaida }))
      }
      else {
        dispatch(register({ name, email, password, isAdmin, image: imagem, company, job, dataInicio, dataSaida, dataFeriasInicio, dataFeriasSaida }))
      }
      
    }

  }
  

  const handleChange=(e)=>{
    console.log('gtc', e.target.checked, isAdmin)
    setIsAdmin(!isAdmin)
     
 }

  return (
    <Card>
      <Card.Body>
        <FormContainer>
          {message && <Message variant={variant}>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
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

            <Form.Group controlId='email'>
              <Form.Label>Email </Form.Label>
              <Form.Control
                required
                type='email'
                placeholder='Digite Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              >
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Senha</Form.Label>
              <Form.Control
                required
                type='password'
                placeholder='Digite Senha'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              >
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='passwordConfirm'>
              <Form.Label>Confirme Senha</Form.Label>
              <Form.Control
                required
                type='password'
                placeholder='Confirme Senha'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              >
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='name'>
              <Form.Label>Empresa</Form.Label>
              <Form.Control
                required
                as='select'
                placeholder='Selecione uma Empresa'
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              >
                {empresas && empresas.map(item => (
                  <option value={item._id}>{item.nome}</option>
                )
                )}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='job'>
              <Form.Label>Emprego</Form.Label>
              <Form.Control
                required
                type='name'
                placeholder='Digite seu Emprego'
                value={job}
                onChange={(e) => setJob(e.target.value)}
              >
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='job'>
              <Form.Label>Data inicio</Form.Label>
              <Form.Control
                required
                type='date'
                placeholder='Digite data inicio'
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              >
              </Form.Control>

              <Form.Label>Data Saida</Form.Label>
              <Form.Control
                type='date'
                placeholder='Digite data saida'
                value={dataSaida}
                onChange={(e) => setDataSaida(e.target.value)}
              >
              </Form.Control>

              <Form.Label>Data Ferias inicio</Form.Label>
              <Form.Control
                type='date'
                placeholder='Digite data incio ferias'
                value={dataFeriasInicio}
                onChange={(e) => setDataFeriasInicio(e.target.value)}
              >
              </Form.Control>

              <Form.Label>Data Ferias Saida</Form.Label>
              <Form.Control
                type='date'
                placeholder='Digite data ferias saida'
                value={dataFeriasSaida}
                onChange={(e) => setDataFeriasSaida(e.target.value)}
              >
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control

                type='text'
                placeholder='selecione a imagem'
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

            <Form.Group controlId='isAdmin'>
              <Form.Check
                type={'switch'}
                id={`custom-switch2`}
                label={'Administrador'}
                defaultChecked={isAdmin}
                onChange={(e) => handleChange(e)}
              />
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

export default FuncinarioCreate;