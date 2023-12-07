import Head from "next/head";
import React from "react";

const HeaderPage = ({ title }) => {
  return (
    <Head>
      <title>{`${process?.env?.NEXT_PUBLIC_NAME_APP} - ${title}`}</title>
      <meta
        name="description"
        content="Aviv, Simplifica la administración de tu copropiedad con nuestra plataforma todo en uno."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default HeaderPage;
