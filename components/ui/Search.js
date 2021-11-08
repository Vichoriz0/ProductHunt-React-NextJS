import React, { useState } from 'react';
import Router from 'next/router';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const InputText = styled.input`
    border: 1px solid var(--gray3);
    padding: 1rem;
    min-width: 300px;
`;

const InputSubmit = styled.button`
    background-color: #FFF;
    background-image: url('/static/img/buscar.png');
    background-repeat: no-repeat;
    background-size: 4rem;
    border: none;
    display: block;
    height: 3rem;
    text-indent: -9999px;
    width: 3rem;

    position: absolute;
    right: 1rem;
    top: 1px;

    &:hover {
        cursor: pointer;
    }
`;

const Search = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const searchProduct = e => {
        e.preventDefault();
        
        if(searchTerm.trim() === '') return;

        // Redireccionar a buscar
        Router.push({
            pathname: '/search',
            query: { q: searchTerm.toLowerCase() }
        });
    };

    return (
        <form
            css={css`
                position: relative;
            `}
            onSubmit={ searchProduct }
        >
            <InputText 
                type="text"
                placeholder="Buscar productos"
                onChange={ e => setSearchTerm(e.target.value) }
            />

            <InputSubmit type="submit">Buscar</InputSubmit>
        </form>
    );
}
 
export default Search;