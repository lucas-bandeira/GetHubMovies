import React from "react";
import '../styles/global.scss';
import {ApiKeyProvider} from "../contexts/ApiKeyContext";

import {AppProps} from "next/app";


function MyApp({Component, pageProps}: AppProps) {
    return (
        <ApiKeyProvider>
            <Component {...pageProps}/>
        </ApiKeyProvider>
    );
}

export default MyApp
