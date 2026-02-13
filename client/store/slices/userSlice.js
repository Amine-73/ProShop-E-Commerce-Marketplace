import { createSlice } from "@reduxjs/toolkit";


const initialState={
    userInfo:typeof window!=='undefined' ? JSON.parse(localStorage.getItem('userInfo')) : 'null'
};

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            state.userInfo=action.payload;
            localStorage.setItem('userInfo',JSON.stringify(action.payload));
        },
        logout:(state)=>{
            state.userInfo=null;
            localStorage.removeItem('userInfo');
    
            //clear cart too
            localStorage.removeItem('cart');
            document.location.href=("/login")
        }
        
    }
});

export const {setCredentials,logout} =userSlice.actions;
export default userSlice.reducer;