import React from 'react';
import Header from '../components/Header';

import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <h1>Desafio Fullstack Trybe</h1>
    </div>
  )
}
