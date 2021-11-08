import React, { useState, useContext } from 'react'
import { css } from '@emotion/react';
import { useRouter } from 'next/router';

import Layout from '../components/layout/Layout';
import ErrorCode from '../components/layout/ErrorCode';
import { Form, FieldDiv, InputSubmit, Error } from '../components/ui/Form';

import { FirebaseContext } from '../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from '@firebase/storage';

// Validaciones
import useValidation from '../hooks/useValidation';
import validateNewProduct from '../validation/validateNewProduct';

const NewProduct = () => {

    const [error, setError] = useState({});
    const { user, firebase } = useContext(FirebaseContext);

    // States para la subida de la imagen
    const [uploading, setUploading] = useState(false);
    const [URLImage, setURLImage] = useState('');

    const router = useRouter();
    const INITIAL_STATE = {
        name: '',
        company: '',
        image: '',
        url: '',
        description: ''
    };

    const addProduct = async () => {

        // Si el usuario no está autenticado redireccionar a login
        if( !user ) return router.push('/login');

        const product = {
            name, 
            company, 
            url, 
            image: URLImage,
            description, 
            votes: 0,
            comments: [],
            createdAt: Date.now(),
            owner: {
                id: user.uid,
                name: user.displayName
            },
            hasVoted: []
        };

        try {
            await firebase.addProduct(product);
            router.push('/');
        } catch(err) {
            console.error('Error al agregar un producto\n', err.message);
            setError({
                msg: err.message,
                code: err.code
            });
        }
    };

    const handleImageUpload = e => {
        const file = e.target.files[0];
        const imageRef = ref(firebase.storage, 'products/' + file.name);

        setUploading(true);
        const uploadTask = uploadBytesResumable(imageRef, file);

        uploadTask.on('state_changed', 
            snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Subiendo imagen: ${progress}% terminado`);
            },
            error => {
                setUploading(false);
                console.error(error);
            },
            () => {
                setUploading(false);
                getDownloadURL(uploadTask.snapshot.ref).then(url => {
                    console.log('Imagen disponible en:', url);
                    setURLImage(url);
                });
            }
        );
    };

    const {
        values,
        errors,
        handleChange,
        handleSubmit
    } = useValidation(INITIAL_STATE, validateNewProduct, addProduct);

    const { name, company, url, description } = values;

    return (
        <div>
            <Layout>
                { !user ? <ErrorCode code="403" /> : (
                    <>
                        <h1
                            css={css`
                                margin-top: 5rem;
                                text-align: center;
                            `}
                        >Agregar un Nuevo Producto</h1>

                        <Form onSubmit={handleSubmit}>
                            <fieldset>
                                <legend>Información General</legend>
                                <FieldDiv>
                                    <label htmlFor="name">Nombre</label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Nombre del producto"
                                        name="name"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </FieldDiv>
                                { errors.name && <Error>{errors.name}</Error> }

                                <FieldDiv>
                                    <label htmlFor="company">Empresa</label>
                                    <input 
                                        type="text"
                                        id="company"
                                        placeholder="Nombre de la empresa"
                                        name="company"
                                        value={company}
                                        onChange={handleChange}
                                    />
                                </FieldDiv>
                                { errors.company && <Error>{errors.company}</Error> }

                                <FieldDiv>
                                    <label htmlFor="image">Imagen</label>
                                    <input
                                        accept="image/*"
                                        type="file"
                                        id="image"
                                        name="image"
                                        onChange={handleImageUpload}
                                    />
                                </FieldDiv>
                                {/* { errors.image && <Error>{errors.image}</Error> } */}

                                <FieldDiv>
                                    <label htmlFor="url">URL</label>
                                    <input 
                                        type="url"
                                        id="url"
                                        placeholder="URL de tu producto"
                                        name="url"
                                        value={url}
                                        onChange={handleChange}
                                    />
                                </FieldDiv>
                                { errors.url && <Error>{errors.url}</Error> }
                            </fieldset>

                            <fieldset>
                                <legend>Sobre tu Producto</legend>
                                <FieldDiv>
                                    <label htmlFor="description">Descripción</label>
                                    <textarea
                                        id="description"
                                        placeholder="El producto es..."
                                        name="description"
                                        value={description}
                                        onChange={handleChange}
                                    />
                                </FieldDiv>
                                { errors.description && <Error>{errors.description}</Error> }
                            </fieldset>
                            
                            { Object.keys(error).length !== 0 ? <Error>{ error.msg }</Error> : null }

                            <InputSubmit
                                css={css`
                                    margin-bottom: 2rem;
                                `}
                                type="submit"
                                value="Agregar Producto"
                            />
                        </Form>
                    </>
                )}
            </Layout>
        </div>
    );
}
 
export default NewProduct;