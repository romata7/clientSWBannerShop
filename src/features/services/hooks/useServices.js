import { useCallback, useEffect, useReducer, useState } from "react";

function serviceReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return [...state, { ...action.payload, id: Date.now() }];
        case 'UPDATE':
            return state.map(item =>
                item.id === action.payload.id ? { ...item, ...action.payload } : item
            );
        case 'REMOVE':
            return state.filter(item => item.id !== action.payload);
        case 'RESET':
            return [];
        default:
            return state;
    }
}
export const useServices = () => {
    const [designs, designDispatch] = useReducer(serviceReducer, []);
    const [impressions, impressionDispatch] = useReducer(serviceReducer, []);
    const [installations, installationDispatch] = useReducer(serviceReducer, []);
    const [maintenances, maintenanceDispatch] = useReducer(serviceReducer, []);

    const getServiceDispatch = useCallback((type) => {
        switch (type) {
            case 'design': return designDispatch;
            case 'impression': return impressionDispatch;
            case 'installation': return installationDispatch;
            case 'maintenance': return maintenanceDispatch;
            default: return () => { };
        }
    }, []);

    const getServiceItems = useCallback((type) => {
        switch (type) {
            case 'design': return designs;
            case 'impression': return impressions;
            case 'installation': return installations;
            case 'maintenance': return maintenances;
            default: return [];
        }
    }, [designs, impressions, installations, maintenances]);

    return {
        designs,
        impressions,
        installations,
        maintenances,

        designDispatch,
        impressionDispatch,
        installationDispatch,
        maintenanceDispatch,

        getServiceDispatch,
        getServiceItems,
    }
}