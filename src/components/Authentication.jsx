import React, { useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useDispatch } from 'react-redux';
import { setUser, checkUser } from '../store/authSlice';

import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

function Authentication() {

  const dispatch = useDispatch();
  const [name,setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(setUser({name,email, password,image }));
    setName('');
    setEmail('');
    setPassword('');
    setImage('')
  };

  const handleSignin = (e) => {
    e.preventDefault();
    if(localStorage.getItem('email') === email  || localStorage.getItem('password') === password) {
        dispatch(checkUser(true))
    }
    setEmail('');
    setPassword('');
  };

  const [justifyActive, setJustifyActive] = useState('tab1');;

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  return (


    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>

        <MDBTabsPane show={justifyActive === 'tab1'}>
        
        <form onSubmit={handleSignin}>
          <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
        </form>  

          <p className="text-center">Not a member? <a href="#!">Register</a></p>

        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>

        <form onSubmit={handleSignup}>
          <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='image' id='form1' type="file" value={image} onChange={(e) => setImage(e.target.value)}/>
          <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
        </form>

        </MDBTabsPane>

      </MDBTabsContent>

    </MDBContainer>
  );
}

export default Authentication;