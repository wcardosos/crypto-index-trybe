import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Header from '../components/Header';
import Input from '../components/Input';
import Select, { SelectOptions } from '../components/Select';


import { Main, PageTitle } from '../styles/cryptoIndexStyles';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { InputQuoteContainer, UpdateQuotesContainer } from '../styles/pages/Update';
import axios from 'axios';

const Update: React.FC = () => {
    const [ currency, setCurrency ] = useState(SelectOptions.default);
    const [ newQuoteValue, setNewQuoteValue ] = useState(0);


    const router = useRouter();

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if(token === null) {
            router.push("/login");
        }
    }, [])

    const onChangeCurrency = (event) => {
        setCurrency(event.target.value);
    }

    const onChangeNewQuoteValue = (event) => {
        setNewQuoteValue(event.target.value);
    }

    const onClickBack = () => {
        router.back();
    }

    const onClickUpdateQuote = async (event) => {
        event.preventDefault()

        if (currency === SelectOptions.default) {
            alert("Selecione uma moeda");
            return
        }

        if (newQuoteValue <= 0) {
            alert("Valor inválido!");
            return
        }

        try {
            await axios.put("/api/crypto/btc", {
                currency,
                value: newQuoteValue
           });
        } catch (error) {
            alert("Problema ao atualizar a cotação");
        }

        alert("Cotação atualizada!");

        router.back();
    }

    return (
        <>
            <Head>
                <title>Atualização</title>
            </Head>
            <Header back onClick={onClickBack} />
            <Main>
                <PageTitle>Atualização do valor da cotação</PageTitle>
                <UpdateQuotesContainer>
                    <InputQuoteContainer direction={"column"}>
                        <p>Moeda:</p>
                        <Select options={[
                            SelectOptions.default,
                            SelectOptions.BRL,
                            SelectOptions.EUR,
                            SelectOptions.CAD
                        ]} value={currency} onChange={onChangeCurrency} />
                    </InputQuoteContainer>
                    <InputQuoteContainer direction={"column"}>
                        <p>Novo valor:</p>
                        <Input type={"number"} value={newQuoteValue} onChange={onChangeNewQuoteValue} width={"small"} />
                    </InputQuoteContainer>
                    <InputQuoteContainer direction={"row"}>
                        <Button text={"Atualizar"} onClick={onClickUpdateQuote} />
                    </InputQuoteContainer>
                </UpdateQuotesContainer>
            </Main>
        </>
    )
}

export default Update;