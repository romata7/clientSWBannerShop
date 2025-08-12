import { useCallback, useState } from "react";

const emptyService = {
    design: {
        id: null,
        quantity: 1,
        description: '',
        height: 0.01,
        width: 0.01,
        cost: 0.01
    },
    impression: {
        id: null,
        quantity: 1,
        description: '',
        height: 0.01,
        width: 0.01,
        cost: 0.01
    },
    installation: {
        id: null,
        quantity: 1,
        description: '',
        location: '',
        notes: '',
        cost: 0.01
    },
    maintenance: {
        id: null,
        quantity: 1,
        description: '',
        location: '',
        notes: '',
        cost: 0.01
    }
}

export const useServices = () => {
    const [services, setServices] = useState([]);
    const [currentService, setCurrentService] = useState(emptyService);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState(null);

    // Cargar servicios
    const fetchServices = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getServices();
            if (Array.isArray(data)) {
                setServices(data);
            } else {
                setMessage(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [])
    return {
        fetchServices
    };
}