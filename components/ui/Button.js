import styled from '@emotion/styled';

const Button = styled.a`
    background-color: ${ props => props.bgColor ? '#DA552F' : '#FFF' };
    border: 1px solid #d1d1d1;
    color: ${ props => props.bgColor ? '#FFF' : '#000' };
    display: block;
    font-weight: 700;
    margin: 2rem auto;
    padding: .8rem 2rem;
    text-align: center;
    text-transform: uppercase;

    &::last-of-type {
        margin-right: 0;
    }

    &:hover {
        cursor: pointer;
        opacity: .92;
    }
`;
 
export default Button;