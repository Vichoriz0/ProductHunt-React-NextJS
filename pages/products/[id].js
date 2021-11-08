import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';

import { FirebaseContext } from '../../firebase';

/* Components */
import Layout from '../../components/layout/Layout';
import Spinner from '../../components/ui/Spinner';
import ErrorCode from '../../components/layout/ErrorCode';
import Button from '../../components/ui/Button';
import { FieldDiv, InputSubmit } from '../../components/ui/Form';

const ProductContainer = styled.div`
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;

const ProductOwner = styled.p`
    background-color: var(--orange);
    color: #fff;
    display: inline-block;
    font-weight: bold;
    padding: .5rem 2rem;
    text-align: center;
    text-transform: uppercase;
`;

const Product = () => {

    // Routing para obtener el ID actual
    const router = useRouter();
    const { query: {id} } = router;

    // Obtener el objeto de firebase
    const { user, firebase } = useContext(FirebaseContext);

    // States
    const [comment, setComment] = useState({});
    const [consultDB, setConsultDB] = useState(true);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});

    const {comments, createdAt, description, company, name, url, image, votes, owner, hasVoted} = product;

    // Votar por el producto
    const voteProduct = () => {
        // Verificar que el usuario haya iniciado sesión
        if( !user ) return router.push('/login');

        // Verificar si el usuario actual ha votado
        if( hasVoted.includes(user.uid) ) return;

        // Construir información actualizada del producto
        const updatedProduct = {
            ...product,
            votes: votes + 1,
            hasVoted: [...hasVoted, user.uid]
        };

        // Actualizar en DB y el state
        firebase.putProduct(id, updatedProduct);
        setProduct(updatedProduct);
    };

    // Funciones para agregar un comentario
    const handleCommentChange = e => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value
        });
    };

    const handleCommentSubmit = e => {
        e.preventDefault();
        if( !user ) return router.push('/login');

        // Agregar información extra
        comment.uid = user.uid;
        comment.name = user.displayName;

        // Agregar al arreglo de comentarios
        const updatedProduct = {
            ...product,
            comments: [...comments, comment]
        };

        // Actualizar en state y en DB
        firebase.putProduct(id, updatedProduct);
        setProduct(updatedProduct);
    };

    // Identificar si la ID ingresada corresponde a la del creador del producto
    const isOwner = id => id === owner.id;
    const canDelete = () => user && user.uid === owner.id;

    // Elimina un producto de la DB
    const deleteProduct = async () => {
        if( !user ) return router.push('/login');
        if( user.uid !== owner.id ) return router.push('/');

        try {
            await firebase.deleteProduct(id);
            router.push('/');
        } catch(err) {
            console.error('Hubo un error:\n', err);
        }
    };

    useEffect(() => {
        const getProduct = async () => {
            const p = await firebase.getProduct(id);
            p ? setProduct(p) : setError(true);
        };

        if(id && consultDB) {
            getProduct(id);
            setConsultDB(false);
            setLoading(false);
        };
    }, [id]);

    return (
        <Layout>
            <>
                { error && <ErrorCode code="404" /> }
                { loading && <Spinner /> }

                { Object.keys(product).length === 0 ? null : (
                    <div className="container">
                        <h1
                            css={css`
                                text-align: center;
                                margin-top: 5rem;
                            `}
                        >{ name }</h1>

                        <ProductContainer>
                            <div>
                                <p>Publicado hace: { formatDistanceToNow(new Date(createdAt), {locale: es}) }</p>
                                <p>Por: {owner.name} de {company}</p>
                                <img src={image} />
                                <p>{description}</p>

                                { user && (
                                    <>
                                        <h2>Agrega tu comentario</h2>
                                        <form onSubmit={handleCommentSubmit}>
                                            <FieldDiv>
                                                <input 
                                                    type="text"
                                                    name="message"
                                                    onChange={handleCommentChange}
                                                />
                                            </FieldDiv>
                                            <InputSubmit 
                                                type="submit"
                                                value="Agregar comentario"
                                            />
                                        </form>
                                    </>
                                )}

                                <h2
                                    css={css`
                                        margin: 2rem 0;
                                    `}
                                >Comentarios</h2>

                                { comments.length === 0 ? 'Aún no hay comentarios' : (
                                    <ul>
                                        {comments.map( (comment, id) => (
                                            <li 
                                                key={`${comment.uid}-${id}`}
                                                css={css`
                                                    border: 1px solid #e1e1e1;
                                                    padding: 2rem;
                                                `}
                                            >
                                                <p>{comment.message}</p>
                                                <p>Escrito por:
                                                    <span
                                                        css={css`
                                                            font-weight: bold;
                                                        `}
                                                    > {comment.name}</span>
                                                </p>
                                                { isOwner(comment.uid) && <ProductOwner>Es Creador</ProductOwner> }
                                            </li>
                                        )).reverse()}
                                    </ul>
                                )}
                            </div>

                            <aside>
                                <Button
                                    target="_blank"
                                    bgColor="true"
                                    href={url}
                                    rel="noopener noreferrer"
                                >Visitar URL</Button>

                                <div
                                    css={css`
                                        margin-top: 5rem;
                                    `}
                                >
                                    <p
                                        css={css`
                                            text-align: center;
                                        `}
                                    >{votes} Votos</p>
                                    
                                    { user && (
                                        <Button
                                            onClick={voteProduct}
                                        >Votar</Button>
                                    )}
                                </div>

                                { canDelete() && 
                                    <Button
                                        onClick={deleteProduct}
                                    >Eliminar Producto</Button>
                                }
                            </aside>
                        </ProductContainer>
                    </div>
                )}
            </>
        </Layout>
    );
}
 
export default Product;