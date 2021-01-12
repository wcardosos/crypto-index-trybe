import React from 'react';
import Header from '../components/Header';

import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Crypto Index - Início</title>
      </Head>
      <Header />
      <h1>Desafio Fullstack Trybe</h1>
    </div>
  )
}
