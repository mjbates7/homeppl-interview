import Head from 'next/head';
import React from 'react';
import GridEditor from '../components/GridEditor';

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>MB grid designer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container py-8 mx-auto space-y-8">
        <h1 className="text-3xl font-medium">Grid Designer</h1>
        <GridEditor />
      </main>
    </div>
  );
}
