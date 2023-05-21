import React from 'react'
// import Auth from './components/Auth'
import Header from './components/Header'
import Home from './components/Home' ;
import Authentication from './components/Authentication'
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import Profile from './components/Profile' ;
import Blog from './components/Blog'
import Error from './components/Error';
import './App.css';


export default function App() {

  const isUser = useSelector((state) => state.auth.isUser);

  return (
    <BrowserRouter>
       <div id='head' >
       <Header/>
       </div>
       <Routes>
        <Route path='/' element={ isUser ?<Home/>: <Authentication/>  } />
        <Route path='/Home' element={ isUser ?<Home/>: <Authentication/>  } />
        <Route path='/Profile' element={ isUser ?<Profile/>: <Authentication/>  } />
        <Route path='/Blog' element={ isUser ?<Blog/>: <Authentication/>  } />
        <Route path='*' element={ isUser ?<Error/>: <Authentication/>  } />
       </Routes>
    </BrowserRouter>
  )
}

