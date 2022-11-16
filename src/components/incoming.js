import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import closeIcon from '../assets/close-icon.png';
import UserContext from './global/dataContext';
import Formulary from './global/form';

export default function Incoming() {
    const { TOKEN, Title } = useContext(UserContext);
    const CONNECTURL = 'http://localhost:5000/transactions';
    const URL = 'http://localhost:5000/incoming';
    const navigate = useNavigate();
    const header = { headers: { "Authorization": `Bearer ${TOKEN}` } };
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        axios.get(CONNECTURL, header)
            .then()
            .catch((error) => {
                console.log(error.data);
                alert('Usuário não autorizado');
                navigate('/');
            });
    }, []);

    function goToTransactions(){
        navigate('/transactions');
    }

    function confirmTransaction(e) {
        e.preventDefault();
        
        if (value) {
            if (description) {
               axios.post(URL, {value, description}, header)
               .then(() =>{
                navigate('/transactions');
               })
               .catch((err) => {
                console.log(err.data);
               });
            } else {
                alert('Insira uma descrição');
            }
        } else {
            alert('Insira um valor');
        }
    }

    return (
        <>
            <Title>
                <p>Nova entrada</p>
                <img src={closeIcon} alt='Log-out' onClick={goToTransactions} />
            </Title>

            <Formulary onSubmit={confirmTransaction}>
                <input placeholder='Valor' value={value} onChange={(e) => setValue(e.target.value)} type='number' />
                <input placeholder='Descrição' value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type='submit'>Salvar entrada</button>
            </Formulary>
        </>
    );
}