import styled from "@emotion/styled";

export const Form = styled.form`
    margin: 5rem auto 0 auto;
    max-width: 600px;
    width: 95%;

    fieldset {
        border: 1px solid #e1e1e1;
        font-size: 2rem;
        margin: 2rem 0;
        padding: 2rem;
    }
`;

export const FieldDiv = styled.div`
    align-items: center;
    display: flex;
    margin-bottom: 2rem;

    label {
        flex: 0 0 150px;
        font-size: 1.8rem;
    }

    input, textarea {
        flex: 1;
        padding: 1rem;
    }

    textarea {
        height: 400px;
    }
`;

export const InputSubmit = styled.input`
    background-color: var(--orange);
    border: none;
    color: #FFF;
    font-family: 'PT Sans', sans-serif;
    font-size: 1.8rem;
    font-weight: 700;
    padding: 1.5rem;
    text-align: center;
    text-transform: uppercase;
    width: 100%;

    &:hover {
        cursor: pointer;
        opacity: 0.92;
    }
`;

export const Error = styled.p`
    background-color: red;
    color: #FFF;
    font-family: 'PT Sans', sans-serif;
    font-size: 1.4rem;
    font-weight: 700;
    margin: 2rem 0;
    padding: 1rem;
    text-align: center;
    text-transform: uppercase;
`;