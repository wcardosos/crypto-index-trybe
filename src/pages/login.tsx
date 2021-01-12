import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Header from '../components/Header';
import Input from '../components/Input';

import { Main } from '../styles/cryptoIndexStyles';

import Head from 'next/head';
import { useRouter } from 'next/router';

import BitcoinImage from '../assets/bitcoin.svg';
import { FormContainer, InputsFormContainer } from '../styles/pages/Login';
import axios from 'axios';


const Login: React.FC = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ logged, setLogged ] = useState(false);

    const onChangeEmail = event => setEmail(event.target.value);
    const onChangePassword = event => setPassword(event.target.value);

    const router = useRouter();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setLogged(token !== null);

        if (logged) {
            router.push("/");
        }
    }, [logged])

    const onClick = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("/api/login", {
                email,
                password
            });

            sessionStorage.setItem('token', response.data.token);
            router.push("/");
        } catch (error) {
            alert("Email ou senha incorretos");
        }
    }

    const main = logged ? 
        <div>Carregando ...</div> : (
        <>
            <BitcoinImage />
            <FormContainer>
                <InputsFormContainer>
                    <Input value={email} type={"email"} placeholder={"Email"} onChange={onChangeEmail} width={"large"} />
                    <Input value={password} type={"password"} placeholder={"Senha"} onChange={onChangePassword} width={"large"} />
                </InputsFormContainer>
                <Button text={"Entrar"} onClick={onClick} />
            </FormContainer>
        </>
    )

    return (
        <>
            <Head>
                <title>Crypto Index - Login</title>
            </Head>
            <Header center />
            <Main>
                {main}
            </Main>
        </>
    )
}

export default Login;