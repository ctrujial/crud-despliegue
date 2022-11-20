import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'//para enrutar
import { collection, addDoc, getFirestore } from 'firebase/firestore'// para trabajar con firebase
import {fireApp} from '../Credenciales'
import { Container } from 'react-bootstrap'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const db = getFirestore(fireApp)


const Create = () => {

    // 1. configurar los hoots 
    const [ producto, setproducto ] = useState('')//se inicia en '' por ser string
    const [ cantidad, setcantidad ] = useState(0)
    const [ disponibilidad, setdisponibilidad ] = useState('')
    const navigate = useNavigate()
  
    const productoCollection = collection(db, 'pedido')
  
    const store = async (e) => {
      e.preventDefault()
      await addDoc( productoCollection, { producto: producto, cantidad: cantidad, disponibilidad: disponibilidad } )
      .catch(function(error){
        if ( cantidad == Number ){
          mensajeError()
        }
      })
      confirmstore()// se invoca el mensaje de confirmacion
      navigate('/')//aca nos lleva a la rura raiz = show
      //console.log(e.target[1].value) muestra el nombre
      //console.log(e.target[1].value) muestra la cedula
      
      
    }

    const mensajeError = ()=>{
      MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'no se creo',
          footer: '<a href="">Why do I have this issue?</a>'
      })
    }

    const confirmstore = () => {// aca creo el mensase en una funcion flecha
      MySwal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto creado correctamente!',
        showConfirmButton: false,
        timer: 1500
        
      })
    }
    

  return (
    <>

   <Container>
      
    <div className='container-create'>
      <div className='row'>
        <div className='col'> 
          <h1>Create</h1>

          <form onSubmit={store}>

            <div className='mb-3'>
              <label className='form-label'>producto</label>
              <input
                value={producto}
                onChange={ (e)=>setproducto(e.target.value) }
                type="text"
                className='form-control'
              />
            </div>

            <div className='mb-3'>
              <label className='form-label'>cantidad</label>
              <input
                value={cantidad}
                onChange={ (e)=>setcantidad(e.target.value) }
                type="text"
                className='form-control'
              />
            </div>

            <div className='mb-3'>
              <label className='form-label'>disponibilidad</label>
              <input
                value={disponibilidad}
                onChange={ (e)=>setdisponibilidad(e.target.value) }
                type="text"
                className='form-control'
              />
            </div>

            <div className='div-btonCreate'>
              <button type='submit' className="btn btn-primary">Save</button>
            </div>

          </form>

        </div>
      </div>
    </div>
    </Container> 
    </>
  )
}

export default Create;
