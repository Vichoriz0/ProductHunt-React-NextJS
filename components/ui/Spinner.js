import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
`;

const Loader = styled.div`
    height: 10rem;
    width: 10rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const LoaderRing = styled.div`
    display: inline-block;
    position: relative;
    width: 7.5rem;
    height: 7.5rem;

    div {
        animation: ${spin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border: 6px solid var(--orange);
        border-color: var(--orange) transparent transparent transparent;
        border-radius: 100%;
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 7rem;
        height: 7rem;
    }

    div:nth-of-type(1) { animation-delay: -0.45s; }
    div:nth-of-type(2) { animation-delay: -0.3s; }
    div:nth-of-type(3) { animation-delay: -0.15s; }
`;

const Spinner = () => {
    return (
        <Loader>
            <LoaderRing>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </LoaderRing>
        </Loader>
    );
}
 
export default Spinner;