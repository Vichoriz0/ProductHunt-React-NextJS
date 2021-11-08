import React from 'react'
import { css } from '@emotion/react';

const ErrorCode = ({ code }) => {

    const getMessage = code => {
        switch(code) {
            case '403':
                return 'Acceso Denegado';
            case '404':
                return 'Página no Encontrada';
            default:
                return 'Error desconocido';
        }
    };

    return (
        <h1
            css={css`
                margin-top: 5rem;
                text-align: center;
            `}
        >Error {code}: {getMessage(code)}</h1>
    );
}
 
export default ErrorCode;