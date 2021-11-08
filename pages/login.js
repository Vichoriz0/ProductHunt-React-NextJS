import React, { useState } from 'react'
import { css } from '@emotion/react';
import Router from 'next/router';

import Layout from '../components/layout/Layout';
import { Form, FieldDiv, InputSubmit, Error } from '../components/ui/Form';

import firebase from '../firebase';

// Validaciones
import useValidation from '../hooks/useValidation';
import validateLogIn from '../validation/validateLogIn';

const Login = () => {

    const [error, setError] = useState({});

    const INITIAL_STATE = {
        email: '',
        password: ''
    };

    const logIn = async () => {
        try {
            await firebase.login(email, password);
            Router.push('/');
        } catch(err) {
            console.error('Error al iniciar sesión\n', err.message);
            setError({
                msg: err.message,
                code: err.code
            });
        }
    };

    const {
        values,
        errors,
        handleChange,
        handleSubmit
    } = useValidation(INITIAL_STATE, validateLogIn, logIn);

    const { email, password } = values;

    return (
        <div>
            <Layout>
                <>
                    <h1
                        css={css`
                            margin-top: 5rem;
                            text-align: center;
                        `}
                    >Iniciar Sesión</h1>

                    <Form onSubmit={handleSubmit}>
                        <FieldDiv>
                            <label htmlFor="email">Correo</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Tu correo"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            />
                        </FieldDiv>

                        { errors.email && <Error>{errors.email}</Error> }

                        <FieldDiv>
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Tu contraseña"
                                name="password"
                                value={password}
                                onChange={handleChange}
                            />
                        </FieldDiv>

                        { errors.password && <Error>{errors.password}</Error> }
                        { Object.keys(error).length !== 0 ? <Error>{ error.msg }</Error> : null }

                        <InputSubmit 
                            type="submit"
                            value="Iniciar Sesión"
                        />
                    </Form>
                </>
            </Layout>
        </div>
    );
}
 
export default Login;