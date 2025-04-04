import { configureStore } from "@reduxjs/toolkit";
import AuthUser from './AuthUser.js'
const store = configureStore({
 reducer : {
    auth : AuthUser
 }
})
export default store 