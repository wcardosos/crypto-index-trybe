import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { BitcoinQuotesContainer, BitcoinQuote, OtherCurrenciesContainer } from '../styles/pages/Home';

import Head from 'next/head'
import { Main, PageTitle } from '../styles/cryptoIndexStyles';
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios';
import { useRouter } from 'next/router';

interface HomeProps {
    bitcoinQuotes: any
}

const Home: React.FC<HomeProps> = ({ bitcoinQuotes }) => {
    const [btc, setBtc] = useState(1);
    const [ dollar, setDollar ] = useState(bitcoinQuotes.bpi.USD.rate_float * btc);
    const [ real, setReal ] = useState(bitcoinQuotes.bpi.BRL.rate_float * btc);
    const [ euro, setEuro ] = useState(bitcoinQuotes.bpi.EUR.rate_float * btc);
    const [ canadianDollar, setCanadianDollar ] = useState(bitcoinQuotes.bpi.CAD.rate_float * btc);

    const router = useRouter();

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if(token === null) {
            router.push("/login");
        }
    }, [])

    useEffect(() => {
        setDollar(parseFloat((bitcoinQuotes.bpi.USD.rate_float * btc).toFixed(2)));
        setReal(parseFloat((bitcoinQuotes.bpi.BRL.rate_float * btc).toFixed(2)));
        setEuro(parseFloat((bitcoinQuotes.bpi.EUR.rate_float * btc).toFixed(2)));
        setCanadianDollar(parseFloat((bitcoinQuotes.bpi.CAD.rate_float * btc).toFixed(2)));
    }, [btc])

    const onChangeBTC = (event) => {
        setBtc(event.target.value);
    }

    const onClickLogout = () => {
        sessionStorage.removeItem("token");

        router.push("/login")
    }

    const onClickUpdate = () => {
        router.push("/update");
    }

    return (
        <>
            <Head>
                <title>Crypto Index - Início</title>
            </Head>
            <Header onClick={onClickLogout} />
            <Main>
                <PageTitle>Home</PageTitle>
                <BitcoinQuotesContainer>
                    <>
                        <BitcoinQuote>
                            <strong>BTC</strong>
                            <Input
                                value={btc}
                                type={"number"}
                                onChange={onChangeBTC}
                                width={"small"}
                            />
                        </BitcoinQuote>
                    </>
                    <>
                        <OtherCurrenciesContainer>
                            <BitcoinQuote>
                                <strong>USD</strong>
                                <Input
                                    value={dollar}
                                    type={"number"}
                                    onChange={onChangeBTC}
                                    width={"small"}
                                />
                            </BitcoinQuote>
                            <BitcoinQuote>
                                <strong>BRL</strong>
                                <Input
                                    value={real}
                                    type={"number"}
                                    onChange={onChangeBTC}
                                    width={"small"}
                                />
                            </BitcoinQuote>
                            <BitcoinQuote>
                                <strong>EUR</strong>
                                <Input
                                    value={euro}
                                    type={"number"}
                                    onChange={onChangeBTC}
                                    width={"small"}
                                />
                            </BitcoinQuote>
                            <BitcoinQuote>
                                <strong>CAD</strong>
                                <Input
                                    value={canadianDollar}
                                    type={"number"}
                                    onChange={onChangeBTC}
                                    width={"small"}
                                />
                            </BitcoinQuote>
                        </OtherCurrenciesContainer>
                        <Button text={"Atualizar valor monetário"} onClick={onClickUpdate} />
                    </>
                </BitcoinQuotesContainer>
            </Main>
        </>
    )
}

export async function getStaticProps(context) {
    const response = await axios.get("http://localhost:3000/api/crypto/btc");
    const bitcoinQuotes = response.data;

    return {
        props: {
            bitcoinQuotes
        }
    }
}

export default Home;