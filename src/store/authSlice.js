const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({

    name:"auth",

    initialState:{
       image:localStorage.getItem('image') ? localStorage.getItem('image') : '',
       name:localStorage.getItem('name') ? localStorage.getItem('name') : '',
       email:localStorage.getItem('email') ? localStorage.getItem('email') : '',
       password:localStorage.getItem('password') ? JSON.parse(localStorage.getItem('password')) : [],
       isUser: localStorage.getItem('isUser') ? localStorage.getItem('isUser') : false,
    },

    reducers:{
        setUser:(state,action)=>{
        state.image = action.payload.image ;
        state.name = action.payload.name ;
        state.email = action.payload.email ;
        state.password = action.payload.password ;
        
        localStorage.setItem('image', state.image);
        localStorage.setItem('name', state.name);
        localStorage.setItem('email', state.email);
        localStorage.setItem('password', state.password);
        },
        checkUser:(state,action)=>{
            state.isUser = action.payload ;
            localStorage.setItem('isUser', state.isUser);
        },
        logoutUser:(state,action)=>{
            state.isUser = action.payload ;
            localStorage.setItem('isUser', state.isUser);
        },
    }

})

export const {setUser, checkUser,logoutUser} = authSlice.actions ;
export default authSlice.reducer ;