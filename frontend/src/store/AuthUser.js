import { createSlice } from "@reduxjs/toolkit";


const AuthUser = createSlice({
    name:"auth",
    initialState: {
        user : null ,
        status:false,
    },
    reducers : {
        setUser : (state , action) => {
            state.user = action.payload
        },
        setStatus : (state , action) => {
            state.status = action.payload
        }
    }
})
export default AuthUser.reducer
export const {setUser , setStatus   } = AuthUser.actions;
