import React, {useState} from "react";
import { Container, Stack, Button, Form } from "react-bootstrap";

import {fireApp} from "../Credenciales";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const auth = getAuth(fireApp)


export const Loguin = () => {

    const [registrandose, setRegistrandose] = useState(false);

    async function submitHandler(e){
        e.preventDefault();
        const correo = e.target.formBasicEmail.value;
        const contrasena = e.target.formBasicPassword.value;
        //console.log(correo,contrasena);
        
        
        if (registrandose){
            //si se registra
            const usuario = await createUserWithEmailAndPassword(auth, correo, contrasena)
        } else{
            signInWithEmailAndPassword(auth, correo, contrasena)
            .catch(function(error){
                const mensaje = error.message
                mensajeError()
            });
        }

        const mensajeError = ()=>{
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'usuario no valido!',
                footer: '<a href="">Why do I have this issue?</a>'
            })
        }

    }
    return(
        <Container>
            <Stack gap={3}>

                <h1>{registrandose ? "Registrate!" : "Inicia Sesion!"}</h1>

                <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    Acceso permitido a personal autorizado!
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {registrandose ? "Registrate!" : "Inicia Sesion"}
                </Button>
                </Form>

                

            </Stack>
        </Container>
    );
};

export default Loguin;

/*<Button variant="info" onClick={() => setRegistrandose(!registrandose)}>
{registrandose ? "¿ Ya tienes una cuenta ?  " : "¿ No tienes una cuenta ? -> Registrate"}
</Button>*/