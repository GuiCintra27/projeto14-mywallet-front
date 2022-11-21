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
    const { TOKEN, setTOKEN, Centralizer } = useContext(UserContext);
    const URL = 'http://localhost:5000/transactions';
    const header = { headers: { "Authorization": `Bearer ${TOKEN}` } };
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [transactions, setTransactions] = useState('');
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        axios.get(URL, header)
            .then((response) => {
                const user = response.data;
                setName(user.name);
                setTransactions(user.transactions);
                let result = 0;
                user.transactions.forEach(item => {
                    const value = Number(item.value);
                    const type = item.type;
                    if (type === 'incoming') {
                        result += value;
                    } else {
                        result -= value;
                    }
                    console.log(result)
                });
                setBalance(result.toFixed(2));
            })
            .catch((error) => {
                console.log(error.response.data);
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
                    <>
                        <div className='registerContainer'>
                            {transactions.map((item) => (
                                <Register type={item.type} value={item.value} description={item.description} date={item.date} />
                            ))}
                        </div>
                        <div className='balance'>
                            <p>SALDO</p>
                            <p className={balance > 0 ? 'incoming' : 'outgoing'}>{balance}</p>
                        </div>
                    </>
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
    position: relative;

    & > .null{
        width: 18rem;
        font-weight: 400;
        font-size: 20px;
        text-align: center;
        color: var(--without-transactions);
    }

    & > .registerContainer{
        width: 100%;
        height: 93%;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        gap: 2rem;
    }

    .register{
        display: flex;
        flex-direction: row;
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

    & > .balance {
        width: 100%;
        padding: 1.5rem;
        position: absolute;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 17px;

        p:nth-child(1){
            font-weight: 700;
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