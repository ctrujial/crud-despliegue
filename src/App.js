import './App.css';
import React, {useState} from "react";
import Home from "./components/Home";
import Loguin from "./components/Loguin";
import Create from "./components/Create";
import Edit from "./components/Edit";
// importar para enrutar
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import {fireApp} from "./Credenciales";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";


const auth = getAuth(fireApp)

const App = () => {
  const [usuarioGlobal, setUsuarioGlobal] = useState(null);
// revisa si esta creado y permite su ingreso
 
 
  onAuthStateChanged(auth, (usuarioFireapp) =>{
    if (usuarioFireapp) {
      setUsuarioGlobal(usuarioFireapp);
    }else{
      
      setUsuarioGlobal(null);
    }    
  });

  return (
    <div className='container-app'>
      <BrowserRouter>
        <Routes>          
          <Route path='/' element={ usuarioGlobal ?  <Home/> : <Loguin/> } ></Route>
          <Route path='/Create' element={ <Create/> } ></Route>
          <Route path='/Edit' element={ <Edit/> } ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;