import actionTypes from './actionTypes';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})


export const userLoginSuccess = (userIfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userIfo: userIfo
})

export const userLoginFail = () => ({
    type: actionTypes.User_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})