import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    userLoginReducer,
    userRegisterReducer,
    empresaRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    empresaListReducer,
    userDeleteReducer,
    empresaDeleteReducer,
    userUpdateReducer,
    funcionarioSaveReducer,
    empresaSaveReducer,
    empresaUpdateReducer
} from './reducers/userReducers'


const reducer = combineReducers({

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    empresasRegister: empresaRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    empresaList: empresaListReducer,
    userDelete: userDeleteReducer,
    empresasUpdate : empresaUpdateReducer,
    empresasDelete: empresaDeleteReducer,
    userUpdate: userUpdateReducer,
    funcionarioSave: funcionarioSaveReducer,
    empresaSave : empresaSaveReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const funcionarioDataromStorage = localStorage.getItem('funcionarioData') ?
    JSON.parse(localStorage.getItem('funcionarioData')) : {}

const empresaDataFromStorage = localStorage.getItem('empresaData') ?
     JSON.parse(localStorage.getItem('empresaData')) : {}


const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    funcionarioData: { userInfo: funcionarioDataromStorage },
    empresaData: { userInfo: empresaDataFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store