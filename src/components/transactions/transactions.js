import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../global/dataContext';
import logOutIcon from '../../assets/log-out-icon.svg';
import incomingIcon from '../../assets/add-icomming-icon.svg';
import outgoingIcon from '../../assets/add-outgoing-icon.svg';
import Register from './register';

export default function Transactions() {
    const { TOKEN, setTOKEN, Centralizer, Logo } = useContext(UserContext);
    const URL = 'http://localhost:5000/transactions';
    const header = { headers: { "Authorization": `Bearer ${TOKEN}` } };
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [transactions, setTransactions] = useState('');

    useEffect(() => {
        axios.get(URL, header)
            .then((response) => {
                const user = response.data;
                setName(user.name);
                setTransactions(user.transactions);
            })
            .catch((error) => {
                console.log(error.data);
                alert('Usuário não autorizado');
                navigate('/');
            });
    }, []);

    function logOut() {
        setTOKEN('');
        navigate('/');
    }

    return (
        <Centralizer>
            <Title>
                <p>Olá, {name}</p>
                <img src={logOutIcon} alt='Log-out' onClick={logOut} />
            </Title>

            <Registers align={transactions.length > 0 ? 'flex-start' : 'center'}>
                {transactions.length > 0 ? (
                    transactions.map((item) => (
                        <Register type={item.type} value={item.value} description={item.description} date={item.date} />
                    ))
                ) : (
                    <span className='null'>Não há registros de entrada ou saída</span>
                )
                }
            </Registers>

            <Buttons>
                <Link to={'/incoming'}>
                    <button>
                        <img src={incomingIcon} alt='Incomming icon' />
                        <p>Nova entrada</p>
                    </button>
                </Link>

                <Link to={'/outgoing'}>
                    <button>
                        <img src={outgoingIcon} alt='outgoing icon' />
                        <p>Nova saída</p>
                    </button>
                </Link>
            </Buttons>
        </Centralizer>
    );
}

const Title = styled.div`
    display: flex;
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

const Registers = styled.div`
    display: flex;
    gap: 2rem;
    width: 32.6rem;
    height: 44.6rem;
    background-color: var(--white);
    border-radius: 5px;
    color: black;
    justify-content: ${props => props.align};
    align-items: center;
    padding: 2rem 1rem 1rem 1rem;
    margin-bottom: 1.3rem;
    flex-direction: column;

    & > .null{
        width: 18rem;
        font-weight: 400;
        font-size: 20px;
        text-align: center;
        color: var(--without-transactions);
    }

    & > .register{
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        font-weight: 400;

        div{
            display: flex;

            gap: 1rem;
        }
    }
    
    .date{
        color: var(--date);
    }

    .incoming{
        color: var(--incoming);
    }

    .outgoing{
        color: var(--outgoing);
    }

    .balance{
        font-size: 17px;
        font-weight: 700;
    }
`;

const Buttons = styled.div`
    display: flex;
    width: 32.6rem;
    height: 11.5rem;
    gap: 1.5rem;

    & > a{
        width: 100%;
    }
    
    button{
        width: 100%;
        display: flex;
        flex-direction: column;
        background-color: var(--button);
        padding: .85rem;
        gap: 3rem;
        border: none;
        border-radius: 5px;

        img{
            width: 2.5rem;
            height: 2.5rem;
        }

        p{
            text-align: left;
            color: var(--white);
            width: 6.5rem;
            font-weight: 700;
            font-size: 17px;
        }
    }
`;