import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Table, ButtonGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import NavTabsBB from '../components/NavTabsBB'
import EmpresaCreate from '../components/EmpresaCreate'
import { saveEmpresa, listEmpresas, deleteEmpresa } from '../actions/userActions'

function EmpresaScreen({ history }) {

    const [resume, setResume] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState('')
    const [message, setMessage] = useState('')
    const [variant, setVariant] = useState('danger')
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    const empresaList = useSelector(state => state.empresaList)
    const { errorEmpresas, loadingEmpresas, empresas } = empresaList

    const empresasRegister = useSelector(state => state.empresasRegister)
    const { errorRegister, loadingRegister, empresaRegister } = empresasRegister

    const empresasUpdate = useSelector(state => state.empresasUpdate)
    const { errorEmpresa, loadingEmpresa } = empresasUpdate

    const empresasDelete = useSelector(state => state.empresasDelete)
    const { errorDelete, loadingDelete, successDelete } = empresasDelete

    const [legend, setLegend] = useState('NOVOS EMPRESAS')

    useEffect(() => {
        console.log("oi", successDelete)
        if (successDelete) {
          setMessage("deletado")
          setVariant('success')
        }
    
      }, [successDelete])

    useEffect(() => {

        if (!userInfo) {
            history.push('/login')
        }

        dispatch(listEmpresas())
        setMessage('')
    }, [dispatch, history, userInfo, loadingEmpresa, loadingRegister])

    const editar = (empresa) => {
        dispatch(saveEmpresa(empresa))

    }

    const excluir = (empresa) => {
        console.log(empresa)
        dispatch(deleteEmpresa(empresa._id))
    }

    

    const submitHandler = (e) => {
        e.preventDefault()

    }
    return (
        <Row>
            <Col md={6}>
                <h2>Empresas</h2>
                {message && <Message variant={variant}>{message}</Message>}
                <Table striped responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Empresa</th>
                            <th>Categoria</th>
                            <th>Descrição</th>
                            <th>Ações</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {empresas && empresas.map((empresa, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{empresa.nome}</td>
                                    <td>{empresa.categoria}</td>
                                    <td>{empresa.descricao}</td>
                                    <td>
                                        <ButtonGroup size="sm">
                                            <Button variant="primary" style={{ backgroundColor: "#20295F" }}
                                                onClick={e => editar(empresa)}>
                                                Editar</Button>
                                            <Button variant="primary" style={{ backgroundColor: "#20295F" }}
                                                onClick={e => excluir(empresa)}
                                            >Excluir</Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </Table>

            </Col>

            <Col md={6}>
                <div>
                    <h2>{legend}</h2>
                    <EmpresaCreate />
                </div>


            </Col>
        </Row>
    )
}

export default EmpresaScreen