import React from 'react'
import Link from 'next/link';
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';

const Comments = styled.div`
    align-items: center;
    display: flex;
    margin-top: 2rem;

    div {
        align-items: center;
        border: 1px solid #e1e1e1;
        display: flex;
        margin-right: 2rem;
        padding: .3rem 1rem;
    }

    img {
        width: 2rem;
        margin-right: 2rem;
    }

    p {
        font-size: 1.6rem;
        font-weight: 700;
        margin-right: 1rem;

        &::last-of-type {
            margin: 0;
        }
    }
`;

const DescriptionText = styled.p`
    font-size: 1.6rem;
    margin: 0;
    color: #888;
`;

const Image = styled.img`
    width: 200px;
`;

const ProductDescription = styled.div`
    display: grid;
    column-gap: 2rem;
    grid-template-columns: 1fr 3fr;
    flex: 0 1 600px;
`;

const ProductLi = styled.li`
    align-items: center;
    border-bottom: 1px solid #e1e1e1;
    display: flex;
    justify-content: space-between;
    padding: 4rem;
`;

const Title = styled.a`
    font-size: 2rem;
    font-weight: bold;
    margin: 0;

    &:hover {
        cursor: pointer;
    }
`;

const Votes = styled.div`
    border: 1px solid #e1e1e1;
    flex: 0 0 auto;
    padding: 1rem 3rem;
    text-align: center;

    div {
        font-size: 2rem;
    }

    p {
        font-size: 2rem;
        font-weight: 700;
        margin: 0;
    }
`;

const ProductDetails = ({ product }) => {

    const {id, comments, createdAt, description, company, name, url, image, votes} = product;

    return (
        <ProductLi>
            <ProductDescription>
                <div>
                    <Image src={image} />
                </div>

                <div>
                    <Link href="/products/[id]" as={`/products/${id}`}>
                        <Title>{name}</Title>
                    </Link>
                    
                    <DescriptionText>{description}</DescriptionText>

                    <Comments>
                        <div>
                            <img src="/static/img/comentario.png" />
                            <p>{comments.length} Comentarios</p>
                        </div>
                    </Comments>

                    <p>Publicado hace: { formatDistanceToNow(new Date(createdAt), {locale: es}) }</p>
                </div>
            </ProductDescription>

            <Votes>
                <div> &#9650; </div>
                <p>{votes}</p>
            </Votes>
        </ProductLi>
    );
}
 
export default ProductDetails;