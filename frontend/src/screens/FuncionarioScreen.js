import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Table, ButtonGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import FuncionarioCreate from '../components/FuncionarioCreate'
import { listUsers, deleteUser, saveFuncionario } from '../actions/userActions'


function FuncionarioScreen({ history }) {

    const [resume, setResume] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState('')
    const [message, setMessage] = useState('')

    const [variant, setVariant] = useState('danger')
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { errorInfo, loadingInfo, userInfo } = userLogin

    const userList = useSelector(state => state.userList)
    const {  users, page, pages } = userList

    const userUpdate = useSelector(state => state.userUpdate)
    const { errorUser, loadingUser, user, successUser } = userUpdate

    const userDelete = useSelector(state => state.userDelete)
    const { errorDelete, loadingDelete, successDelete } = userDelete
    

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading } = userRegister

    

    const [legend, setLegend] = useState('NOVOS FUNCIONÁRIOS')

    useEffect(() => {
        console.log("oi", successDelete)
        if (successDelete == true) {
          setMessage("deletado")
          setVariant('success')
        }
    
      }, [successDelete])

    useEffect(() => {

        if (!userInfo) {
            history.push('/login')
        }
        dispatch(listUsers())
        setMessage('')
        console.log("oi", message)
    }, [dispatch, history, userInfo, loadingUser, successDelete, loadingDelete, loading])

    const submitHandler = (e) => {
        e.preventDefault()

    }

    const editar = (user) => {
        dispatch(saveFuncionario(user))

    }

    const excluir = (user) => {
        console.log(user)
        dispatch(deleteUser(user.user.id, user._id))
    }
    return (
        <Row>
            <Col md={6}>
                <h2>Funcionários</h2>
                {message && <Message variant={variant}>{message}</Message>}
                {users && <Table striped responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Empresa</th>
                            <th>Admin</th>
                            <th>Ações</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {users && users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{user.user.name}</td>
                                    <td>{user.user.email}</td>
                                    <td>{user.empresa.nome}</td>
                                    <td>{user.user.isAdmin == true ? 'SIM' : 'NÃO'}</td>
                                    <td>
                                        <ButtonGroup size="sm">
                                            <Button variant="primary" style={{ backgroundColor: "#20295F"}} 
                                            onClick={e =>  editar(user)}> 
                                                Editar</Button>
                                            <Button variant="primary" style={{ backgroundColor: "#20295F"}}
                                            onClick={e =>  excluir(user)}
                                            >Excluir</Button>
                                        </ButtonGroup>

                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </Table>}

            </Col>

            <Col md={6}>
                <div>
                    <h2>{legend}</h2>
                    <FuncionarioCreate elemento/>
                </div>


            </Col>
        </Row>
    )
}

export default FuncionarioScreen