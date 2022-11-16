import axios from "axios";
import { createContext, useState } from "react";
import styled from "styled-components";

const UserContext = createContext();

export function UserProvider({ children }) {
    const URL = ('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today');
    

    return (
        <UserContext.Provider value={{}}>
            {children}
        </UserContext.Provider>
    )
}

const Body = styled.div`
    width: 100vw;
    height: ${props => props.height};
    position: relative;
    margin: 9.2rem 0 0 0;
    padding: 0 1.7rem 3rem 1.7rem;
    color: var(--darkGray);
    overflow-y: scroll;

    &>p{
      font-size: 18px;
    }

    p.subtitle{
      font-size: 18px;
      color: var(--defaultSubtitle);
    }

    p.done{
        font-size: 18px;
        color: var(--completedHabit);
    }

    p.unDone{
        font-size: 18px;
      color: var(--defaultSubtitle);
    }
`;

const MyHabits = styled.div`
    width: 100%;
    margin-bottom: 2.8rem;

    div.menu{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2.8rem;
    }
    
    h1{
        font-weight: 400;
        font-size: 23px;
        color: var(--darkBlue);
    }

    button{
        width: 4rem;
        height: 3.5rem;
        background-color: var(--lightBlue);
        border: none;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;

        img{
            width: 1.6rem;
        }
    }
`;

export default UserContext;