import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { fireApp } from "../Credenciales";
import { Container } from 'react-bootstrap'

const Edit = () => {
   // 1. configurar los hoots 
   const [ producto, setproducto ] = useState('')
   const [ cantidad, setcantidad ] = useState()
   const [ disponibilidad, setdisponibilidad ] = useState('')
   const navigate = useNavigate()

  const {id} = useParams()// devuelve el valir del id

  //const usuarioCollection = collection(db, 'usuario')//validando

  const update = async (e) => {
    e.preventDefault() // evita comportamiento por predefecto
    const pedido =  doc(fireApp, "pedido", id) // esto trae todos los datos
    const data = {producto: producto, cantidad: cantidad, disponibilidad: disponibilidad} //datos para actualizar
    await updateDoc(pedido, data)// updateDoc es de firestore // aca los actualiza
    navigate("/") // aca nos devuelve a la rais = show

    if (pedido.exists){
      console.log('si. ',pedido.data())
    }else{
      console.log('no. ',pedido.data())
    }
  }

  const datosPedidoSeleccionados = async (id) => {
    const pedido = await getDoc(doc(fireApp, "pedido", id))// doc siempre lleva la conexion el db y el id
    if (pedido.exists()){
        console.log(pedido.data())
        setproducto(pedido.data().usuario)
        setcantidad(pedido.data().cedula)
        setdisponibilidad(pedido.data().disponibilidad)
    } else {
      console.log("pedido", pedido.data())// registra undefault
      //console.log(usuarioCollection)
    }
  }


  useEffect( () => {
        datosPedidoSeleccionados(id)
    // eslint-disable-next-line
  }, [] )

  return (
<>
    <Container> 

    <div className='container-create'>
        <div className='row'>
            <div className='col'> 
            <h1>Edit</h1>

            <form onSubmit={update}>

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

                <div className="div-btonEditar">
                  <button type='submit' className="btn btn-primary">Edit</button>
                </div>

            </form>

            </div>
        </div>
    </div>
    </Container> 
    </>
    )
}

export default Edit;