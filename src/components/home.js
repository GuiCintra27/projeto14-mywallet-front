import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/MyWallet.svg';
import UserContext from './global/dataContext';
import Formulary from './global/form';

export default function Home() {
    const { setTOKEN, Centralizer, Logo } = useContext(UserContext);
    const URL = 'http://localhost:5000/sign-in';
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function signIn(e) {
        e.preventDefault();
        const userData = { email, password };

        if (email) {
            if (password.length >= 8) {
                axios.post(URL, userData)
                    .then((response) => {
                        setTOKEN(response.data.token);
                        navigate('/transactions');
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                alert('A senha deve ter pelo menos 8 caracteres');
            }
        } else {
            alert('Insira um email válido');
        }
    }

    return (
        <Centralizer>
            <Logo>
                <img src={logo} alt='Logo image' />
            </Logo>

            <Formulary onSubmit={signIn}>
                <input placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} type='email' />
                <input placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
                <button type='submit'>Entrar</button>
            </Formulary>

            <Link to={'/sign-up'}>Primeira vez? Cadastre-se!</Link>
        </Centralizer>
    );
}