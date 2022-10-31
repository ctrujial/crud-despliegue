import React, { useState, useEffect } from 'react'
import Create from './Create';
import { Link } from 'react-router-dom'

import fireApp from '../Credenciales';
import { getAuth, signOut } from 'firebase/auth';
import { Container, Button, Table } from 'react-bootstrap';
import { collection, doc, getDocs, getFirestore, deleteDoc } from 'firebase/firestore'
import Loguin from './Loguin';
import App from '../App';
const auth = getAuth(fireApp);
const firestore = getFirestore(fireApp);




let i = 0
const Home = () => {
  //1 primero se configura los Hooks "ganchos"
  const [pedido, setPedido] = useState([])
  //2 se referencia la db de firebase
  const pedidoCollection = collection(firestore, "pedido")
  //3 se crea funcion para mostrar todos los Docs 
  const getPedido = async () => {
    const data = await getDocs(pedidoCollection)
    console.log(data.docs)

    setPedido(
      data.docs.map((doc) => ({...doc.data(), id:doc.id}))
    )
    console.log(pedido)
  }
  //4 funcion para eliminar
  const deletePedido = async (id) => {
       const pedidoDoc =  doc(firestore, "pedido", id)
       await deleteDoc(pedidoDoc)
       getPedido()
  }
  //

  // 6
  useEffect( () => {
    getPedido()
  }, [] )


  return (
    <>
      
        <div className="container-home">
              
              <div className="row">
                  <div className="col">           
                      <Button
                        onClick={<Link to="/Create">
                        <h2>create </h2>
                      </Link>}
                      >
                        hola create
                      </Button>

                      <div>
                      </div>

                      <table className='table table-dark table-hover'>
                          <thead>
                              <tr>
                                  <th>#</th>
                                  <th>producto</th>
                                  <th>cantidad</th>
                                  <th>disponibilidad</th>
                                  <th>Action</th>
                              </tr>
                          </thead>

                          <tbody>
                              { pedido.map( (pedido) => (
                                  <tr key={pedido.id}>
                                      <td>{}</td>
                                      <td>{pedido.producto}</td>
                                      <td>{pedido.cantidad}</td>
                                      <td>{pedido.disponibilidad}</td>
                                      <td>
                                      
                                          <button onClick={ () => {deletePedido(pedido.id)} } className="btn btn-danger"><i className="fa-solid fa-eraser"></i>Eliminar</button>
                                      </td>
                                  </tr>
                              )) }
                          </tbody>
                      </table>

                  </div>
              </div>
          </div>

          <Button
            onClick={()=> signOut(auth)}>
            Cerrar sesion
          </Button>
      
    </>

      
  )
  
}

export default Home;
//<Link to="/Create" className='btn btn-secundary mt-2 mb-2'><h4 className='letra-create'>Create here!</h4></Link>