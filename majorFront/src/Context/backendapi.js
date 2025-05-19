import {createSlice} from '@reduxjs/toolkit'


const initialState={
    status:false,
    backendAPI:null
}

export const apiSlice= createSlice({
    name:'api',
    initialState,
    reducers:{
        login:(state)=>{
            state.status=true
        },
        logout:(state)=>{
            state.status=false
        },
        addBackendURL:(state,action)=>{
            state.backendAPI=action.payload
        }
    }

})
export const {login,logout,addBackendURL}=apiSlice.actions;

export default apiSlice.reducer