import React, { useState } from 'react'
import { css } from '@emotion/react';
import Router from 'next/router';

import Layout from '../components/layout/Layout';
import { Form, FieldDiv, InputSubmit, Error } from '../components/ui/Form';

import firebase from '../firebase';

// Validaciones
import useValidation from '../hooks/useValidation';
import validateCreateAccount from '../validation/validateCreateAccount';

const CreateAccount = () => {

    const [error, setError] = useState({});

    const INITIAL_STATE = {
        name: '',
        email: '',
        password: ''
    };

    const createAccount = async () => {
        try {
            await firebase.register(name, email, password);
            Router.push('/');
        } catch(err) {
            console.error('Error al crear el usuario\n', err.message);
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
    } = useValidation(INITIAL_STATE, validateCreateAccount, createAccount);

    const { name, email, password } = values;

    return (
        <div>
            <Layout>
                <>
                    <h1
                        css={css`
                            margin-top: 5rem;
                            text-align: center;
                        `}
                    >Crear Cuenta</h1>

                    <Form onSubmit={handleSubmit}>
                        <FieldDiv>
                            <label htmlFor="name">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Tu nombre"
                                name="name"
                                value={name}
                                onChange={handleChange}
                            />
                        </FieldDiv>

                        { errors.name && <Error>{errors.name}</Error> }

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
                            value="Crear Cuenta"
                        />
                    </Form>
                </>
            </Layout>
        </div>
    );
}
 
export default CreateAccount;