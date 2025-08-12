import { createContext, useContext } from "react";
import { useClients } from "../hooks/useClients";

const ClientsContext = createContext();

export const ClientsProvider = ({ children }) => {
    const clientData = useClients();

    return (
        <ClientsContext.Provider value={clientData}>
            {children}
        </ClientsContext.Provider>
    );
};

export const useClientsContext = () => {
    const context = useContext(ClientsContext);
    if (!context) {
        throw new Error('useClientContext debe usarse dentro de un ClientsProvider');
    }
    return context;
};