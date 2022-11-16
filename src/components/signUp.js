import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from './global/dataContext';
import logo from '../assets/MyWallet.svg';
import Formulary from './global/form';

export default function SignUp() {
    const { Centralizer, Logo } = useContext(UserContext);
    const URL = 'http://localhost:5000/sign-up';
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function signUp(e) {
        e.preventDefault();
        const userData = { name, email, password, password_confirmation: confirmPassword };

        if (name) {
            if (email) {
                if (password.length >= 8) {
                    if (confirmPassword === password) {
                        axios.post(URL, userData)
                            .then((response) => {
                                navigate('/');
                            })
                            .catch((err) => {
                                console.log(err.response.data);
                            });

                    } else {
                        alert('As senhas não coincidem');
                    }
                } else {
                    alert('A senha deve ter pelo menos 8 caracteres');
                }
            } else {
                alert('Insira um email válido');
            }
        } else {
            alert('Insira o nome de usuário');
        }
    }

    return (
        <Centralizer>
            <Logo>
                <img src={logo} alt='Logo image' />
            </Logo>

            <Formulary onSubmit={signUp}>
                <input placeholder='Nome' value={name} onChange={(e) => setName(e.target.value)} />
                <input placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} type='email' />
                <input placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
                <input placeholder='Confirme a Senha' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type='password' />
                <button type='submit'>Cadastrar</button>
            </Formulary>

            <Link to={'/'}>Já tem uma conta? Entre agora!</Link>
        </Centralizer>
    );
}