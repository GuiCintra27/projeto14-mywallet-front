import styled from "styled-components";

const Formulary = styled.form`
    margin-inline: auto;
    margin-bottom: 3.6rem;
    width: 32.6rem;
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
    
    input{
        font-size: 20px;
        width: 100%;
        height: 5.8rem;
        padding: 1.5rem;
        font-weight: 400;
        border: none;
        border-radius: 5px;
        background-color: var(--white);
    }

    button{
        font-size: 20px;
        width: 100%;
        height: 5.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: 5px;
        color: var(--white);
        background-color: var(--button);
        font-weight: 700;
    }
`;

export default Formulary;