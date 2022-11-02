import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'//para enrutar
import { collection, addDoc, getFirestore } from 'firebase/firestore'// para trabajar con firebase
import fireApp from '../Credenciales'

const db = getFirestore(fireApp)


const Create = () => {

    // 1. configurar los hoots 
    const [ producto, setproducto ] = useState('')//se inicia en '' por ser string
    const [ cantidad, setcantidad ] = useState()
    const [ disponibilidad, setdisponibilidad ] = useState('')
    const navigate = useNavigate()
  
    const productoCollection = collection(db, 'pedido')
  
    /*const confirmstore = () => {// aca creo el mensase en una funcion flecha
      MySwal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    }
  */
    const store = async (e) => {
      e.preventDefault()
      await addDoc( productoCollection, { producto: producto, cantidad: cantidad, disponibilidad: disponibilidad } )
      //confirmstore()// se invoca el mensaje de confirmacion
      navigate('/')//aca nos lleva a la rura raiz = show
      //console.log(e.target[1].value) muestra el nombre
      //console.log(e.target[1].value) muestra la cedula
    }

  return (
    <>
      
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

            <button type='submit' className="btn btn-primary">Store</button>

          </form>

        </div>
      </div>
    </div>
    
    </>
  )
}

export default Create;
