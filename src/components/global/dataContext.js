import { createContext, useState } from "react";
import styled from "styled-components";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [TOKEN, setTOKEN] = useState('');

    return (
        <UserContext.Provider value={{TOKEN, setTOKEN, Centralizer, Logo, Title}}>
            {children}
        </UserContext.Provider>
    )
}

const Centralizer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    a{
        color: var(--white);
        font-weight: 700;
        font-size: 15px;
    }
`;

const Logo = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2.4rem;

    img{
        width: 14.7rem;
        height: 5rem;
    }
`;

const Title = styled.div`
    display: flex;
    margin-top: 2.5rem;
    margin-inline: auto;
    width: 32.6rem;
    color: var(--white);
    font-weight: 700;
    font-size: 26px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    img{
        width: 2.4rem;
        height: 2.4rem;
    }
`;

export default UserContext;