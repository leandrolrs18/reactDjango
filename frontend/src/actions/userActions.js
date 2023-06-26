//import axios from 'axios'
import axios from '../services/axios';
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,

    EMPRESA_LIST_REQUEST,
    EMPRESA_LIST_SUCCESS,
    EMPRESA_LIST_FAIL,
    EMPRESA_LIST_RESET,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,

    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,

    USER_LIST_BODYBUILDERS_REQUEST,
    USER_LIST_BODYBUILDERS_SUCCESS,
    USER_LIST_BODYBUILDERS_FAIL,
    USER_LIST_BODYBUILDERS_RESET,

    USER_LIST_BODYBUILDERS_AVAILABLE_REQUEST,
    USER_LIST_BODYBUILDERS_AVAILABLE_SUCCESS,
    USER_LIST_BODYBUILDERS_AVAILABLE_FAIL,
    USER_LIST_BODYBUILDERS_AVAILABLE_RESET,

    USER_LIST_PERSONAL_REQUEST,
    USER_LIST_PERSONAL_SUCCESS,
    USER_LIST_PERSONAL_FAIL,
    USER_LIST_PERSONAL_RESET,

    USER_INVITATION_LIST_REQUEST,
    USER_INVITATION_LIST_SUCCESS,
    USER_INVITATION_LIST_FAIL,
    USER_INVITATION_LIST_RESET,

    USER_INVITATION_SEND_REQUEST,
    USER_INVITATION_SEND_SUCCESS,
    USER_INVITATION_SEND_FAIL,
    USER_INVITATION_SEND_RESET,

    USER_INVITATION_REPLY_REQUEST,
    USER_INVITATION_REPLY_SUCCESS,
    USER_INVITATION_REPLY_FAIL,
    USER_INVITATION_REPLY_RESET

} from '../constants/userConstants'


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/login/',
            { 'username': email, 'password': password },
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: USER_LIST_RESET })
}


export const register = (info) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            '/api/users/register/',
            info,
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const registerEmpresa  = (info) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'EMPRESA_REGISTER_REQUEST'
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            '/api/users/register/empresa/',
            info,
            config
        )

        dispatch({
            type: 'EMPRESA_REGISTER_SUCCESS',
            payload: data
        })


    } catch (error) {
        dispatch({
            type: 'EMPRESA_REGISTER_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/users/${id}/`,
            config
        )

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/users/`,
            config
        )

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listEmpresas = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: EMPRESA_LIST_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/users/empresas/`,
            config
        )

        dispatch({
            type: EMPRESA_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: EMPRESA_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteUser = (idUser, idFunc) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/users/delete/${idUser}/${idFunc}/`,
            config
        )

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteEmpresa = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'EMPRESA_DELETE_REQUEST'
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/users/delete_empresa/${id}/`,
            config
        )

        dispatch({
            type: 'EMPRESA_DELETE_SUCCESS',
            payload: data
        })


    } catch (error) {
        dispatch({
            type: 'EMPRESA_DELETE_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/users/update/${user.iduser}/${user.idfunc}/`,
            user,
            config
        )

        dispatch({
            type: USER_UPDATE_SUCCESS,
        })

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateEmpresa = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'EMPRESA_UPDATE_REQUEST'
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/users/update_empresa/${user.id}/`,
            user,
            config
        )

        dispatch({
            type: 'EMPRESA_UPDATE_SUCCESS',
            payload: data
        })


    } catch (error) {
        dispatch({
            type: 'EMPRESA_UPDATE_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const saveFuncionario = (data) => (dispatch) => {
    dispatch({
        type: 'FUNCIONARIO_SAVE_DATA',
        payload: data,
    })

    localStorage.setItem('FuncionarioData', JSON.stringify(data))
}

export const saveEmpresa = (data) => (dispatch) => {
    dispatch({
        type: 'EMPRESA_SAVE_DATA',
        payload: data,
    })

    localStorage.setItem('EmpresaData', JSON.stringify(data))
}
