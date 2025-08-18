import { useCallback, useEffect, useState } from "react"
import { deleteClient, getClients, postClient, putClient } from "../api/clientApi";

const emptyClient = {
    id: null,
    name: "",
    dniruc: "",
    phone: "",
    address: ""
};

export const useClients = () => {

    const [localClient, setLocalClient] = useState(null)

    const [clients, setClients] = useState([]);
    const [currentClient, setCurrentClient] = useState(emptyClient);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState(null)

    // Cargar clientes
    const fetchClients = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getClients();
            if (Array.isArray(data)) {
                setClients(data);
            } else {
                setMessage(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Guardar cliente
    const saveClient = useCallback(async (clientData) => {
        try {
            setLoading(true);
            const data = await postClient(clientData);
            setMessage(data);
            await fetchClients();
            setCurrentClient(emptyClient);
            setIsEditing(false);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Guardar cliente
    const updateClient = useCallback(async (id, clientData) => {
        try {
            setLoading(true);
            const data = await putClient(id, clientData);
            setMessage(data);
            await fetchClients();
            setCurrentClient(emptyClient);
            setIsEditing(false);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Guardar cliente
    const removeClient = useCallback(async (id) => {
        try {
            setLoading(true);
            const data = await deleteClient(id);
            setMessage(data);
            await fetchClients();
            setCurrentClient(emptyClient);
            setIsEditing(false);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchClients() }, [fetchClients])

    return {
        clients,
        currentClient,
        setCurrentClient,
        loading,
        message,
        setMessage,
        isEditing,
        setIsEditing,
        fetchClients,
        saveClient,
        updateClient,
        removeClient,
        emptyClient,
        localClient,
        setLocalClient
    }
};