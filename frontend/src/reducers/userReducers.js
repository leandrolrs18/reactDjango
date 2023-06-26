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
    USER_UPDATE_RESET,

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


export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }

        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}


export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }

        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload, successInfo: true }

        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const empresaRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case 'EMPRESA_REGISTER_REQUEST':
            return { loadingRegister: true }

        case 'EMPRESA_REGISTER_SUCCESS':
            return { loadingRegister: false, empresaRegister: action.payload, successRegister: true }

        case 'EMPRESA_REGISTER_FAIL':
            return { loadingRegister: false, errorRegister: action.payload }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }

        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }

        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        case USER_DETAILS_RESET:
            return { user: {} }


        default:
            return state
    }
}


export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true }

        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }

        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }

        case USER_UPDATE_PROFILE_RESET:
            return {}

        default:
            return state
    }
}


export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true }

        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload }

        case USER_LIST_FAIL:
            return { loading: false, error: action.payload }

        case USER_LIST_RESET:
            return { users: [] }

        default:
            return state
    }
}

export const empresaListReducer = (state = { empresas: [] }, action) => {
    switch (action.type) {
        case EMPRESA_LIST_REQUEST:
            return { loadingEmpresas: true }

        case EMPRESA_LIST_SUCCESS:
            return { loadingEmpresas: false, empresas: action.payload }

        case EMPRESA_LIST_FAIL:
            return { loadingEmpresas: false, errorEmpresas: action.payload }

        case EMPRESA_LIST_RESET:
            return { empresas: [] }

        default:
            return state
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loadingDelete: true }

        case USER_DELETE_SUCCESS:
            return { loadingDelete: false, successDelete: true }

        case USER_DELETE_FAIL:
            return { loadingDelete: false, errorDelete: action.payload }

        default:
            return state
    }
}

export const empresaDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case 'EMPRESA_DELETE_REQUEST':
            return { loadingDelete: true }

        case 'EMPRESA_DELETE_SUCCESS':
            return { loadingDelete: false, successDelete: true }

        case 'EMPRESA_DELETE_FAIL':
            return { loadingDelete: false, errorDelete: action.payload }

        default:
            return state
    }
}


export const userUpdateReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loadingUser: true }

        case USER_UPDATE_SUCCESS:
            return { loadingUser: false, successUser: true }

        case USER_UPDATE_FAIL:
            return { loadingUser: false, errorUser: action.payload }

        case USER_UPDATE_RESET:
            return { user: {} }

        default:
            return state
    }
}

export const empresaUpdateReducer = (state = { empresa: {} }, action) => {
    switch (action.type) {
        case 'EMPRESA_UPDATE_REQUEST':
            return { loadingEmpresa: true }

        case 'EMPRESA_UPDATE_SUCCESS':
            return { loadingEmpresa: false, successEmpresa: true }

        case 'EMPRESA_UPDATE_FAIL':
            return { loadingEmpresa: false, errorEmpresa: action.payload }

        default:
            return state
    }
}

export const funcionarioSaveReducer = (state = { funcionarioData: {} }, action) => {
    switch (action.type) {

        case 'FUNCIONARIO_SAVE_DATA':
            return {
                ...state,
                funcionarioData: action.payload
            }
        default:
            return state
    }
}

export const empresaSaveReducer = (state = { empresaData: {} }, action) => {
    switch (action.type) {

        case 'EMPRESA_SAVE_DATA':
            return {
                ...state,
                empresaData: action.payload
            }
        default:
            return state
    }
}

