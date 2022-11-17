import React, { useState, useEffect } from 'react'

import {fireApp} from '../Credenciales';
import { getAuth, signOut } from 'firebase/auth';
import { Button } from 'react-bootstrap';
import { collection, doc, getDocs, getFirestore, deleteDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const auth = getAuth(fireApp);
const firestore = getFirestore(fireApp);



//let i = 0
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

  // mensaje de eliminar
  const confirmEliminar = (id) => {// aca creo el mensase en una funcion flecha
    MySwal.fire({
      title: 'Estas seguro de eliminarlo?',
      text: "al confirmar quedara completamente eliminado!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        deletePedido(id)
        Swal.fire(
          'Eliminado!',
          'Eliminado correctamente.',
          'success'
        )
      }
    })
  }
  //4 funcion para eliminar
  const deletePedido = async (id) => {
       const pedidoDoc =  doc(firestore, "pedido", id)
       await deleteDoc(pedidoDoc)
       confirmEliminar()
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
                      
                      <Link to="/Create">
                        <Button className='boton-create'>
                          Create
                        </Button>
                      </Link>

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
                                          <Link to="/Edit"><Button variant="secondary">editar</Button></Link>
                                          <button onClick={ () => {deletePedido(pedido.id)} } className="btn btn-danger"><i className="fa-solid fa-eraser"></i>Eliminar</button>
                                      </td>
                                  </tr>
                              )) }
                          </tbody>
                      </table>

                  </div>
              </div>
          </div>
          
          <div className='boton-eliminar'>
          <Button
            onClick={()=> signOut(auth)}>
            Cerrar sesion
          </Button>
          </div>
          
      
    </>

      
  )
  
}

export default Home;
//<Link to="/Create" className='btn btn-secundary mt-2 mb-2'><h4 className='letra-create'>Create here!</h4></Link>

