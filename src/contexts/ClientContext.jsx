import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const ClientContext = createContext();
const BASE_URL = "http://localhost:3001/api/clients";
const emptyClient = {
    name: "",
    dniruc: "",
    phone: "",
    address: ""
};

export const ClientProvider = ({ children }) => {
    const [currentClient, setCurrentClient] = useState(emptyClient);
    const [clients, setClients] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false)
    const onSubmitClient = async (e) => {
        e.preventDefault();
        try {
            await saveClient();
            setIsEditing(false);
        } catch (error) {

        }
    };

    // Wrap en useCallback para evitar recreación en cada render
    const fetchClients = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(BASE_URL);
            setClients(response.data);
            setError(null);
        } catch (err) {
            setError('Error al cargar clientes');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Función más genérica para guardar cualquier cliente
    const saveClient = useCallback(async (clientData = currentClient) => {
        try {
            setLoading(true);
            const method = clientData.id ? 'put' : 'post';
            const url = clientData.id ? `${BASE_URL}/${clientData.id}` : BASE_URL;
            const response = await axios[method](url, clientData);
            setCurrentClient(emptyClient);
            setError(null);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Error al guardar cliente');
            console.error(err);
            throw err;
        } finally {
            fetchClients();
            setLoading(false);
        }
    }, [currentClient, fetchClients]);

    const deleteClient = useCallback(async (cliendId) => {
        try {
            setLoading(true);
            const response = await axios.delete(`${BASE_URL}/${cliendId}`);
            setCurrentClient(emptyClient);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || "Error al guardar cliente");
            console.log(err)
            throw err;
        }
        finally {
            fetchClients();
            setLoading(false);
        }
    })

    useEffect(() => {
        fetchClients()
    }, [fetchClients]);

    return (
        <ClientContext.Provider
            value={{
                currentClient,
                setCurrentClient,
                onSubmitClient,
                error,
                clients,
                emptyClient,
                loading,
                saveClient,
                isEditing,
                setIsEditing,
                deleteClient
            }}
        >
            {children}
        </ClientContext.Provider>
    );
};

export const useClientContext = () => {
    const context = useContext(ClientContext);
    if (!context) {
        throw new Error('useClientContext debe usarse dentro de un ClientProvider');
    }
    return context;
}