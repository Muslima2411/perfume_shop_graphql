"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ReactNode } from "react";

export default function ProviderApollo({children}: {children: ReactNode}) {
    const client = new ApolloClient({
        uri: 'http://localhost:4000/',
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
}