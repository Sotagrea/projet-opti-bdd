// pages/swagger/index.jsx
import Head from 'next/head';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
const Swagger = () => {
return (
    <div>
        <Head>
            <title>Mon API Swagger - Filmographique</title>
            <meta name="description" content="Mon API Swagger - Filmographique" />
            <link rel="icon" href="/favicon.svg" />
        </Head>
        <SwaggerUI url="/api/doc" />
    </div>
);
};
export default Swagger;