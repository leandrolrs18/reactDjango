import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button } from 'react-bootstrap'
import CardFuncionario from '../components/CardFuncionario'
import CardEmpresa from '../components/CardEmpresa'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import Pagination from 'react-bootstrap/Pagination';

import { listUsers, listEmpresas } from '../actions/userActions'


function HomeScreen({ history }) {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { error, loading, users, page, pages } = userList

    const empresaList = useSelector(state => state.empresaList)
    const { errorEmpresas, loadingEmpresas, empresas } = empresaList

    const userLogin = useSelector(state => state.userLogin)
    const { errorInfo, loadingInfo, userInfo } = userLogin

    let keyword = history.location.search

    useEffect(() => {
        console.log("ois")
        if (!userInfo) {
            history.push('/login')
        }

    }, [dispatch, history, userInfo])

    useEffect(() => {
        console.log("nod")
        dispatch(listUsers())
        dispatch(listEmpresas())
    }, [dispatch, keyword])

    return (
        <div>
            <Row>
                <Col>
                    <h1>Empresas</h1>
                    {loadingEmpresas ? <Loader />
                        : errorEmpresas ? <Message variant='danger'>{"Nenhuma empresa adicionado"}</Message>
                            :
                            <div>
                                <Row>
                                    {empresas && empresas.map(empresas => (
                                        <Col key={empresas._id} sm={12} md={6} lg={4} xl={3}>
                                            <CardEmpresa elemento={empresas} />
                                        </Col>
                                    ))}
                                </Row>
                                {/* <Paginate page={1} pages={2} keyword={keyword} /> */}
                            </div>
                    }
                </Col>
            </Row>

            <Row>
                <Col>
                    <h1>Funcionários</h1>
                    {loading ? <Loader />
                        : error ? <Message variant='danger'>{"Nenhum funcionário adicionado"}</Message>
                            :
                            <div>
                                <Row>
                                    {users && users.map(users => (
                                        <Col key={users._id} sm={12} md={6} lg={4} xl={3}>
                                            <CardFuncionario elemento={users} />
                                        </Col>
                                    ))}
                                </Row>
                                {/* <Paginate page={page} pages={pages} keyword={keyword} /> */}
                            </div>
                    }
                </Col>
            </Row>

        </div>
    )
}

export default HomeScreen
