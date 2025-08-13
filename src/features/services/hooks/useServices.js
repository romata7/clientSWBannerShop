import { useCallback, useReducer, useState } from "react";

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

    const [localDesign, setLocalDesign] = useState(null);

    function designsReducer(state, action) {
        switch (action.type) {
            case 'ADD':
                return [...state, { ...action.payload, id: Date.now() }];
            case 'UPDATE':
                return state.map(d =>
                    d.id === action.payload.id ? { ...d, ...action.payload } : d
                );
            case 'REMOVE':
                return state.filter(d => d.id !== action.payload);
            default:
                return state;
        }
    }

    const [designs, dispatch] = useReducer(designsReducer, [])


    return {
        designs,
        dispatch,
        localDesign,
        setLocalDesign
    };
}