import React, {createContext, ReactNode} from "react";

interface ApiKeyContextData {
     apiKey: string;
}

interface ApiKeyProviderProps {
    children: ReactNode;
}

export const ApiKeyContext = createContext({} as ApiKeyContextData)

export function ApiKeyProvider({ children }: ApiKeyProviderProps) {

    const apiKey = 'd7f4e9930866a6a6f3d2391f47621b7f';

    return(
        <ApiKeyContext.Provider value={{ apiKey }}>
            {children}
        </ApiKeyContext.Provider>
    );
}