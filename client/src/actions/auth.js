import * as api from "../api";
import { setCurrentUser } from "./currentUser";

export const signup = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData)
    dispatch({ type: 'AUTH', data })
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))))
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}

export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData)
    dispatch({ type: 'AUTH', data })
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))))
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}



export const googlelogin = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.glogIn(authData)
    dispatch({ type: 'AUTH', data })
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))))
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}



export const googlesignup = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.gsignUp(authData)
    dispatch({ type: 'AUTH', data })
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))))
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}




export const forgotpassword = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.forgotpassword(authData)
    dispatch({ type: 'AUTH', data })
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))))
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}


